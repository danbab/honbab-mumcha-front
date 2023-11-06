import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Tag from "../components/Tag";
// import Swal from "sweetalert2";

const WritePage = () => {
  // const [challenge, setChallenge] = useState("");
  // const [attachment, setAttatchment] = useState("");
  const [buttonHashTag, setbuttonHashTag] = useState("");
  const [hashTags, setHashTags] = useState([]);

  // const onChange = (e) => {
  //   const {
  //     target: { value },
  //   } = e;
  //   setChallenge(value);
  // };

  // const onFileChange = (e) => {
  //   const {
  //     target: { files },
  //   } = e;
  //   const theFile = files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = (finishedEvent) => {
  //     const {
  //       currentTarget: { result },
  //     } = finishedEvent;
  //     setAttatchment(result);
  //   };
  //   reader.readAsDataURL(theFile);
  // };

  const handleButtonHashTag = (val) => {
    setbuttonHashTag(val);
  };

  const handleHashTags = (val) => {
    setHashTags(val);
  };

  // const handleFilterClick = (filter) => {
  //   setFilter(filter);
  //   console.log(filter);
  // };

  return (
    <>
      <div className="flex flex-wrap justify-between items-center w-[74.9375rem] mx-auto my-0">
        <Link to="/">
          <img src="img/mainlogo.svg" alt="메인로고" />
        </Link>
        <div className="flex">
          <img src="img/Bell.svg" alt="이미지" />
          <p>여~! 쓰~벌 브라더~</p>
        </div>
      </div>
      <form>
        <div className="w-[50.5rem] h-[46.75rem] mt-[3rem] mx-auto my-0">
          <div className="flex justify-between border-b-2 border-[#000000] pb-3">
            <div className="text-[1.25rem] mt-[0.5rem]">글쓰기</div>
            <Button type="big-join">참여하기</Button>
          </div>
          <Tag
            buttonHashTag={buttonHashTag}
            handleButtonHashTag={handleButtonHashTag}
            hashTags={hashTags}
            handleHashTags={handleHashTags}
          />
          <div className="flex flex-col mt-5">
            <div className="flex flex-row justify-between mb-4">
              <input
                className="border w-[33.9375rem] h-[2.0625rem] bg-[#F9F9F9] rounded-md px-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                type="text"
                placeholder="식당 이름"
              ></input>
              <select
                className="border w-[12.875rem] h-[2.0625rem] bg-[#F9F9F9] rounded-md px-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                type="text"
              >
                <option selected>음식테마 선택</option>
                <option>양식</option>
                <option>카페</option>
                <option>찜</option>
                <option>일식</option>
                <option>피자</option>
                <option>햄버거</option>
                <option>떡볶이</option>
                <option>아시아</option>
                <option>족발</option>
              </select>
            </div>
            <div className="flex flex-row justify-between mb-4">
              <input
                className="border bg-[#F9F9F9] rounded-md w-[33.9375rem] h-[2.0625rem] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] "
                type="file"
                placeholder="파일"
              ></input>
              <input
                className="border bg-[#F9F9F9] rounded-md px-2 w-[12.875rem] h-[2.0625rem] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] "
                type="date"
                placeholder="날짜"
              ></input>
            </div>
            <input
              className="border bg-[#F9F9F9] rounded-md px-2 h-[2.0625rem] mb-4 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] "
              type="text"
              placeholder="제목"
            ></input>
            <textarea
              className="border bg-[#F9F9F9] rounded-md px-2 h-[36.5rem] mb-5 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] "
              // onChange={onChange}
            ></textarea>
          </div>
        </div>
      </form>
    </>
  );
};

export default WritePage;
