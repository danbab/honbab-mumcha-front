import React from "react";
import BoardCard from "../components/BoardCard";
import BoardSection from "../components/BoardSection";
import BoardSideBar from "../components/BoardSideBar";
import BoardSideBarFood from "../components/BoardSideBarFood";
import FoodBoardSection from "../components/FoodBoardSection";
function BoardFoodPage() {
  return (
    <>
      <div className="flex mx-[4.7rem] flex-wrap justify-between items-center ">
        <img src="img/mainlogo.svg" alt="메인로고" className="ml-[8rem]" />
        <div className="flex">
          <img src="img/Bell.svg" alt="이미지" />
          <p>여~! 쓰~벌 브라더~</p>
        </div>
      </div>

      <div className="flex">
        <BoardSideBarFood />
        <FoodBoardSection>
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
        </FoodBoardSection>
      </div>
    </>
  );
}

export default BoardFoodPage;
