import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { Link } from "react-router-dom";
import Menu from "./Menu"; // Menu 컴포넌트 import

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMouseOver = () => {
    setShowMenu(true);
  };

  const handleMouseOut = () => {
    setShowMenu(false);
  };

  return (
    <div className="w-[78.75rem] mx-auto my-0">
      <div className="flex justify-between mt-4">
        <div className="flex gap-0">
          <Link to="/">
            <img
              className="mt-[0.75rem]"
              src="img/mainlogo.svg"
              alt="메인로고"
              width="220px"
            />
          </Link>
          <div
            className="mt-[2.8rem] text-[1.25rem] text-normal relative"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            Menu
            {showMenu && (
              <div className="animate-slide-down2 absolute top-full left-0 z-10">
                <Menu />
              </div>
            )}{" "}
          </div>
        </div>
        <div className="mt-[2rem]">
          <Link to="/login">
            <Button type="login">로그인</Button>
          </Link>
          <Link to="/register">
            <Button type="register">회원가입</Button>
          </Link>
        </div>
      </div>
      <div className="relative">
        <Input type="main-search-input" name="검색창" placeholder="검색" />
        <button>
          <img
            className="w-[1.25rem] h-[1.25rem] absolute top-[0.5rem] right-[1.3rem]"
            src="img/search.svg"
            alt="검색버튼"
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
