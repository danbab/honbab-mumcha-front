import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DetailPageHeader from "../components/DetailPageHeader";
import DetailPageTitleAndContentSection from "../components/DetailPageTitleAndContentSection";
import MapContainer from "../components/MapContainer";
import axios from 'axios';

const BoardDetailPage = () => {
  return (
    <div>
      <DetailPageHeader />
      <DetailPageTitleAndContentSection />

      <div className="flex max-w-screen-xl xl:mx-auto xl:justify-between">
        <div className="w-full h-full my-20">
          <MapContainer />
        </div>
      </div>
    </div>
  );
};

export default BoardDetailPage;