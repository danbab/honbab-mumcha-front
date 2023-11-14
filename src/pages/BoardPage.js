import React, { useState, useEffect, useRef } from "react";
import BoardCard from "../components/BoardCard";
import BoardSection from "../components/BoardSection";
import BoardSideBar from "../components/BoardSideBar";
import BoardSideBarModal from "../components/BoardSideBarModal";
import axios from "axios";
import { Link } from "react-router-dom";

function BoardPage() {
  const [boardDtos, setBoardDtos] = useState([]);
  const [selectedPlaceCategory, setSelectedPlaceCategory] = useState();
  const [selectedPlaceImg, setSelectedPlaceImg] = useState();

  //사이드바 모달창
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();
  const handleOpenModal = () => {
    if (window.innerWidth < 878) {
      setIsModalOpen(true);
    }
  };

  //사이드바 모달창 밖을 클릭하면 모달창 out
  const handleOverlayClick = (event) => {
    if (event.target === modalRef.current) {
      setIsModalOpen(false);
    }
  };
  //일정크기 이상이 되면 모달창은 false
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 878) {
        setIsModalOpen(false);
//     const fetchBoardData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/board");
//         console.log("서버 응답:", response.data);
//         setBoardDtos(response.data);
//       } catch (error) {
//         console.error("서버 요청 에러:", error);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchBoardData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/board");
      console.log("서버 응답:", response.data);
      setBoardDtos(response.data);
    } catch (error) {
      console.error("서버 요청 에러:", error);
    }
  };

  useEffect(() => {
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
    } else {
      //전체보드
      fetchBoardData();
    }
  }, [selectedPlaceCategory]);

  return (
    <>
      <div className="flex mx-[4.7rem] flex-wrap justisfy-between items-center ">
        <Link to="/">
          <img src="img/mainlogo.svg" alt="메인로고" className="ml-[8rem]" />
        </Link>
        {/* 다시 추가 */}
        {/* <div className="flex">
          <img src="img/Bell.svg" alt="이미지" />
          <p>여~! 쓰~벌 브라더~</p>
        </div> */}{" "}
      </div>
      <img
        src="img/menubarButton.svg"
        onClick={handleOpenModal}
        className="hidden m_s:block w-5 h-6"
      />

      <div className="flex">
        <BoardSideBar
          onSelectPlaceCategory={setSelectedPlaceCategory}
          selectedPlaceImg={selectedPlaceImg} //selectedPlaceImg = 선택된 imgname
          setSelectedPlaceImg={setSelectedPlaceImg}
        />

        <BoardSection>
          {boardDtos.map((boardDto) => (
            <BoardCard key={boardDto.board_id} boardDto={boardDto} />
          ))}
        </BoardSection>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={handleOverlayClick}
            ref={modalRef}
          />
          <div className="h-screen flex items-center justify-center">
            <BoardSideBarModal
              onSelectPlaceCategory={setSelectedPlaceCategory}
              selectedPlaceImg={selectedPlaceImg} //selectedPlaceImg = 선택된 imgname
              setSelectedPlaceImg={setSelectedPlaceImg}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default BoardPage;