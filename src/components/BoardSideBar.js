import { useState } from "react";
import { Link } from "react-router-dom";

const BoardSideBar = ({ locations }) => {
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
      image: "img/location.svg",
      alt: "내 위치 아이콘",
    },
    {
      name: "용산",
      image: "img/yongsan.svg",
      alt: "용산 이미지",
    },
    {
      name: "성수",
      image: "img/sungsu.svg",
      alt: "성수 이미지",
    },
    {
      name: "종로",
      image: "img/jongro.svg",
      alt: "종로 이미지",
    },
    {
      name: "동대문",
      image: "img/dongdaemun.svg",
      alt: "동대문 이미지",
    },
    {
      name: "잠실",
      image: "img/jamsil.svg",
      alt: "잠실 이미지",
    },
    {
      name: "여의도",
      image: "img/yeouido.svg",
      alt: "여의도 이미지",
    },
    {
      name: "홍대",
      image: "img/hongdae.svg",
      alt: "홍대 이미지",
    },
    {
      name: "신사",
      image: "img/sinsa.svg",
      alt: "신사 이미지",
    },
    {
      name: "경복궁",
      image: "img/gyeongbokgung.svg",
      alt: "경복궁 이미지",
    },
    {
      name: "청담",
      image: "img/cheongdam.svg",
      alt: "청담 이미지",
    },
    {
      name: "삼성",
      image: "img/samsung.svg",
      alt: "삼성 이미지",
    },
  ];

  return (
    <>
      {/* <div className="w-[1176px] h-[885px] bg-neutral-100 rounded-[5px]" /> */}
      <aside
        id="default-sidebar"
        className="fixed left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-yellow-400 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {locationList.map((location) => (
              <li key={location.alt}>
                <Link
                  to="#"
                  className={`flex items-center p-2 rounded-lg group ${
                    clickedLocation === location.image
                      ? "text-white bg-gray-700"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onMouseEnter={() => handleMouseEnter(location.image)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(location.image)}
                >
                  <span className="ml-3">{location.name}</span>
                </Link>
                {selectedLocation === location.image && (
                  <img src={location.image} alt={location.name} />
                )}
                {clickedLocation === location.image && (
                  <img src={location.image} alt={location.name} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default BoardSideBar;
