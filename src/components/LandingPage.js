import React, { useState } from "react";
import MyMap from "./MyMap";

const LandingPage = () => {
  // 입력 폼 변화 감지하여 입력 값 관리
  const [Value, setValue] = useState("");
  // 제출한 검색어 관리
  const [Keyword, setKeyword] = useState("");

  const keywordChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  // 제출한 검색어 state에 담아주는 함수
  const submitKeyword = (e) => {
    e.preventDefault();
    setKeyword(Value);
  };

  const valueChecker = () => {
    if (Value === "") {
      alert("검색어를 입력해주세요.");
    }
  };

  return (
    <div className="border-t-2 border-[#000000] pb-3 mt-3">
      <div className="landing-page__inner">
        <div className="search-form-container">
          <form className="search-form" onSubmit={submitKeyword}>
            <label htmlFor="place" className="flex gap-3 mb-3.5">
              <input
                type="text"
                id="movie-title"
                className="border w-[21rem] h-[2rem] mt-[1rem] px-2"
                name="place"
                onChange={keywordChange}
                placeholder="검색어를 입력해주세요. (ex: 강남 맛집)"
                required
              />
              <div className="btn-box border w-[3rem] h-[2rem] mt-[1rem] px-2 pt-1 bg-[#54AB75] text-[#ffffff] rounded-md shadow-md">
                <button
                  className="btn form__submit cursor-pointer"
                  type="submit"
                  value="검색"
                  onClick={valueChecker}
                >
                  검색
                </button>
              </div>
            </label>
          </form>
        </div>
        {/* 제출한 검색어 넘기기 */}
        <MyMap searchKeyword={Keyword} />
      </div>
    </div>
  );
};

export default LandingPage;
