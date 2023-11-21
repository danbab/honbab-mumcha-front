import React, { useEffect, useState } from "react";
import { MapMarker, Map } from "react-kakao-maps-sdk";
import "./myMap.css"; // CSS 파일 불러오기
const { kakao } = window;

const KakaoMapSearch = ({ onSelectPlace }) => {
  const [searchTerm, setSearchTerm] = useState("이태원 맛집");
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [places, setPlaces] = useState([]);
  const [overlay, setOverlay] = useState(null);

  const handlePlaceClick = (place) => {
    // 선택된 장소의 이름과 주소를 onSelectPlace로 전달합니다.
    onSelectPlace(
      place.place_name,
      place.road_address_name || place.address_name
    );

    // 지도의 중심 위치와 확대 수준을 변경합니다.
    map.setCenter(new kakao.maps.LatLng(place.y, place.x));
    map.setLevel(3);
  };

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchTerm, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
            url: data[i].place_url,
          });
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);
        setPlaces(data);
        map.setBounds(bounds);
      }
    });
  }, [map, searchTerm]);

  return (
    <div className="map_wrap">
      <div className="search_input_wrapper">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search_input"
        />
      </div>
      <Map
        center={{ lat: 37.566826, lng: 126.9786567 }}
        style={{ width: "100%", height: "500px" }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            image={{
              src: "img/locationicon.png",
              size: {
                width: 60,
                height: 65,
              },
              options: {
                offset: {
                  x: 27,
                  y: 69,
                },
              },
            }}
            position={marker.position}
            content={marker.content}
            onClick={() => window.open(marker.url, "_blank")}
          >
            {info && info.content === marker.content && (
              <div className="border w-16 h-7">{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>
      <div id="menu_wrap" className="bg_white">
        <div className="option">
          <div>
            <p>
              키워드 : <b>{searchTerm}</b>
            </p>
          </div>
          <hr />
        </div>
        <ul id="placesList">
          {places.map((place, index) => (
            <li
              key={index}
              className="item"
              onClick={() => handlePlaceClick(place)}
            >
              <span className={`markerbg marker_${index + 1}`}></span>
              <div className="info">
                <h5>{place.place_name}</h5>
                {place.road_address_name ? (
                  <span>
                    {place.road_address_name}
                    <span className="jibun gray">{place.address_name}</span>
                  </span>
                ) : (
                  <span>{place.address_name}</span>
                )}
                <span className="tel">{place.phone}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KakaoMapSearch;
