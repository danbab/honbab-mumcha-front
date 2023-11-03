import React from "react";
import Button from "./Button";
import { useState } from "react"
import Heart from "react-heart"

// 회원 아이콘, 회원 닉네임, 게시 시간, 참여하기 버튼, 좋아요 버튼 가로 배치 
const DetailPageHeader = () => {
  const userNickname = '닉네임';
  const postingTime = '5';

  // 좋아요 버튼 active/inactive
  const [active, setActive] = useState(false);
  return (
    <div className="mt-[66px] ml-auto mr-auto flex">
      <img src="img/usericon.svg" alt="유저아이콘" className= "ml-auto" />
      <div className="mt-auto pl-1.5 mr-auto">
        <div className="text-black text-base font-bold font-['Inter']">
        {userNickname}
        </div>

        <div className="text-neutral-400 text-base font-extralight font-['Inter']">
        {postingTime}시간 전
        </div>
      </div>

      <div className="mt-auto ml-auto mr-auto flex">
        <Button type="big-join">참여하기</Button>
        <div className="w-10 h-10  ml-2 relative">
          <Heart isActive={active} onClick={() => setActive(!active)} 
          animationTrigger="both" inactiveColor="rgba(255,125,125,.75)" 
          activeColor="#E14949" animationDuration={0.1} />
        </div>
      </div>
    </div>
  );
}

export default DetailPageHeader;