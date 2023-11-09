import DetailPageHeader from "../components/DetailPageHeader";
import DetailPageTitleAndContentSection from "../components/DetailPageTitleAndContentSection";
import MapContainer from "../components/MapContainer";
import React, { useEffect } from 'react';
import axios from 'axios';

const BoardDetail = () => {
    useEffect(() => {
        axios.get('')
            .then(response => {
                console.log(response);
            });
    }, []);
    return (
        <h1>Users</h1>
    );
}

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