import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import DetailPageHeader from "../components/DetailPageHeader";
import DetailPageTitleAndContentSection from "../components/DetailPageTitleAndContentSection";
import MapContainer from "../components/MapContainer";
import axios from 'axios';
import LoadingSpinner from "../components/LoadingSpinner";

const BoardDetailPage = () => {
  let { state } = useLocation();
  const [boardData, setBoardData] = useState();
  console.log("state.id: " + state.id);
  const [isLoading, setIsLoading] = useState(true);  // 로딩 상태를 관리하는 state

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/board/${state.id}`);
        setBoardData(response.data);
        console.log('axios로 값 받아온 후의 보드 데이터:' + boardData);
      } catch (e) {
        console.error("모집글 상세 정보 가져오기 실패!: ", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBoardData();
  }, [state.id]);

  if (isLoading) {
    return <LoadingSpinner />;  // 로딩 중일 때는 LoadingSpinner 컴포넌트를 렌더링
  }

  return (
    <div>
      <DetailPageHeader boardData={boardData} isLoading={isLoading} />
      <DetailPageTitleAndContentSection boardData={boardData} isLoading={isLoading} />

      <div className="flex max-w-screen-xl xl:mx-auto xl:justify-between">
        <div className="w-full h-full my-20">
          <MapContainer boardData={boardData} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default BoardDetailPage;