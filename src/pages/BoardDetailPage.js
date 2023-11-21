import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailPageHeader from "../components/DetailPageHeader";
import DetailPageTitleAndContentSection from "../components/DetailPageTitleAndContentSection";
import axios from 'axios';
import LoadingSpinner from "../components/LoadingSpinner";
import DetailPageMapContainer from "../components/DetailPageMapContainer";
import DetailPageJoinList from "../components/DetailPageJoinList";
import { useCookies } from "react-cookie";

const BoardDetailPage = () => {
  //useParams를 사용하여 boardId 상태 관리
  const { boardId: paramBoardId } = useParams();

  //boardId가 소실되지 않도록 localStorage에 저장
  let boardId;
  if (paramBoardId) {
    localStorage.setItem('boardId', paramBoardId);
    boardId = paramBoardId;
  } else {
    boardId = localStorage.getItem('boardId');
  }

  const [boardData, setBoardData] = useState();
  const [isLoading, setIsLoading] = useState(true);  // 로딩 상태를 관리하는 state

  //토큰 사용을 위한 초기화
  const [cookies] = useCookies();
  const token = cookies.token;
  const userInfo = JSON.parse(sessionStorage.getItem('user'));
  const userId = userInfo.id;

  console.log("세션에 담긴 유저 아이디:" + userId);

  //요청 헤더에 토큰 값과 userId를 함께 전달
  const requestOption = {
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Id': userId
    }
  };

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/board/boardDetails/${boardId}`, requestOption);
        setBoardData(response.data);
        console.log('axios로 값 받아온 후의 보드 데이터:' + response.data);
      } catch (e) {
        console.error("모집글 상세 정보 가져오기 실패!: ", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBoardData();
  }, [boardId]);

  if (isLoading || !boardData) {
    return <LoadingSpinner />;  // 로딩 중일 때는 LoadingSpinner 컴포넌트를 렌더링
  }

  return (
    <div>
      <DetailPageHeader boardData={boardData} isLoading={isLoading} userId={userId} />
      <DetailPageTitleAndContentSection boardData={boardData} isLoading={isLoading} />
      <DetailPageJoinList boardData={boardData} isLoading={isLoading} />
      <div className="flex justify-between max-w-screen-lg mx-auto">
        <div className="lg: w-full lg: h-full">
          <DetailPageMapContainer boardData={boardData} />
        </div>
      </div>
    </div>
  );
};

export default BoardDetailPage;