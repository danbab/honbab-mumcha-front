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
    <div className="landing-page">
      <div className="landing-page__inner">
        <div className="search-form-container">
          <form className="search-form" onSubmit={submitKeyword}>
            <label htmlFor="place" className="form__label">
              <input
                type="text"
                id="movie-title"
                className="form__input"
                name="place"
                onChange={keywordChange}
                placeholder="검색어를 입력해주세요. (ex: 강남 맛집)"
                required
              />
              <div className="btn-box">
                <input
                  className="btn form__submit"
                  type="submit"
                  value="검색"
                  onClick={valueChecker}
                />
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