import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleClick = (item) => {
    setClickedItem(item);
  };

  return (
    <div className="flex-row space-x-4">
      <div className="w-[65rem] h-[10rem] pt-[1.31rem] pl-[1.25rem] rounded-lg bg-[#f2f2f2]">
        <div className="text-[#54AB75] text-[1rem] py-3 pl-2">Menu</div>
        <ul className="mt-[1.25rem] flex justify-start gap-5">
          <li
            className={`text-[#000] text-[0.8125rem] mb-[1.37rem] py-3 pl-2 ${
              hoveredItem === "food" || clickedItem === "food"
                ? "text-[#54AB75]"
                : ""
            }`}
            onMouseEnter={() => handleMouseEnter("food")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("food")}
          >
            음식으로 약속잡기
          </li>
          <li
            className={`text-[#000] text-[0.8125rem] mb-[1.37rem] py-3 pl-2 ${
              hoveredItem === "location" || clickedItem === "location"
                ? "text-[#54AB75]"
                : ""
            }`}
            onMouseEnter={() => handleMouseEnter("location")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("location")}
          >
            지역으로 약속잡기
          </li>
          <li className="text-[#000] text-[0.8125rem] py-3 pl-2">리뷰게시판</li>
        </ul>
      </div>
      {(hoveredItem === "food" || clickedItem === "food") && (
        <div className="transition-all duration-500 ease-in-out transform translate-x-0 w-[64rem] h-[5rem] pt-[1.31rem] rounded-lg bg-[#F2F2F2] animate-slide-down">
          <ul className="flex justify-evenly">
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              양식
            </li>
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              카페,디저트
            </li>
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              찜
            </li>
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              일식
            </li>
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              피자
            </li>
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              햄버거
            </li>
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              분식
            </li>
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              아시아
            </li>
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              야식
            </li>
          </ul>
        </div>
      )}
      {(hoveredItem === "location" || clickedItem === "location") && (
        <div className="transition-all duration-500 ease-in-out transform translate-x-0 w-[64rem] h-[5rem] pt-[1.31rem] rounded-lg bg-[#F2F2F2] animate-slide-down">
          <ul className="flex justify-evenly">
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              내 위치
            </li>
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              용산
            </li>
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              성수
            </li>
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              종로
            </li>
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              동대문
            </li>
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              잠실
            </li>
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              여의도
            </li>
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              홍대
            </li>
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              신사
            </li>
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              경복궁
            </li>
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              청담
            </li>
            <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] mt-[0.38rem]">
              삼성
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
