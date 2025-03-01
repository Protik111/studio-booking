import React from "react";
import Layout from "../layout/Layout";
import StudioList from "../components/studio/StudioList";

const Studio = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4 max-w-md mt-10">
        <StudioList />
      </div>
    </Layout>
  );
};

export default Studio;
