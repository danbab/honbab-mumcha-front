import React from "react";
import MainSectionTitle from "./MainSectionTitle";
import { Link } from "react-router-dom";

const MenuSquare = () => {
  const menus = [
    {
      image: "img/westernfood.svg",
      alt: "양식 음식 이미지",
    },
    {
      image: "img/dessert.svg",
      alt: "디저트 이미지",
    },
    {
      image: "img/koreanfood.svg",
      alt: "한식 음식 이미지",
    },
    {
      image: "img/japanfood.svg",
      alt: "일식 음식 이미지",
    },
    {
      image: "img/pizza.svg",
      alt: "피자 음식 이미지",
    },
    {
      image: "img/hamburger.svg",
      alt: "햄버거 음식 이미지",
    },
    {
      image: "img/snackbar.svg",
      alt: "분식 음식 이미지",
    },
    {
      image: "img/asiafood.svg",
      alt: "아시아 음식 이미지",
    },
    {
      image: "img/midnightsnack.svg",
      alt: "야식 음식 이미지",
    },
  ];
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
              ></img>
            </div>
          ))}
        </div>
      </Link>
    </>
  );
};

export default MenuSquare;
