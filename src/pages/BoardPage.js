import React, { useState, useEffect, useRef } from "react";
import BoardCard from "../components/BoardCard";
import BoardSection from "../components/BoardSection";
import BoardSideBar from "../components/BoardSideBar";
import BoardSideBarModal from "../components/BoardSideBarModal";
import axios from "axios";
import { Link } from "react-router-dom";

function BoardPage() {
  const locationList = [
    {
      name: "내 위치",
      image: "img/myPlaceSideBar.svg",
      alt: "내 위치 아이콘",
    },
    {
      name: "용산",
      image: "img/youngsanSideBar.svg",
      alt: "용산 이미지",
    },
    {
      name: "성수",
      image: "img/SengsuSideBar.svg",
      alt: "성수 이미지",
    },
    {
      name: "종로",
      image: "img/JongnoSideBar.svg",
      alt: "종로 이미지",
    },
    {
      name: "동대문",
      image: "img/DongdaemunSideBar.svg",
      alt: "동대문 이미지",
    },
    {
      name: "잠실",
      image: "img/JamsilSideBar.svg",
      alt: "잠실 이미지",
    },
    {
      name: "여의도",
      image: "img/YeouidoSideBar.svg",
      alt: "여의도 이미지",
    },
    {
      name: "홍대",
      image: "img/HongdaeSideBar.svg",
      alt: "홍대 이미지",
    },
    {
      name: "신사",
      image: "img/SinsaSideBar.svg",
      alt: "신사 이미지",
    },
    {
      name: "경복궁",
      image: "img/GyeongbokgungSideBar.svg",
      alt: "경복궁 이미지",
    },
    {
      name: "청담",
      image: "img/CheongdamSideBar.svg",
      alt: "청담 이미지",
    },
    {
      name: "삼성",
      image: "img/SamseongSideBar.svg",
      alt: "삼성 이미지",
    },
  ];
  const foodList = [
    {
      name: "양식",
      image: "img/pastaSideBar.svg",
      alt: "파스타 아이콘",
    },
    {
      name: "카페",
      image: "img/cafeSideBar.svg",
      alt: "카페 이미지",
    },
    {
      name: "찜",
      image: "img/zzimSideBar.svg",
      alt: "찜 이미지",
    },
    {
      name: "일식",
      image: "img/japanSideBar.svg",
      alt: "일식 이미지",
    },
    {
      name: "피자",
      image: "img/pizzaSideBar.svg",
      alt: "피자 이미지",
    },
    {
      name: "햄버거",
      image: "img/hambergerSideBar.svg",
      alt: "햄버거 이미지",
    },
    {
      name: "분식",
      image: "img/dduckbockyBar.svg",
      alt: "분식 이미지",
    },
    {
      name: "아시아",
      image: "img/asiaSideBar.svg",
      alt: "아시아 이미지",
    },
    {
      name: "야식",
      image: "img/nightfoodSideBar.svg",
      alt: "야식 이미지",
    },
  ];
  const lists = [foodList, locationList];
  const [basicList, setBasicList] = useState(foodList);

  const [boardDtos, setBoardDtos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(); //for 백으로 보낼 카테고리
  const [selectedImg, setSelectedImg] = useState(); //for 사이드바 와 모달창 동기화

  //사이드바 모달창
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();
  const handleOpenModal = () => {
    if (window.innerWidth < 878) {
      setIsModalOpen(true);
    }
  };

  //사이드바 모달창 밖을 클릭하면 모달창 out
  const handleOverlayClick = (event) => {
    if (event.target === modalRef.current) {
      setIsModalOpen(false);
    }
  };
  //일정크기 이상이 되면 모달창은 false
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 878) {
        setIsModalOpen(false);
        //     const fetchBoardData = async () => {
        //       try {
        //         const response = await axios.get("http://localhost:8080/api/board");
        //         console.log("서버 응답:", response.data);
        //         setBoardDtos(response.data);
        //       } catch (error) {
        //         console.error("서버 요청 에러:", error);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //전체 보드 로딩
  const fetchBoardData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/board");
      console.log("서버 응답:", response.data);
      setBoardDtos(response.data);
    } catch (error) {
      console.error("서버 요청 에러:", error);
    }
  };
  //처음 시작할 때 전체 보드 로드
  useEffect(() => {
    fetchBoardData();
  }, []);
  //카테고리로 검색
  const fetchBoardDataByCategory = async (category) => {
    let apiURL = "http://localhost:8080/api/board";
    if (JSON.stringify(basicList) === JSON.stringify(foodList)) {
      apiURL = apiURL + `/food/${category}`;
    } else {
      apiURL = apiURL + `/place/${category}`;
    }
    try {
      const response = await axios.get(apiURL);
      console.log(`${category}에 대한 서버 응답:`, response.data);

      setBoardDtos(response.data);
    } catch (error) {
      console.error(`${category}에 대한 서버 요청 에러:`, error);
    }
  };
  //키워드로 검색
  const fetchBoardDataByKeyword = async (keyWord) => {
    if (keyWord === null) {
      fetchBoardData();
    } else if (keyWord && keyWord.trim() !== "") {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/board/findby/${keyWord}`
        );
        console.log(`${keyWord}에 대한 서버 응답:`, response.data);
        setBoardDtos(response.data);
      } catch (error) {
        console.error(`${keyWord}에 대한 서버 요청 에러:`, error);
      }
    } else fetchBoardData();
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchBoardDataByCategory(selectedCategory);
    } else {
      fetchBoardData();
    }
  }, [selectedCategory]);

  //세션에 저장된 로그인 정보 불러오기
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    // 컴포넌트가 처음으로 렌더링될 때 getCurrentUser 실행
    getCurrentUser();
  }, []); // 빈 배열을 전달하여 이펙트가 한 번만 실행되도록 설정

  /////임시 작업중
  const [participants, setParticipants] = useState([]);
  const [likes, setLikes] = useState([]);
  const bringParticipants = async (e) => {
    if (user === null) {
      return;
    } else {
      await axios
        .post("http://localhost:8080/api/app/find/participants", {
          email: user.email,
        })
        .then((response) => {
          console.log("아따1" + response);
          console.log("아따따1" + response.data);
          setParticipants(response.data);
        });
    }
  };
  const bringLikes = async (e) => {
    if (user === null) {
      return;
    } else {
      await axios
        .post("http://localhost:8080/api/app/find/likes", {
          email: user.email,
        })
        .then((response) => {
          console.log("아따2" + response);
          console.log("아따따2" + response.data);
          setLikes(response.data);
        });
    }
  };
  useEffect(() => {
    bringParticipants();
    bringLikes();
  }, [user]);
  ///여기까지 임시

  return (
    <>
      <div className="flex mx-[4.7rem] flex-wrap justisfy-between items-center ">
        <Link to="/">
          <img src="img/mainlogo.svg" alt="메인로고" className="ml-[8rem]" />
        </Link>
        {/* 다시 추가 */}
        {/* <div className="flex">
          <img src="img/Bell.svg" alt="이미지" />
          <p>여~! 쓰~벌 브라더~</p>
        </div> */}{" "}
      </div>
      <img
        src="img/menubarButton.svg"
        onClick={handleOpenModal}
        className="hidden m_s:block w-5 h-6"
      />

      <div className="flex">
        <BoardSideBar
          onSelectCategory={setSelectedCategory}
          selectedImg={selectedImg} //selectedImg = 선택된 imgname
          setSelectedImg={setSelectedImg}
          lists={lists}
          basicList={basicList}
          setBasicList={setBasicList}
        />

        <BoardSection
          fetchBoardDataByKeyword={fetchBoardDataByKeyword}
          user={user}
        >
          {boardDtos.map((boardDto) => (
            <BoardCard
              key={boardDto.board_id}
              boardDto={boardDto}
              user={user}
              participants={participants}
              bringParticipants={bringParticipants}
              boardDtos={boardDtos}
              likes={likes}
              bringLikes={bringLikes}
            />
          ))}
        </BoardSection>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={handleOverlayClick}
            ref={modalRef}
          />
          <div className="h-screen flex items-center justify-center">
            <BoardSideBarModal
              onSelectCategory={setSelectedCategory}
              selectedImg={selectedImg} //selectedImg = 선택된 imgname
              setSelectedImg={setSelectedImg}
              lists={lists}
              basicList={basicList}
              setBasicList={setBasicList}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default BoardPage;
