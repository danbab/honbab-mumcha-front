import React, { useEffect, useState } from "react";
import {
  Map,
  MapMarker,
  InfoWindow,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";
import MainSectionTitle from "./MainSectionTitle";
import axios from "axios";
import CustomChart from "./CustomChart";
import BoardCard from "./BoardCard";

const KakaoMap = () => {
  const [level, setLevel] = useState(3);
  const [boards, setBoards] = useState([]);
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  const fetchBoards = async () => {
    const response = await axios.get("http://localhost:8080/api/board");
    setBoards(response.data);
  };

  useEffect(() => {
    fetchBoards(); // 컴포넌트가 마운트될 때 DB에서 데이터를 가져옵니다.
  }, []);

  const fetchLocation = () => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  };

  useEffect(fetchLocation, []);

  const locations = [
    {
      name: "",
      image: "img/location.svg",
      alt: "내 위치 아이콘",
      onClick: fetchLocation,
    },
    {
      name: "",
      image: "img/yongsan.svg",
      alt: "용산 이미지",
      onClick: () =>
        setState((prev) => ({
          ...prev,
          center: {
            lat: 37.5515,
            lng: 126.9883,
          },
        })),
    },
    {
      name: "",
      image: "img/sungsu.svg",
      alt: "성수 이미지",
      onClick: () =>
        setState((prev) => ({
          ...prev,
          center: {
            lat: 37.5445,
            lng: 127.0564,
          },
        })),
    },
    {
      name: "",
      image: "img/jongro.svg",
      alt: "종로 이미지",
      onClick: () =>
        setState((prev) => ({
          ...prev,
          center: {
            lat: 37.5704,
            lng: 126.9846,
          },
        })),
    },
    {
      name: "",
      image: "img/dongdaemun.svg",
      alt: "동대문 이미지",
      onClick: () =>
        setState((prev) => ({
          ...prev,
          center: {
            lat: 37.5719,
            lng: 127.0096,
          },
        })),
    },
    {
      name: "",
      image: "img/jamsil.svg",
      alt: "잠실 이미지",
      onClick: () =>
        setState((prev) => ({
          ...prev,
          center: {
            lat: 37.5111,
            lng: 127.0964,
          },
        })),
    },
    {
      name: "",
      image: "img/yeouido.svg",
      alt: "여의도 이미지",
      onClick: () =>
        setState((prev) => ({
          ...prev,
          center: {
            lat: 37.521,
            lng: 126.9244,
          },
        })),
    },
    {
      name: "",
      image: "img/hongdae.svg",
      alt: "홍대 이미지",
      onClick: () =>
        setState((prev) => ({
          ...prev,
          center: {
            lat: 37.5572,
            lng: 126.925,
          },
        })),
    },
    {
      name: "",
      image: "img/sinsa.svg",
      alt: "신사 이미지",
      onClick: () =>
        setState((prev) => ({
          ...prev,
          center: {
            lat: 37.5166,
            lng: 127.0208,
          },
        })),
    },
    {
      name: "",
      image: "img/gyeongbokgung.svg",
      alt: "경복궁 이미지",
      onClick: () =>
        setState((prev) => ({
          ...prev,
          center: {
            lat: 37.5788,
            lng: 126.9779,
          },
        })),
    },
    {
      name: "",
      image: "img/cheongdam.svg",
      alt: "청담 이미지",
      onClick: () =>
        setState((prev) => ({
          ...prev,
          center: {
            lat: 37.5194,
            lng: 127.056,
          },
        })),
    },
    {
      name: "",
      image: "img/samsung.svg",
      alt: "삼성 이미지",
      onClick: () =>
        setState((prev) => ({
          ...prev,
          center: {
            lat: 37.5133,
            lng: 127.0581,
          },
        })),
    },
  ];

  return (
    <>
      <MainSectionTitle type="menu-section">지역으로 약속잡기</MainSectionTitle>
      <div className="grid grid-cols-6 gap-3 mt-[2.7rem] w-[78.75rem] mx-auto my-0">
        {locations.map((location, index) => (
          <div
            className="w-[140px] h-[140px] rounded-[100px] overflow-hidden"
            key={index}
            onClick={location.onClick}
          >
            {/* <p className="absolute inset-0 flex items-center justify-center text-white text-xl font-medium font-['Inter'] p-4">{location.name}</p> */}
            <img
              className="shadow hover:scale-150 transition-transform duration-1000 ease-in-out"
              src={location.image}
              alt={location.alt}
            />
          </div>
        ))}
      </div>

      <Map // 지도를 표시할 Container
        center={state.center}
        style={{
          // 지도의 크기
          width: "100%",
          height: "450px",
          margin: "0, auto",
          marginTop: "3rem",
          position: "relative",
        }}
        level={level} // 지도의 확대 레벨
      >
        {boards.map(
          (
            board // DB에서 가져온 데이터를 순회하면서 각 게시물의 위치에 마커를 추가합니다.
          ) => (
            // <MapMarker
            //   key={board.id}
            //   position={{ lat: board.locationY, lng: board.locationX }}
            //   // image={{
            //   //   src: "img/locationicon.png",
            //   //   size: { width: 64, height: 69 },
            //   //   options: { offset: { x: 27, y: 69 } },
            //   // }}
            // >
            // </MapMarker>
            <CustomOverlayMap
              position={{ lat: board.locationY, lng: board.locationX }}
              xAnchor={0.3}
              yAnchor={0.91}
            >
              {/* <BoardCard board={board} /> */}
              <CustomChart board={board} />
            </CustomOverlayMap>
          )
        )}

        <button
          className="border w-10 h-10 text-center mr-4 ml-4 mt-2"
          onClick={() => setLevel(level + 1)}
        >
          -
        </button>
        <button
          className="border w-10 h-10 text-center"
          onClick={() => setLevel(level - 1)}
        >
          +
        </button>
      </Map>
    </>
  );
};

export default KakaoMap;
