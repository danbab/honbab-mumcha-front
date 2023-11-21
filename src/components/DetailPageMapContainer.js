import React, { useEffect, useState } from "react";
import { MapMarker, Map } from "react-kakao-maps-sdk";
import "./myMap.css"; // CSS 파일 불러오기

const { kakao } = window;

const DetailPageMapContainer = ({ boardData }) => {
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();

  useEffect(() => {
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(boardData.locationY, boardData.locationX),
      level: 2,
    };
    const map = new kakao.maps.Map(container, options);

    let imageSrc = "/img/locationicon.png", // 마커이미지의 주소입니다    
      imageSize = new kakao.maps.Size(80, 80), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(40, 60) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    function displayMarker() {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(boardData.locationY, boardData.locationX),
        image: markerImage
      });

      kakao.maps.event.addListener(marker, "click", function () {
        //마커를 클릭하면 장소명이 인포윈도우에 표시
        infowindow.setContent(
          `<div style="display: flex; position: relative; text-align: center; vertical-align: middle; font-size: 18px;">` +
          boardData.restaurantName +
          `</div>`
        );
        infowindow.open(map, marker);
      });
    }

    // 마커 표시
    displayMarker();
  }, [boardData]);

  return (
    <>
      <div>
        <div
          id="myMap"
          className="w-full h-[40rem] rounded-[0.5rem] overflow-hidden"
        ></div>
      </div>
    </>
  );
};

export default DetailPageMapContainer;