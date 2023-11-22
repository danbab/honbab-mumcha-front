import { useState } from "react";
import Button from "../components/Button";
import axios from "axios";

const MyBoardCard = ({ partyUser, user, boardId }) => {
  // let style = "rounded-[0.625rem] shadow-md";
  let birthDate = new Date(partyUser.birth);
  let today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  let month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  //남자 여자 변경
  let gender = partyUser.gender === 'm' ? '남자' : '여자';

  // 지역화된 문자열로 변환
  // date = date
  //   .toLocaleDateString("ko-KR", options)
  //   .replace(/\./g, "-")
  //   .replace(/ /g, "");

  const acceptParticipant = () => {
    axios
      .post("http://localhost:8080/api/app/acceptparticipants", {
        boardNo: boardId[0],
        email: partyUser.email,
      })
      .then((response) => {
        console.log("acceptparticipants response" + response);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data);
          //console.log(error.response);
        } else if (error.response.status === 401) {
          alert("권한이 없습니다. 로그인해주세요.");
          sessionStorage.setItem("togoUrl", "/boardList");
          window.location.href = "/login";
        } else alert("Client : 서버 오류");
      });
  };
  const denyParticipant = () => {
    axios
      .post("http://localhost:8080/api/app/denyparticipants", {
        boardNo: boardId[0],
        email: partyUser.email,
      })
      .then((response) => {
        console.log("denyparticipants response" + response);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data);
          //console.log(error.response);
        } else if (error.response.status === 401) {
          alert("권한이 없습니다. 로그인해주세요.");
          sessionStorage.setItem("togoUrl", "/boardList");
          window.location.href = "/login";
        } else alert("Client : 서버 오류");
      });
  };

  return (
    <div className="bg-[#FDFDFD] w-[15.625rem] h-[24.875rem] rounded-[1.25rem] relative">
      <div className="w-[14.25rem] h-[21.875rem] flex justify-between mx-auto">
        <div className="flex gap-2 ml-2 mt-4">
          <img className="w-[2.125rem] h-[2.125rem]" src="img/iamlogo.svg" />
          {/* 작성자 이름 */}
          <div className="text-[#000] text-[12px] mt-3">{partyUser.name}</div>
        </div>
        {/* 작성일-reg_date */}
        <div className="text-[#0e0a0a] text-[10px] mt-[2.1rem] mr-[0.5rem]">
          {"나이: " + age}
        </div>
        {/* {boardDto.regDate != boardDto.lastModified && (
          <span className="absolute top-12 right-[1.2rem] text-[#BFBFBF] text-[10px]">
            수정됨
          </span>
          )} */}
      </div>
      <img
        className="absolute top-[4.5rem] right-0 w-full h-[12.1875rem] "
        src="img/profile.svg"
      />
      {/* 글 제목-title */}
      {/* <p className="absolute bottom-[6rem] left-[1rem] text-[0.9375rem] font-bold">
        {boardDto.title}
      </p> */}
      <ul className="list-disc absolute bottom-[3.8rem] left-[2rem] ">
        <li className="text-[#8B8686] text-[0.8rem]">{partyUser.birth}</li>
        <li className="text-[#8B8686] text-[0.8rem]">{gender}</li>
      </ul>
      <Button type="join-status-pending" onClick={acceptParticipant}>
        수락
      </Button>
      <Button type="join-status-rejected" onClick={denyParticipant}>
        거절
      </Button>
   
    </div>
  );
};

export default MyBoardCard;
