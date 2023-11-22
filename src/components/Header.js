import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import { Link } from "react-router-dom";
import Menu from "./Menu"; // Menu 컴포넌트 import
import { useCookies } from "react-cookie";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);

  //검색어를 저장하기 위한 상태선언
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");

  //쿠키에 있는 토큰을 활용하기 위한 선언
  const [cookies, setCookies] = useCookies();

  const getCurrentUser = async () => {
    try {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        // JSON 문자열을 객체로 변환
        const userObject = JSON.parse(storedUser);
        setUser(userObject);
      }
    } catch (e) {
      console.error("사용자 정보 가져오기 실패:" + e);
    }
  };

  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value); // 검색어가 입력될 때마다 state 업데이트
    sessionStorage.setItem("keyword", e.target.value); // 세션에 검색어 저장
  };
  const handleSearch = (e) => {
    e.preventDefault(); // form의 기본 동작인 페이지 리로딩을 막기 위해 추가
    navigate("/boardList"); // boardList 페이지로 이동
  };

  useEffect(() => {
    // 컴포넌트가 처음으로 렌더링될 때 getCurrentUser 실행
    getCurrentUser();
  }, []); // 빈 배열을 전달하여 이펙트가 한 번만 실행되도록 설정

  const handleMenuClick = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu); // showMenu 상태를 토글
  };

  const handleLogout = () => {
    // 로그아웃 버튼을 클릭했을 때 쿠키에 저장된 토큰 삭제 (만료시간을 현재로 바꾸어 토큰이 유효하지 않게 함.)
    setCookies("token", "", { expires: new Date() });
    // 로그아웃 버튼을 클릭했을 때 세션에서 사용자 정보 삭제
    sessionStorage.removeItem("user");
    // 사용자 상태 초기화
    setUser(null);
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
            className="mt-[2.8rem] text-[1.25rem] text-normal relative cursor-pointer"
            onClick={handleMenuClick}
          >
            {user ? (
              // 세션이 있는 경우, 회원 이름과 마이페이지 버튼 표시
              <div className="cursor-pointer">
                Menu
                {showMenu && <Menu />}
              </div>
            ) : (
              // 세션이 없는 경우, 로그인과 회원가입 버튼 표시
              <div className="cursor-pointer">
                Menu
                {showMenu && <Menu />}
              </div>
            )}
          </div>
        </div>
        <div className="mt-[2rem]">
          {user ? (
            // 세션이 있는 경우, 로그아웃 버튼 표시
            <div className="flex">
              <div className="mr-[1rem] mt-[0.37rem]">{user.name}</div>
              <Button type="log-out" onClick={handleLogout}>
                로그아웃
              </Button>
              <Link to="/my" className="ml-[1.44rem]">
                <Button type="my-page">마이페이지</Button>
              </Link>
            </div>
          ) : (
            // 세션이 없는 경우, 로그인과 회원가입 버튼 표시
            <>
              <Link to="/login" className="mr-[2.44rem]">
                <Button type="login">로그인</Button>
              </Link>
              <Link to="/register">
                <Button type="register">회원가입</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <form className="relative flex justify-end" onSubmit={handleSearch}>
        <Input
          type="main-search-input"
          name="검색창"
          placeholder="검색"
          onChange={handleInputChange}
          value={searchKeyword}
        />
        <button type="submit">
          <img
            className="w-[1.25rem] h-[1.25rem] absolute top-[0.5rem] right-[1.3rem]"
            src="img/search.svg"
            alt="검색버튼"
          />
        </button>
      </form>
    </div>
  );
};

export default Header;
