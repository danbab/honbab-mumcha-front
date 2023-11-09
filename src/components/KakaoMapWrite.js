import React, { useEffect, useState } from "react";
import { MapMarker, Map } from "react-kakao-maps-sdk";
import "./myMap.css"; // CSS 파일 불러오기
const { kakao } = window;

const KakaoMapSearch = () => {
  const [searchTerm, setSearchTerm] = useState("이태원 맛집");
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [places, setPlaces] = useState([]);

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
      <div className='search_input_wrapper'>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search_input"
        />
      </div>
      <Map
        center={{ lat: 37.566826, lng: 126.9786567 }}
        style={{ width: "100%", height: "500px"}}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: "#000" }}>{marker.content}</div>
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
            <li key={index} className="item">
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
