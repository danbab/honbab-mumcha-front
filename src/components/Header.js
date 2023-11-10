import React, { useEffect, useState } from "react";
//import axios from "axios";
import Button from "./Button";
import Input from "./Input";
import { Link } from "react-router-dom";
import Menu from "./Menu"; // Menu 컴포넌트 import

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  //const baseUrl = "http://localhost:8080";
  const getCurrentUser = async () => {
    try {
      // const response = await axios.get(baseUrl + "/api/users/current");
      // const currentUser = response.data;
      // setUser(currentUser);
      const storedUser = sessionStorage.getItem("user");
      setUser(storedUser);
      console.log("현재 사용자 정보:", user);
      // 여기에서 currentUser를 사용하거나 처리할 수 있습니다.
    } catch (e) {
      console.error("사용자 정보 가져오기 실패:" + e);
    }
  };

  useEffect(() => {
    // 컴포넌트가 처음으로 렌더링될 때 getCurrentUser 실행
    getCurrentUser();
  }, []); // 빈 배열을 전달하여 이펙트가 한 번만 실행되도록 설정

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
            {user ? (
              // 세션이 있는 경우, 회원 이름과 마이페이지 버튼 표시
              <>
                {user.name}
                {showMenu && (
                  <div className="animate-slide-down2 absolute top-full left-0 z-10">
                    <Menu />
                  </div>
                )}
              </>
            ) : (
              // 세션이 없는 경우, 로그인과 회원가입 버튼 표시
              <>
                Menu
                {showMenu && (
                  <div className="animate-slide-down2 absolute top-full left-0 z-10">
                    <Menu />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="mt-[2rem]">
          {user ? (
            // 세션이 있는 경우, 로그아웃 버튼 표시
            <Link to="">
              <Button type="logout">로그아웃</Button>
            </Link>
          ) : (
            // 세션이 없는 경우, 로그인과 회원가입 버튼 표시
            <>
              <Link to="/login">
                <Button type="login">로그인</Button>
              </Link>
              <Link to="/register">
                <Button type="register">회원가입</Button>
              </Link>
            </>
          )}
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
