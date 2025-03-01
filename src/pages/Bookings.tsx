import React from "react";
import Layout from "../layout/Layout";
import BookingsList from "../components/bookings/BookingsList";

const Bookings = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4 mt-10">
        <BookingsList />
      </div>
    </Layout>
  );
};

export default Bookings;
