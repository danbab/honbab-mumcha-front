import React, { useState, useEffect } from "react";
import BoardCard from "../components/BoardCard";
import BoardSection from "../components/BoardSection";
import BoardSideBar from "../components/BoardSideBar";
import axios from "axios";
import { Link } from "react-router-dom";

function BoardPage() {
  const [boardDtos, setBoardDtos] = useState([]);
  const [selectedPlaceCategory, setSelectedPlaceCategory] = useState(null);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/board");
        console.log("서버 응답:", response.data);
        setBoardDtos(response.data);
      } catch (error) {
        console.error("서버 요청 에러:", error);
      }
    };

    fetchBoardData();
  }, []);

  const fetchBoardDataByPlaceCategory = async (placeCategory) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/board/place/${placeCategory}`
      );
      console.log(`${placeCategory}에 대한 서버 응답:`, response.data);
      setBoardDtos(response.data);
    } catch (error) {
      console.error(`${placeCategory}에 대한 서버 요청 에러:`, error);
    }
  };

  useEffect(() => {
    if (selectedPlaceCategory) {
      fetchBoardDataByPlaceCategory(selectedPlaceCategory);
    }
  }, [selectedPlaceCategory]);

  return (
    <>
      <div className="flex mx-[4.7rem] flex-wrap justisfy-between items-center ">
        <Link to="/">
          <img src="img/mainlogo.svg" alt="메인로고" className="ml-[8rem]" />
        </Link>
        <div className="flex">
          <img src="img/Bell.svg" alt="이미지" />
          <p>여~! 쓰~벌 브라더~</p>
        </div>
      </div>

      <div className="flex">
        <BoardSideBar onSelectPlaceCategory={setSelectedPlaceCategory} />
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