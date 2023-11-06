import React from "react";
import DetailPageHeader from "../components/DetailPageHeader";
import DetailPageTitleAndContentSection from "../components/DetailPageTitleAndContentSection";
import MapContainer from "../components/MapContainer";

const BoardDetailPage = () => {
  return (
    <>
      <DetailPageHeader />
      <DetailPageTitleAndContentSection />
      
      
      <div className="flex max-w-screen-xl mx-auto md:px-10">
        <div className="w-full h-full md:mt-10">
      <MapContainer />
        </div>
      </div>
    </>
  );
};

export default BoardDetailPage;