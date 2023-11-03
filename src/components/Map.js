import React, { useEffect } from 'react'

const { kakao } = window;

function Map() {

  // 화면 렌더링 될 때, 한번만 실행되도록 useEffect 사용
  useEffect(() => {

    let infowindow = new kakao.maps.InfoWindow({zIndex:1});

    //지도를 담을 영역의 DOM 레퍼런스
    const container = document.getElementById('map');
    const options = { //지도를 생성할 때 필요한 기본 옵션
      //지도의 중심좌표.
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      
      //지도의 레벨(확대, 축소 정도
      level: 3
      
    };
    //지도 생성 및 객체 리턴
    const map = new kakao.maps.Map(container, options);
    
    //장소 검색 객체를 생성
    let ps = new kakao.maps.services.Places();


    //키워드로 장소를 검색
    ps.keywordSearch('영일분식', placeSearchCB);

    function placeSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        //검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        //LatLngBounds 객체에 좌표를 추가한다.
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        //검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds);
      }
      
    }

    //지도에 마커를 표시하는 함수
    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        //마커를 클릭하면 장소명이 인포윈도우에 표시
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
      });
    }

  }, []);

  return (
    <div className='mt-[2.7rem] w-[78.75rem] mx-auto my-0'>
  
      <div id='map' className='w-[78.75rem] h-[45.125rem]'>KakaoMap</div>
    </div>
  );
};

export default Map;