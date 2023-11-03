import React, { useEffect } from 'react'
const { kakao } = window;

function Map( props ) {

  // 화면 렌더링 될 때, 한번만 실행되도록 useEffect 사용
  useEffect(() => {

    //마커를 담을 배열
    let markers =[];



    //지도를 담을 영역의 DOM 레퍼런스
    const container = document.getElementById("map");
    const options = { //지도를 생성할 때 필요한 기본 옵션
      //지도의 중심좌표.
      center: new kakao.maps.LatLng(33.450701, 126.570667),

      //지도의 레벨(확대, 축소 정도
      level: 3
    };

    const map = new kakao.maps.Map(container, options);
    // 마커의 위치를 담는다
    const markerPosition = new kakao.maps.LatLng(
      38.2313466,
      128.2139293
    );
    //마커포지션 위치를 지정
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    //마커를 맵에 생성
    marker.setMap(map);

    //장소 검색 객체를 담는다
    const ps = new kakao.maps.services.Places();
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    //키워드로 장소를 검색
    //kakao 제공
    searchPlaces();

    //적용 코드
    // const searchForm = document.getElementById('submit_btn');
    // searchForm.addListener('click', function (e) {
    //   e.preventDefault();
    //   searchForm();
    // });

    // 키워드 검색을 요청하는 함수
    function searchPlaces() {
      const keyword = document.getElementById('keyword').value;
      ps.keywordSearch(keyword, placesSearchCB);
    }

    //장소 검색 완료
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 목록과 마커를 표현하는 함수
        displayPlaces(data);

        //검색 결과 목록 하단에 페이지 번호를 표시하는 함수
        displayPagination(pagination);

        const bounds = kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          
          map.setBounds(bounds);


        }
      }
    }

    //검색 결과 목록과 마커를 표시하는 함수
    function displayMarker(place) {
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      kakao.maps.event.addListener(marker, 'click', function (mouseEvent) {
        props.setAddress(place);
        infowindow.setContent(`
        <span>
        ${place.place_name}
        </span>
        `);
        infowindow.open(map, marker);
        const moveLatLon = new kakao.maps.LatLng(place.y, place.x);

        //지도를 부드럽게 이동시킨다.
        map.panTo(moveLatLon);
      });
    }


    // 검색 결과 목록과 마커를 표출하는 함수
    function displayPlaces(places) {
      const listEl = document.getElementById('placesList');
      const menuEl = document.getElementById('menu_wrap');
      const fragment = document.createDocumentFragment();

      // 검색 결과 목록에 추가된 항목을 제거
      removeAllChildNods(listEl);

      //지도에 표시되고 있는 마커를 제거
      removeMarker();
      for (let i = 0; i < places.length; i++) {
        const placePosition = new window.kakao.maps.LatLng(
          places[i].y,
          places[i].x
        );
        const marker = addMarker(placePosition, i);
        const itemEl = getListItem(i, places[i]);

        (function (marker, title) {
          kakao.maps.event.addListener(
            marker,
            "mouseover",
            function () {
              displayInfowindow(marker, title);
            }
          );

          kakao.maps.event.addListener(
            marker,
            "mouseout",
            function () {
              infowindow.close();
            }
          );

          itemEl.addEventListener("click", function (e) {
            displayInfowindow(marker, title);
            props.setAddress(places[i]);
            map.panTo(placePosition);
          });
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
      }

      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;
      }

      function getListItem(index, places) {
        const el = document.createElement("li");
        let itemStr =
      '<span class="markerbg marker_' + (index + 1) +'"></span>' + '<div class="info">' + "<h5>" + places.place_name + "</h5>";
          if (places.road_address_name) {
                  itemStr +=
                    "    <span>" +
                    places.road_address_name +
                    "</span>" +
                    '   <span class="jibun gray">' +
                    `<img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png">
                    </img>` +
                    places.address_name +
                    "</span>";
                } else {
                  itemStr += "<span>" + places.address_name + "</span>";
                }
      
                itemStr +=
                  '  <span class="tel">' + places.phone + "</span>" + "</div>";
      
                el.innerHTML = itemStr;
                el.className = "item";
      
                return el;
              }

              //마커를 생성하고 지도에 표시
              function addMarker(position, idx) {
                const imageSrc =
                  "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
                const imageSize = new window.kakao.maps.Size(36, 37);
                const imgOptions = {
                  spriteSize: new window.kakao.maps.Size(36, 691),
                  spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
                  offset: new window.kakao.maps.Point(13, 37),
                };
      
                const markerImage = new window.kakao.maps.MarkerImage(
                  imageSrc,
                  imageSize,
                  imgOptions
                );
      
                const marker = new window.kakao.maps.Marker({
                  position,
                  image: markerImage,
                });
      
                marker.setMap(map);
                markers.push(marker);
      
                return marker;
              }

              //기존의 마커를 제거한다
              function removeMarker() {
                for (let i = 0; i < markers.length; i++) {
                  markers[i].setMap(null);
                }
                markers = [];
              }

              // 검색 결과 하단부에 페이지 번호를 표시하는 함수
              function displayPagination(pagination) {
                const paginationEl = document.getElementById("pagination");
                const fragment = document.createDocumentFragment();

                //기존의 추가된 페이지 번호를 삭제하는 함수
                while (paginationEl?.hasChildNodes()) {
                  paginationEl.removeChild(paginationEl.lastChild);
                }
      
                for (let i = 1; i <= pagination.last; i++) {
                  const el = document.createElement("a");
                  el.href = "#";
                  el.innerHTML = String(i);
      
                  if (i === pagination.current) {
                    el.className = "on";
                  } else {
                    el.onclick = (function (i) {
                      return function () {
                        pagination.gotoPage(i);
                      };
                    })(i);
                  }
      
                  fragment.appendChild(el);
                }
                paginationEl?.appendChild(fragment);
              }

              //인포윈도우를 생성
              function displayInfowindow(marker, title) {
                const content =
                  '<div style="padding:5px;z-index:1;">' + title + "</div>";
      
                infowindow.setContent(content);
                infowindow.open(map, marker);
              }
  
              //검색결과 목록의 자식 Element를 제거
              function removeAllChildNods(el) {
                while (el.hasChildNodes()) {
                  el.removeChild(el.lastChild);
                }
              }

              
            }, []);
            
            // const [search, setSearch] = useState("");
            // const [isOpen, setIsOpen] = useState(true);
          
          
            // const onClickSearchBarOpen = () => {
            //   setIsOpen(!isOpen);
            // };

            // const onchangeSearch = (event) => {
            //   setSearch(event.target.value);
            // };

  return (
    <div id="map_wrap" className='mt-[2.7rem] w-[78.75rem] mx-auto my-0'>

      <div class="map_wrap">
      <div id="map" className='w-[78.75rem] h-[45.125rem] overflow-hidden relative'></div>

    <div id="menu_wrap" class="bg_white">
        <div class="option">
            <div>
                <form onsubmit="searchPlaces(); return false;">
                    키워드 : <input type="text" value="" id="keyword" size="15" /> 
                    <button type="submit">검색하기</button> 
                </form>
            </div>
        </div>
      
        <ul id="placesList"></ul>
        <div id="pagination"></div>
    </div>
</div>

      </div>
  );
};

export default Map;