import React, { useState, useEffect } from "react";
import BoardCard from "../components/BoardCard";
import BoardSideBarFood from "../components/BoardSideBarFood";
import FoodBoardSection from "../components/FoodBoardSection";
import { Link } from "react-router-dom";
import axios from "axios";

function BoardFoodPage() {
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

      <div className="flex">
        <BoardSideBarFood />
        <FoodBoardSection>
          {boardDtos.map((boardDto) => (
            <BoardCard key={boardDto.board_id} boardDto={boardDto} />
          ))}
        </FoodBoardSection>
      </div>
    </>
  );
}

export default BoardFoodPage;
