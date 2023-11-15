import React, { useEffect, useState } from "react";
import { MapMarker, Map } from "react-kakao-maps-sdk";
import "./myMap.css"; // CSS 파일 불러오기

const { kakao } = window;

const DetailPageMapContainer = ({ searchPlace, boardData }) => {

  useEffect(() => {
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(37.575843, 126.977380),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    let imageSrc = '..img/locationicon.png', // 마커이미지의 주소입니다    
      imageSize = new kakao.maps.Size(30, 30), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(boardData.locationY, boardData.locationX),
        image: markerImage
      });

      kakao.maps.event.addListener(marker, "click", function () {
        //마커를 클릭하면 장소명이 인포윈도우에 표시
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
          boardData.restaurantName +
          "</div>"
        );
        infowindow.open(map, marker);

      });
    }
  }, [searchPlace, boardData]);

  return (
    <>
      <div>
        <div
          id="myMap"
          className="w-[78.75rem] xl:w-[78rem] h-[45.125rem] overflow-hidden"
        ></div>
      </div>
    </>
  );
};

export default DetailPageMapContainer;