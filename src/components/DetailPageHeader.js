import React from "react";
import Button from "../components/Button";
import { useState } from "react";
import Heart from "react-heart"
import LoadingSpinner from "../components/LoadingSpinner";
/*
 * 게시글 상세 페이지 헤더
 * 구성 요소: 유저 아이콘, 유저 닉네임, 게시글 작성시간, 참여하기 버튼, 좋아요 버튼
 */

//작성시간을 N시간 전으로 변환해주는 함수
function timeDifference(current, previous) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + '초 전';
  }
  else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + '분 전';
  }
  else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + '시간 전';
  }
}

const DetailPageHeader = ({ boardData, isLoading }) => {
  // 좋아요 버튼 active/inactive
  console.log('이건 props로 준 보드 데이터:' + boardData);
  const [active, setActive] = useState(false);

  if (isLoading) {
    return <LoadingSpinner />;  //로딩 중일 때는 LoadingSpinner 컴포넌트를 렌더링
  }

  return (
    <div className="flex justify-between items-center max-w-screen-md md:mx-auto md:p-16 md:mt-10">
      <div className="flex items-center space-x-2">
        <img src="img/usericon.svg" alt="유저아이콘" className="w-12 h-12 rounded-full" />
        <div>
          <div className="text-black text-base font-bold font-['Inter']">
            {/* 모집글 작성자 */}
            <p>{boardData.writer.name}</p>
          </div>

          <div className="text-neutral-400 text-base font-extralight font-['Inter']">
            {/* 모집글 작성일시 */}
            <p>{timeDifference(new Date(), new Date(boardData.regDate))}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-5">
        <p><Button type="big-join" >참여하기</Button></p>
        <div className="inline-block">
          <p>
            <Heart className="w-[2.5rem]" isActive={active} onClick={() => setActive(!active)}
              animationTrigger="both" inactiveColor="rgba(255,125,125,.75)"
              activeColor="#E14949" animationDuration={0.1} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailPageHeader;