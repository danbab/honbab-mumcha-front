import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Heart from "../components/Heart"
import LoadingSpinner from "../components/LoadingSpinner";
import axios from 'axios';
import { useCookies } from "react-cookie";

/*
 * 게시글 상세 페이지 헤더
 * 구성 요소: 유저 아이콘, 유저 닉네임, 게시글 작성시간, 참여하기 버튼, 좋아요 버튼, 삭제 버튼
 */

const DetailPageHeader = ({ boardData, isLoading, userId }) => {
  // 게시글 작성시간 N시간 전으로 변경하는 함수
  const [regDate, setRegDate] = useState("");
  useEffect(() => {
    const date = new Date(boardData.regDate);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours >= 24) {
      setRegDate(`${Math.ceil(hours / 24)}일 전`);
    } else {
      setRegDate(`${hours}시간 전`);
    }
  }, [boardData.regDate]);

  //토큰 사용을 위한 초기화
  const [cookies] = useCookies();
  const token = cookies.token;

  console.log("세션에 담긴 유저 아이디:" + userId);

  //요청 헤더에 토큰 값과 userId를 함께 전달
  const requestOption = {
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Id': userId
    }
  };

  // 삭제 상태를 저장할 상태를 추가합니다.
  const [deleteStatus, setDeleteStatus] = useState(null);

  // 삭제 함수를 useEffect 밖으로 빼냅니다.
  const deleteBoard = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/board/boardDetails/delete/${boardData.boardId}`, requestOption);
      setDeleteStatus(response.data); // 결과를 상태에 저장합니다.
    } catch (e) {
      console.error("에러메시지: ", e);
    }
  };

  // 삭제 버튼 클릭 핸들러
  const handleDeleteClick = () => {
    // 사용자에게 삭제 여부를 묻습니다.
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    if (confirmDelete) {
      // 사용자가 '확인'을 클릭하면 삭제 함수를 호출합니다.
      deleteBoard();
    }
  };

  // 좋아요 버튼 active/inactive
  const [active, setActive] = useState(false);

  if (isLoading || !boardData) {
    return <LoadingSpinner />;    //로딩 중일 때는 LoadingSpinner 컴포넌트를 렌더링
  }

  return (
    <div className="flex justify-between items-center max-w-screen-md md:mx-auto md:p-16 md:mt-10 font-sans">
      <div className="flex items-center space-x-2">
        <img src="/img/usericon.svg" alt="유저아이콘" className="w-12 h-12 rounded-full" />
        <div>
          <div className="text-gray-950 text-base font-bold">
            {/* 모집글 작성자 */}
            <p>{boardData.writer.name}</p>
          </div>

          <div className="text-neutral-400 text-base font-extralight">
            {/* 모집글 작성일시 */}
            <p>{regDate}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-5">
        {/* 조회수 */}
        <div className="text-neutral-500 text-lg font-extralight">
          <p>조회수: {boardData.hit}</p>
        </div>

        <div className="inline-flex space-x-5">
          <p><Button type="big-join" >참여하기</Button></p>
          <p>
            <Heart className="w-[2.4rem]" isActive={active} onClick={() => setActive(!active)}
              animationTrigger="both" inactiveColor="rgba(255,125,125,.75)"
              activeColor="#E14949" animationDuration={0.1} />
          </p>
        </div>

        {/* 수정 및 삭제 버튼 추가 */}
        {userId === boardData.writer.id && (
          <div className="flex space-x-2">
            {/* <p><Button type="board-modify">수정</Button></p> */}
            <p><Button type="board-delete" onClick={handleDeleteClick}>삭제</Button></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPageHeader;