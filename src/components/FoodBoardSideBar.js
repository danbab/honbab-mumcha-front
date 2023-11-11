import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FoodBoardSideBar = ({
  onSelectPlaceCategory,
  selectedPlaceImg,
  setSelectedPlaceImg,
}) => {
  const [selectedLocation, setSelectedLocation] = useState(null); //마우스 오버
  const [clickedLocation, setClickedLocation] = useState(null); //마우스 클릭

  useEffect(() => {
    if (selectedPlaceImg) {
      setClickedLocation(selectedPlaceImg);
    }
  }, []);
  useEffect(() => {
    setClickedLocation(selectedPlaceImg);
  }, [selectedPlaceImg]);

  const handleClick = (imgName, locationName) => {
    if (clickedLocation === imgName) {
      setClickedLocation(null);
      setSelectedPlaceImg(null);
      onSelectPlaceCategory(null);
    } else {
      setClickedLocation(imgName);
      setSelectedLocation(null);
      onSelectPlaceCategory(locationName);
      setSelectedPlaceImg(imgName);
    }
  };
  const handleMouseEnter = (imgname) => {
    if (!clickedLocation) {
      // 클릭한 항목이 없는 경우에만 selectedLocation을 업데이트
      setSelectedLocation(imgname);
    }
  };
  const handleMouseLeave = () => {
    setSelectedLocation(null); // 마우스가 떠날 때 selectedLocation을 null로 설정
  };
  const locationList = [
    {
      name: "양식",
      image: "img/pastaSideBar.svg",
      alt: "파스타 아이콘",
    },
    {
      name: "카페",
      image: "img/cafeSideBar.svg",
      alt: "카페 이미지",
    },
    {
      name: "찜",
      image: "img/zzimSideBar.svg",
      alt: "찜 이미지",
    },
    {
      name: "일식",
      image: "img/japanSideBar.svg",
      alt: "일식 이미지",
    },
    {
      name: "피자",
      image: "img/pizzaSideBar.svg",
      alt: "피자 이미지",
    },
    {
      name: "햄버거",
      image: "img/hambergerSideBar.svg",
      alt: "햄버거 이미지",
    },
    {
      name: "분식",
      image: "img/dduckbockyBar.svg",
      alt: "분식 이미지",
    },
    {
      name: "아시아",
      image: "img/asiaSideBar.svg",
      alt: "아시아 이미지",
    },
    {
      name: "야식",
      image: "img/nightfoodSideBar.svg",
      alt: "야식 이미지",
    },
  ];

  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed bg-white left-0 z-40 w-[170px] d_s:w-64 h-screen transition-transform -translate-x-full t_ms:translate-x-0 text-lg leading-loose"
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
                    handleClick(location.image, location.name);
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

export default FoodBoardSideBar;
