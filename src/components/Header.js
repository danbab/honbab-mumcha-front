import React from "react";
import Button from "./Button";
import Input from "./Input";

const Header = () => {
  return (
    <div className="w-[78.75rem] mx-auto my-0">
      <div className="flex justify-between mt-4">
        <img src="img/mainlogo.svg" alt="메인로고" />
        <div className="mt-[2rem]">
          <Button type="login">로그인</Button>
          <Button type="register">회원가입</Button>
        </div>
      </div>
      <div className="relative">
        <Input type="main-search-input" name="검색창" />
        <img
          className="w-[1.25rem] h-[1.25rem] absolute top-[0.5rem] right-[1.3rem]"
          src="img/search.svg"
          alt="검색버튼"
        />
      </div>
    </div>
  );
};

export default Header;
