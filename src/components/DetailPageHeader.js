import React from "react";
import Button from "./Button";
import { useState } from "react";
import Heart from "react-heart"
/*
 * 게시글 상세 페이지 헤더
 * 구성 요소: 유저 아이콘, 유저 닉네임, 게시글 작성시간, 참여하기 버튼, 좋아요 버튼
 */

const DetailPageHeader = () => {
  const userNickname = '닉네임';
  const postingTime = '5';

  // 좋아요 버튼 active/inactive
  const [active, setActive] = useState(false);

  return (
    <div className="flex justify-between items-center max-w-screen-md md:mx-auto md:p-16 md:mt-10">
      <div className="flex items-center space-x-2">
        <img src="img/usericon.svg" alt="유저아이콘" className="w-12 h-12 rounded-full" />
        <div>
          <div className="text-black text-base font-bold font-['Inter']">
            <p>{userNickname}</p>
          </div>

          <div className="text-neutral-400 text-base font-extralight font-['Inter']">
            <p>{postingTime}시간 전</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-5">
        <p><Button type="big-join">참여하기</Button></p>
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
}

export default DetailPageHeader;