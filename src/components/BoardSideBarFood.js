import { useState } from "react";
import { Link } from "react-router-dom";

const BoardSideBar = ({ onSelectFoodCategory }) => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [clickedFood, setClickedFood] = useState(null);

  const handleClick = (imageName) => {
    setClickedFood(imageName);
    setSelectedFood(null);
  };
  const handleMouseEnter = (imageName) => {
    if (!clickedFood) {
      // 클릭한 항목이 없는 경우에만 selectedFood을 업데이트
      setSelectedFood(imageName);
    }
  };
  const handleMouseLeave = () => {
    setSelectedFood(null); // 마우스가 떠날 때 selectedFood을 null로 설정
  };
  const foodCategoryList = [
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
      alt: "동대문 이미지",
    },
    {
      name: "햄버거",
      image: "img/hambergerSideBar.svg",
      alt: "잠실 이미지",
    },
    {
      name: "분식",
      image: "img/dduckbockyBar.svg",
      alt: "여의도 이미지",
    },
    {
      name: "아시아",
      image: "img/asiaSideBar.svg",
      alt: "홍대 이미지",
    },
    {
      name: "야식",
      image: "img/nightfoodSideBar.svg",
      alt: "신사 이미지",
    },
  ];

  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 text-lg leading-loose"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {foodCategoryList.map((food) => (
              <li key={food.alt}>
                <Link
                  to=""
                  className="py-2"
                  onMouseEnter={() => handleMouseEnter(food.image)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    handleClick(food.image);
                    onSelectFoodCategory(food.name);
                  }}
                >
                  {selectedFood === food.image || clickedFood === food.image ? (
                    <img
                      src={food.image}
                      alt={food.name}
                      className="h-[6.625rem] object-cover w-full"
                    />
                  ) : (
                    <span className="ml-3 text-black">{food.name}</span>
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
