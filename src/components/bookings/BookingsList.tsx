import React, { useState, useEffect } from "react";
import {
  List,
  Card,
  Typography,
  Tag,
  Button,
  Empty,
  Divider,
  Input,
  Select,
  Space,
  DatePicker,
} from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

interface BookingDetail {
  userInfo: {
    name: string;
    email: string;
  };
  studioInfo: {
    id: number;
    name: string;
    type: string;
    location: {
      city: string;
      area: string;
    };
  };
  bookingTime: {
    date: string;
    time: string;
  };
}

const BookingsList: React.FC = () => {
  const [bookings, setBookings] = useState<BookingDetail[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingDetail[]>([]);
  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  // Extract unique values for filters
  const studioTypes = Array.from(
    new Set(bookings.map((booking) => booking.studioInfo.type))
  );
  const locations = Array.from(
    new Set(
      bookings.map(
        (booking) =>
          `${booking.studioInfo.location.area}, ${booking.studioInfo.location.city}`
      )
    )
  );

  // Load bookings from localStorage on component mount
  useEffect(() => {
    const storedBookings = localStorage.getItem("detailedBookings");
    if (storedBookings) {
      const parsedBookings = JSON.parse(storedBookings);
      setBookings(parsedBookings);
      setFilteredBookings(parsedBookings);
    }
  }, []);

  // Filter bookings based on search and filter criteria
  useEffect(() => {
    let result = [...bookings];

    // Apply search text filter
    if (searchText) {
      const lowerCaseSearch = searchText.toLowerCase();
      result = result.filter(
        (booking) =>
          booking.userInfo.name.toLowerCase().includes(lowerCaseSearch) ||
          booking.userInfo.email.toLowerCase().includes(lowerCaseSearch) ||
          booking.studioInfo.name.toLowerCase().includes(lowerCaseSearch)
      );
    }

    // Apply type filter
    if (typeFilter) {
      result = result.filter(
        (booking) => booking.studioInfo.type === typeFilter
      );
    }

    // Apply location filter
    if (locationFilter) {
      result = result.filter(
        (booking) =>
          `${booking.studioInfo.location.area}, ${booking.studioInfo.location.city}` ===
          locationFilter
      );
    }

    // Apply date filter
    if (dateFilter) {
      result = result.filter(
        (booking) => booking.bookingTime.date === dateFilter
      );
    }

    setFilteredBookings(result);
  }, [searchText, typeFilter, locationFilter, dateFilter, bookings]);

  // Reset all filters
  const resetFilters = () => {
    setSearchText("");
    setTypeFilter(null);
    setLocationFilter(null);
    setDateFilter(null);
  };

  // Sort bookings by date
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    const dateA = dayjs(`${a.bookingTime.date} ${a.bookingTime.time}`);
    const dateB = dayjs(`${b.bookingTime.date} ${b.bookingTime.time}`);
    return dateA.isBefore(dateB) ? -1 : 1;
  });

  return (
    <div style={{ maxWidth: "1000px", margin: "auto", padding: "20px" }}>
      <Title level={2}>All Bookings</Title>

      {/* Search and Filters */}
      <div
        style={{
          marginBottom: "20px",
          background: "#f0f2f5",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="middle">
          <Search
            placeholder="Search by name, email or studio name"
            allowClear
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: "100%" }}
          />

          <Space wrap>
            <Select
              placeholder="Filter by Studio Type"
              allowClear
              style={{ width: 200 }}
              onChange={(value) => setTypeFilter(value)}
              value={typeFilter}
            >
              {studioTypes.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>

            <Select
              placeholder="Filter by Location"
              allowClear
              style={{ width: 200 }}
              onChange={(value) => setLocationFilter(value)}
              value={locationFilter}
            >
              {locations.map((location) => (
                <Option key={location} value={location}>
                  {location}
                </Option>
              ))}
            </Select>

            <DatePicker
              placeholder="Filter by Date"
              //   onChange={(date, dateString) => setDateFilter(dateString || null)}
              allowClear
            />

            <Button onClick={resetFilters}>Reset Filters</Button>
          </Space>
        </Space>
      </div>

      {/* Bookings List */}
      {sortedBookings.length > 0 ? (
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
          dataSource={sortedBookings}
          pagination={{
            pageSize: 6,
            showSizeChanger: false,
          }}
          renderItem={(booking) => (
            <List.Item>
              <Card
                title={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>{booking.studioInfo.name}</span>
                    <Tag color="blue">{booking.studioInfo.type}</Tag>
                  </div>
                }
                hoverable
              >
                <div style={{ minHeight: "200px" }}>
                  <Divider orientation="left">User Information</Divider>
                  <p>
                    <Text strong>Name: </Text>
                    {booking.userInfo.name}
                  </p>
                  <p>
                    <Text strong>Email: </Text>
                    {booking.userInfo.email}
                  </p>

                  <Divider orientation="left">Studio Details</Divider>
                  <p>
                    <Text strong>Type: </Text>
                    {booking.studioInfo.type}
                  </p>
                  <p>
                    <Text strong>Location: </Text>
                    {booking.studioInfo.location.area},{" "}
                    {booking.studioInfo.location.city}
                  </p>

                  <Divider orientation="left">Booking Time</Divider>
                  <p>
                    <Text strong>Date: </Text>
                    {booking.bookingTime.date}
                  </p>
                  <p>
                    <Text strong>Time: </Text>
                    {booking.bookingTime.time}
                  </p>
                </div>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Empty
          description={
            <span>
              {bookings.length === 0
                ? "No bookings found in the system"
                : "No bookings match your filter criteria"}
            </span>
          }
          style={{ marginTop: "40px" }}
        />
      )}
    </div>
  );
};

export default BookingsList;
