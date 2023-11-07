import React from "react";
import DetailPageHeader from "../components/DetailPageHeader";
import DetailPageTitleAndContentSection from "../components/DetailPageTitleAndContentSection";
import MapContainer from "../components/MapContainer";

const BoardDetailPage = () => {
  return (
    <>
      <DetailPageHeader />
      <DetailPageTitleAndContentSection />

      <div className="flex max-w-screen-xl xl:mx-auto xl:justify-between">
        <div className="w-full h-full my-20">
          <MapContainer />
        </div>
      </div>
    </>
  );
};

export default BoardDetailPage;