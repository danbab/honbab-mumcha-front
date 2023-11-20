import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DetailPageHeader from "../components/DetailPageHeader";
import DetailPageTitleAndContentSection from "../components/DetailPageTitleAndContentSection";
import axios from 'axios';
import LoadingSpinner from "../components/LoadingSpinner";
import DetailPageMapContainer from "../components/DetailPageMapContainer";
import DetailPageJoinList from "../components/DetailPageJoinList";

const BoardDetailPage = () => {
  let { state } = useLocation();
  const [boardData, setBoardData] = useState();
  const [isLoading, setIsLoading] = useState(false);  // 로딩 상태를 관리하는 state
  
  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/board/${state.id}`);
        setBoardData(response.data);
        console.log('axios로 값 받아온 후의 보드 데이터:' + boardData);
      } catch (e) {
        console.error("모집글 상세 정보 가져오기 실패!: ", e);
      } finally {
        setIsLoading(true);
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
      <DetailPageJoinList />
      <div className="flex justify-between max-w-screen-xl mx-auto">
        <div className="w-full h-full mt-20 my-5">
          <DetailPageMapContainer boardData={boardData} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default BoardDetailPage;