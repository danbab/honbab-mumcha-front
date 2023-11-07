import React, { useState, useEffect } from "react";
import BoardCard from "../components/BoardCard";
import BoardSection from "../components/BoardSection";
import BoardSideBar from "../components/BoardSideBar";
import axios from "axios";

import { Link } from "react-router-dom";
function BoardPage() {
  const [boardDtos, setBoardDtos] = useState([]);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/board");
        console.log("서버 응답:", response.data);
        setBoardDtos(response.data);
      } catch (error) {
        console.error("서버 요청 에러:", error);
      }
    };

    fetchBoardData();
  }, []);

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
          
            {boardDtos.map((boardDto) => (
              <BoardCard key={boardDto.board_id} boardDto={boardDto} />
            ))}
          
        </BoardSection>
      </div>
    </>
  );
}

export default BoardPage;
