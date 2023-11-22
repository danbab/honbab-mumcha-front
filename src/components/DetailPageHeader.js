import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import DetailPageHeart from "../components/DetailPageHeart"
import LoadingSpinner from "../components/LoadingSpinner";
import axios from 'axios';
import { useCookies } from "react-cookie";

/*
 * 게시글 상세 페이지 헤더
 * 구성 요소: 유저 아이콘, 유저 닉네임, 게시글 작성시간, 참여하기 버튼, 좋아요 버튼, 삭제 버튼
 */

const DetailPageHeader = ({ boardData, isLoading, userId, userInfo }) => {
  console.log("유저 정보 = " + JSON.stringify(userInfo));
  console.log("보드데이터 = " + JSON.stringify(boardData));
  const boardId = boardData.boardId;
  const navigate = useNavigate();

  //boardData 세션에 담아서 editPage로 navigate
  const tempStorage = () => {
    sessionStorage.setItem("boardData" , JSON.stringify(boardData));
    navigate(`/edit/${boardId}`)
  }

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

  //좋아요 버튼 상태 관리
  const [active, setActive] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:8080/api/app/find/like/${boardId}`, requestOption)
      .then(response => {
        const likeStatus = response.data;
        console.log("좋아요 axios 리스폰스 데이터: " + JSON.stringify(response.data));
        setActive(likeStatus ? true : false);
      })
      .catch(error => {
        // 오류 처리
        console.error(error);
      });
  }, [boardData.boardId]);

  //참여하기 버튼 이벤트 함수
  const enterParty = () => {
    //로그인 되어 있지 않으면 로그인 페이지로
    if (userInfo === null) {
      alert("로그인이 필요합니다");
      sessionStorage.setItem("togoUrl", "/boardList");
      window.location.href = "/login";
    } else {
      //로그인 되어 있다면 서버에 참가하기 요청
      axios
        .post("http://localhost:8080/api/app/participate", {
          boardNo: boardData.boardId,
          email: userInfo.email,
          username: userInfo.name,
        })
        .then((response) => {
          console.log("what" + response);
          let confirmMove = window.confirm(
            "참가신청이 완료되었습니다.\n마이페이지로 이동하시겠습니까?"
          );
          if (confirmMove) {
            window.location.href = "/my";
          } else {
            window.location.reload();
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alert(error.response.data);
          } else if (error.response.status === 401) {
            alert("권한이 없습니다. 로그인해주세요.");
            sessionStorage.setItem("togoUrl", "/boardList");
            window.location.href = "/login";
          } else alert("Client : 서버 오류");
        });
    }
  };

  if (isLoading || !boardData) {
    return <LoadingSpinner />;    //로딩 중일 때는 LoadingSpinner 컴포넌트를 렌더링
  }

  return (
    <div className="flex justify-between items-center max-w-screen-md md:mx-auto p-16 mt-10 font-sans">
      <div className="flex items-center space-x-2">
        <img src="/img/usericon.svg" alt="유저아이콘" className="w-11 h-11 rounded-full" />
        <div>
          <div className="text-gray-800 text-base font-semibold">
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
          <Button type="big-join" onClick={enterParty} >참여하기</Button>
          <DetailPageHeart className="w-[2.4rem]" isActive={active} inactiveColor="rgba(255,125,125,.75)" activeColor="#E14949" />

          {/* 수정 버튼 */}
          {userId === boardData.writer.id && (
            <Button type="board-modify" onClick={tempStorage}>수정</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPageHeader;