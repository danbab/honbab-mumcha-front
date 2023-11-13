import { useState } from "react";
import { Link } from "react-router-dom";

const MyPageSideBar = ({ onSelectMyPageCategory ,user }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);

  const handleClick = (imageName) => {
    setClickedLocation(imageName);
    setSelectedLocation(null);
  };
  const handleMouseEnter = (imageName) => {
    if (!clickedLocation) {
      // 클릭한 항목이 없는 경우에만 selectedLocation을 업데이트
      setSelectedLocation(imageName);
    }
  };
  const handleMouseLeave = () => {
    setSelectedLocation(null); // 마우스가 떠날 때 selectedLocation을 null로 설정
  };
  const myPageList = [
    {
      name: "내약속",
      image: "",
      alt: "내 위치 아이콘",
    },
    {
      name: "내글",
      image: "",
      alt: "용산 이미지",
    },
    {
      name: "내가찜한약속",
      image: "",
      alt: "성수 이미지",
    },
    {
      name: "정보수정",
      image: "",
      alt: "종로 이미지",
    },
    {
      name: "내채팅",
      image: "",
      alt: "동대문 이미지",
    },
    {
      name: "회원탈퇴",
      image: "",
      alt: "잠실 이미지",
    }
  ];

  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 text-lg leading-loose"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 overflow-y-auto">
          <ul className="space-y-2 text-center font-medium">
            {/* 로그인한 회원의 Id를 가지고 와야함 */}
            <Link to="/my" onClick={() => window.location.reload()}>
            <div className="text-[1.5rem] mb-[3.4rem] ml-[1.2rem]" >{user.username}</div>
            </Link>
            {myPageList.map((list) => (
              <li key={list.alt}>
                <Link
                  to="#"
                  className="py-[1.2rem]"
                  onMouseEnter={() => handleMouseEnter(list.name)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    handleClick(list.name);
                    onSelectMyPageCategory(list.name);
                  }}
                >
                  {selectedLocation === list.name ||
                  clickedLocation === list.name ? (
                    <span className="h-[6.625rem] mb-[3.2rem] ml-3 object-cover text-lime-500">{list.name}</span>
                  ) : (
                    <span className="mb-[3.2rem] ml-3 text-black">{list.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default MyPageSideBar;
