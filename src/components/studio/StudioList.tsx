import React, { useState, useEffect } from "react";
import { List, Card, Button, Input, Modal, Typography, Rate } from "antd";
import { Studio } from "../../types/studioTypes";
import studioData from "../../staticData/staticData.json";

const { Search } = Input;
const { Title, Text } = Typography;

const StudioList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [bookings, setBookings] = useState<Studio[]>([]);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Load bookings from localStorage when the component mounts
  useEffect(() => {
    const storedBookings = localStorage.getItem("bookings");
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  // Save bookings to localStorage
  const saveBookings = (bookings: Studio[]) => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  };

  // Handle studio booking
  const handleBooking = (studio: Studio) => {
    setSelectedStudio(studio);
    setIsModalVisible(true);
  };

  const confirmBooking = () => {
    if (selectedStudio) {
      const newBookings = [...bookings, selectedStudio];
      setBookings(newBookings);
      saveBookings(newBookings);
      setIsModalVisible(false);
      alert(`Successfully booked: ${selectedStudio.Name}`);
    }
  };

  // Filter studios based on search query
  const filteredStudios = studioData.Studios.filter((studio) =>
    studio.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}
      className="mt-10"
    >
      <Title className="mt-8" level={2}>
        Studio Booking
      </Title>

      {/* Search Bar */}
      <Search
        placeholder="Search for studios..."
        allowClear
        enterButton="Search"
        size="large"
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      {/* Studio List */}
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={filteredStudios}
        renderItem={(studio) => (
          <List.Item>
            <Card
              hoverable
              cover={
                <img
                  alt={studio.Name}
                  src={studio.Images[0]}
                  style={{ height: 150, objectFit: "cover" }}
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

      {/* Booking Confirmation Modal */}
      <Modal
        title="Confirm Booking"
        open={isModalVisible}
        onOk={confirmBooking}
        onCancel={() => setIsModalVisible(false)}
      >
        {selectedStudio && (
          <div>
            <Title level={4}>{selectedStudio.Name}</Title>
            <p>
              <b>Location:</b> {selectedStudio.Location.City},{" "}
              {selectedStudio.Location.Area}
            </p>
            <p>
              <b>Price:</b> {selectedStudio.PricePerHour}{" "}
              {selectedStudio.Currency} / hour
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StudioList;
