import React, { useState, useEffect } from "react";
import {
  List,
  Card,
  Button,
  Input,
  Modal,
  Typography,
  Rate,
  AutoComplete,
  DatePicker,
  Select,
  message,
  Form,
  Spin,
} from "antd";
import { useGeolocated } from "react-geolocated";
import { getDistance } from "geolib";
import dayjs from "dayjs";
import studioData from "../../staticData/staticData.json";
import { Studio } from "../../types/studioTypes";
import { generateTimeSlots } from "../../utils/generateTimeSlots";

const { Search } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

const StudioList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [radiusFilter, setRadiusFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [bookedSlots, setBookedSlots] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [detailedBookings, setDetailedBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (selectedStudio) {
      const { Open, Close } = selectedStudio.Availability;
      console.log(
        "generateTimeSlots(Open, Close)",
        generateTimeSlots(Open, Close)
      );
      setAvailableTimeSlots(generateTimeSlots(Open, Close));
    }
  }, [selectedStudio]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    fetchData();

    const storedBookings = localStorage.getItem("bookedSlots");
    if (storedBookings) {
      setBookedSlots(JSON.parse(storedBookings));
    }

    // Load detailed bookings as well
    const storedDetailedBookings = localStorage.getItem("detailedBookings");
    if (storedDetailedBookings) {
      setDetailedBookings(JSON.parse(storedDetailedBookings));
    }
  }, []);

  // Get user location
  const { coords } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
    userDecisionTimeout: 5000,
  });

  // Load booked slots from local storage
  useEffect(() => {
    const storedBookings = localStorage.getItem("bookedSlots");
    if (storedBookings) {
      setBookedSlots(JSON.parse(storedBookings));
    }
  }, []);

  const handleBooking = (studio: Studio) => {
    setSelectedStudio(studio);
    setIsModalVisible(true);
  };

  // Filter by name/location
  const filteredStudios = studioData.Studios.filter(
    (studio) =>
      studio.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studio.Location.Area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter studios within 10km
  const studiosWithinRadius = coords
    ? filteredStudios.filter((studio) => {
        const distance = getDistance(
          { latitude: coords.latitude, longitude: coords.longitude },
          {
            latitude: studio.Location.Coordinates.Latitude,
            longitude: studio.Location.Coordinates.Longitude,
          }
        );
        return distance <= 10000; // 10 km
      })
    : filteredStudios;

  const bookedTimes = selectedDate ? bookedSlots[selectedDate] || [] : [];

  const isTimeAvailable = (time: string) => !bookedTimes.includes(time);

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      message.error("Please select a date and time slot.");
      return;
    }
    if (!userInfo.name || !userInfo.email) {
      message.error("Please enter your name and email.");
      return;
    }

    if (!isTimeAvailable(selectedTime)) {
      message.error(
        "The selected time slot is not available. Please choose another time."
      );
      return;
    }

    const bookingDetails = {
      userInfo: {
        name: userInfo.name,
        email: userInfo.email,
      },
      studioInfo: {
        id: selectedStudio?.Id,
        name: selectedStudio?.Name,
        type: selectedStudio?.Type,
        location: {
          city: selectedStudio?.Location.City,
          area: selectedStudio?.Location.Area,
        },
      },
      bookingTime: {
        date: selectedDate,
        time: selectedTime,
      },
    };

    const updatedBookings = { ...bookedSlots };

    const bookingKey = `${selectedDate}_${selectedTime}_${selectedStudio?.Id}`;

    if (!updatedBookings[selectedDate]) {
      updatedBookings[selectedDate] = [];
    }

    updatedBookings[selectedDate].push(selectedTime);

    localStorage.setItem("bookedSlots", JSON.stringify(updatedBookings));

    const existingDetailedBookings = JSON.parse(
      localStorage.getItem("detailedBookings") || "[]"
    );
    existingDetailedBookings.push(bookingDetails);
    localStorage.setItem(
      "detailedBookings",
      JSON.stringify(existingDetailedBookings)
    );

    setBookedSlots(updatedBookings);

    message.success(
      `Booking confirmed for ${selectedStudio?.Name} on ${selectedDate} at ${selectedTime}`
    );

    setIsModalVisible(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setUserInfo({ name: "", email: "" });
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" tip="Loading studios..." />
      </div>
    );
  }

  return (
    <div
      style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}
      className="mt-10"
    >
      <Title className="mt-8" level={2}>
        Studio Booking
      </Title>

      {/* Search Bar */}
      <AutoComplete
        options={studioData.Studios.map((studio) => ({
          value: studio.Location.Area,
        }))}
        style={{ width: "100%", marginBottom: "20px" }}
        onSelect={(value) => setSearchQuery(value)}
        placeholder="Search by location..."
      >
        <Search
          allowClear
          enterButton="Search"
          size="large"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </AutoComplete>

      {/* Toggle Nearby Studios */}
      <Button
        onClick={() => setRadiusFilter(!radiusFilter)}
        style={{ marginBottom: "10px" }}
      >
        {radiusFilter ? "Show All Studios" : "Show Studios within 10km"}
      </Button>

      {/* Studio List */}
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={radiusFilter ? studiosWithinRadius : filteredStudios}
        renderItem={(studio) => (
          <List.Item>
            <Card
              hoverable
              cover={
                <img
                  alt={studio.Name}
                  src={studio.Images[0]}
                  style={{ height: 50, objectFit: "cover" }}
                />
              }
            >
              <Title level={4}>{studio.Name}</Title>
              <Text type="secondary">{studio.Type}</Text>
              <p>
                {studio.Location.City}, {studio.Location.Area}
              </p>
              <p>
                Price: {studio.PricePerHour} {studio.Currency} / hour
              </p>
              <Rate disabled defaultValue={studio.Rating} />
              <Button
                type="primary"
                block
                onClick={() => handleBooking(studio)}
                style={{ marginTop: "10px" }}
              >
                Book Now
              </Button>
            </Card>
          </List.Item>
        )}
      />

      {/* Booking Modal */}
      <Modal
        title="Book Studio"
        open={isModalVisible}
        onOk={handleConfirmBooking}
        onCancel={() => setIsModalVisible(false)}
      >
        {selectedStudio && (
          <Form layout="vertical">
            <Title level={4}>{selectedStudio.Name}</Title>

            {/* Date Picker */}
            <Form.Item label="Select Date">
              <DatePicker
                style={{ width: "100%" }}
                onChange={(date, dateString) =>
                  setSelectedDate(
                    typeof dateString === "string" ? dateString : null
                  )
                }
              />
            </Form.Item>

            {/* Time Slot Picker */}
            <Form.Item label="Select Time Slot">
              <Select
                placeholder="Select a time slot"
                onChange={setSelectedTime}
                value={selectedTime}
              >
                {(Array.isArray(availableTimeSlots)
                  ? availableTimeSlots
                  : []
                ).map((time) => (
                  <Option
                    key={time}
                    value={time}
                    disabled={!isTimeAvailable(time)}
                  >
                    {time} {bookedTimes.includes(time) ? "(Booked)" : ""}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* User Info */}
            <Form.Item label="Your Name">
              <Input
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Your Email">
              <Input
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default StudioList;
