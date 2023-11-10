import { useState } from "react";
import { Link } from "react-router-dom";

const BoardSideBar = ({ onSelectPlaceCategory }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);

  const handleClick = (imageName) => {
    setClickedLocation(imageName);
    setSelectedLocation(null);
  };
  const handleMouseEnter = (imageName) => {
    if (!clickedLocation) {
      // 클릭한 항목이 없는 경우에만 selectedLocation을 업데이트
      setSelectedLocation(imageName);
    }
  };
  const handleMouseLeave = () => {
    setSelectedLocation(null); // 마우스가 떠날 때 selectedLocation을 null로 설정
  };
  const locationList = [
    {
      name: "내 위치",
      image: "img/myPlaceSideBar.svg",
      alt: "내 위치 아이콘",
    },
    {
      name: "용산",
      image: "img/youngsanSideBar.svg",
      alt: "용산 이미지",
    },
    {
      name: "성수",
      image: "img/SengsuSideBar.svg",
      alt: "성수 이미지",
    },
    {
      name: "종로",
      image: "img/JongnoSideBar.svg",
      alt: "종로 이미지",
    },
    {
      name: "동대문",
      image: "img/DongdaemunSideBar.svg",
      alt: "동대문 이미지",
    },
    {
      name: "잠실",
      image: "img/JamsilSideBar.svg",
      alt: "잠실 이미지",
    },
    {
      name: "여의도",
      image: "img/YeouidoSideBar.svg",
      alt: "여의도 이미지",
    },
    {
      name: "홍대",
      image: "img/HongdaeSideBar.svg",
      alt: "홍대 이미지",
    },
    {
      name: "신사",
      image: "img/SinsaSideBar.svg",
      alt: "신사 이미지",
    },
    {
      name: "경복궁",
      image: "img/GyeongbokgungSideBar.svg",
      alt: "경복궁 이미지",
    },
    {
      name: "청담",
      image: "img/CheongdamSideBar.svg",
      alt: "청담 이미지",
    },
    {
      name: "삼성",
      image: "img/SamseongSideBar.svg",
      alt: "삼성 이미지",
    },
  ];

  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed left-0 z-40 w-[170px] d_s:w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 text-lg leading-loose"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {locationList.map((location) => (
              <li key={location.alt}>
                <Link
                  to="#"
                  className="py-2"
                  onMouseEnter={() => handleMouseEnter(location.image)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    handleClick(location.image);
                    onSelectPlaceCategory(location.name);
                  }}
                >
                  {selectedLocation === location.image ||
                  clickedLocation === location.image ? (
                    <img
                      src={location.image}
                      alt={location.name}
                      className="h-[6.625rem] object-cover w-full"
                    />
                  ) : (
                    <span className="ml-3 text-black">{location.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default BoardSideBar;
