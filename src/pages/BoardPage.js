import React from "react";
import BoardCard from "../components/BoardCard";
import BoardSection from "../components/BoardSection";
import BoardSideBar from "../components/BoardSideBar";
import { Link } from "react-router-dom";
function BoardPage() {
  return (
    <>
      <div className="flex mx-[4.7rem] flex-wrap justify-between items-center ">
        <Link to="/">
          <img src="img/mainlogo.svg" alt="메인로고" className="ml-[8rem]" />
        </Link>
        <div className="flex">
          <img src="img/Bell.svg" alt="이미지" />
          <p>여~! 쓰~벌 브라더~</p>
        </div>
      </div>

      {/* <div className="w-[78.75rem] mx-auto my-0">
        <div className="flex justify-between mt-4">
          <img src="img/mainlogo.svg" alt="메인로고" />
          <div id="nav" className="mt-[2rem]">
            <img src="img/Bell.svg" alt="이미지" />
            <p>여~! 쓰~벌 브라더~</p>
          </div>
        </div>
      </div> */}

      <div className="flex">
        <BoardSideBar />
        <BoardSection>
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
        </BoardSection>
      </div>
    </>
  );
}

export default BoardPage;
