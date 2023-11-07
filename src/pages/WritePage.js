import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Tag from "../components/Tag";
import axios from "axios";
import LandingPage from '../components/LandingPage';

const WritePage = () => {
  const [buttonHashTag, setbuttonHashTag] = useState("");
  const [hashTags, setHashTags] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [foodTheme, setFoodTheme] = useState("");
  const [file, setFile] = useState(null);
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleButtonHashTag = (val) => {
    setbuttonHashTag(val);
  };

  const handleHashTags = (val) => {
    setHashTags(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("restaurantName", restaurantName);
    formData.append("foodTheme", foodTheme);
    formData.append("file", file);
    formData.append("date", date);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("hashTags", hashTags);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/article",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
      <LandingPage />
      <form onSubmit={handleSubmit}>
        <div className="w-[50.5rem] h-[46.75rem] mt-[3rem] mx-auto my-0">
          <div className="flex justify-between border-b-2 border-[#000000] pb-3">
            <div className="text-[1.25rem] mt-[0.5rem]">글쓰기</div>
            <button
              className="rounded-[0.625rem] text-[0.75rem] w-[6.3125rem] h-[2.4375rem] bg-[#54AB75] text-[#ffffff] shadow-md"
              type="submit"
            >
              약속 만들기
            </button>
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
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
              />
              <select
                className="border w-[12.875rem] h-[2.0625rem] bg-[#F9F9F9] rounded-md px-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                value={foodTheme}
                onChange={(e) => setFoodTheme(e.target.value)}
                defaultValue={"음식테마 선택"}
              >
                <option value="음식테마 선택">음식테마 선택</option>
                <option value="양식">양식</option>
                <option value="카페">카페</option>
                <option value="찜">찜</option>
                <option value="일식">일식</option>
                <option value="피자">피자</option>
                <option value="햄버거">햄버거</option>
                <option value="떡볶이">떡볶이</option>
                <option value="아시아">아시아</option>
                <option value="족발">족발</option>
              </select>
            </div>
            <div className="flex flex-row justify-between mb-4">
              <input
                className="border bg-[#F9F9F9] rounded-md w-[33.9375rem] h-[2.0625rem] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                type="file"
                placeholder="파일"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <input
                className="border bg-[#F9F9F9] rounded-md px-2 w-[12.875rem] h-[2.0625rem] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                type="date"
                placeholder="날짜"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <input
              className="border bg-[#F9F9F9] rounded-md px-2 h-[2.0625rem] mb-4 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="border bg-[#F9F9F9] rounded-md px-2 h-[36.5rem] mb-5 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>
      </form>
    </>
  );
};

export default WritePage;
