import React from "react";
import MainSectionTitle from "./MainSectionTitle";
import { Link } from "react-router-dom";

const MenuSquare = () => {
  const menus = [
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
  const storeCategoryInSession = (menu) => {
    sessionStorage.setItem("categoryName", menu.name);
    sessionStorage.setItem("categoryImage", menu.image);
  };
  return (
    <>
      <MainSectionTitle type="food-section">음식으로 약속잡기</MainSectionTitle>
      <Link to="boardList">
        <div className="grid grid-cols-3 gap-y-[0.8rem] mt-[2.7rem] w-[78.75rem] mx-auto my-0">
          {menus.map((menu) => (
            <div className="w-[361px] h-[194px] rounded-[10px] overflow-hidden">
              <img
                className="shadow hover:scale-150 transition-transform duration-1000 ease-in-out"
                src={menu.image}
                alt={menu.alt}
                onClick={() => storeCategoryInSession(menu)}
              ></img>
            </div>
          ))}
        </div>
      </Link>
    </>
  );
};

export default MenuSquare;
