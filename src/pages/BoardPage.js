import React, { useState, useEffect, useRef } from "react";
import BoardCard from "../components/BoardCard";
import Button from "../components/Button";
import BoardSection from "../components/BoardSection";
import BoardSideBar from "../components/BoardSideBar";
import BoardSideBarModal from "../components/BoardSideBarModal";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import LoadingSpinner from "../components/LoadingSpinner";

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
      image: "img/dduckbockySideBar.svg",
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
  const [selectedCategory, setSelectedCategory] = useState(
    sessionStorage.getItem("categoryName")
  ); //for 백으로 보낼 카테고리
  const [selectedImg, setSelectedImg] = useState(
    sessionStorage.getItem("categoryImage")
  ); //for 사이드바 와 모달창 동기화

  const [cookies, setCookies] = useCookies();
  //쿠키에 담긴 토큰 정보 변수에 할당
  const token = cookies.token;

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

  //처음 시작할 때 getCurrentUser(세션에서 유저정보 불러오기) 실행
  //메인페이지에서 세션에 저장한 카테고리 초기화
  useEffect(() => {
    getCurrentUser();
    sessionStorage.removeItem("categoryName");
    sessionStorage.removeItem("categoryImage");
  }, []);

  //메인페이지의 헤더로부터 키워드가 입력되면 키워드검색 실시
  const [keywordFromSession, setKeywordFromSession] = useState(
    sessionStorage.getItem("keyword")
  );
  const [isKeywordLoaded, setIsKeywordLoaded] = useState(false);
  useEffect(() => {
    const storedSearchKeyword = sessionStorage.getItem("keyword");
    if (storedSearchKeyword) {
      setKeywordFromSession(storedSearchKeyword);
      fetchBoardDataByKeyword(storedSearchKeyword);
      setIsKeywordLoaded(true);
      sessionStorage.removeItem("keyword");
    } else {
      setIsKeywordLoaded(true);
    }
    setKeywordFromSession(null);
  }, [keywordFromSession]);

  //카테고리가 바뀔때마다 업데이트
  useEffect(() => {
    if (selectedCategory) {
      fetchBoardDataByCategory(selectedCategory);
    } else if (!keywordFromSession) {
      fetchBoardData();
    }
  }, [selectedCategory]);

  //카테고리로 검색
  const fetchBoardDataByCategory = async (category) => {
    let apiURL = "http://localhost:8080/api/board";
    if (JSON.stringify(basicList) === JSON.stringify(foodList)) {
      apiURL = apiURL + `/food/${category}`;
    } else {
      apiURL = apiURL + `/place/${category}`;
    }

    console.log("토큰 확인" + token);

    //요청 헤더에 토큰 값 넘기기
    const requestOption = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(apiURL, requestOption);
      console.log(`${category}에 대한 서버 응답:`, response.data);

      setBoardDtos(response.data);
    } catch (error) {
      console.error(`${category}에 대한 서버 요청 에러:`, error);
      //토큰이 없을 시, alert 후, 로그인 페이지로 이동
      alert("인증이 필요합니다.");
      window.location.href = "/login";
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
        console.log(`키워드 [${keyWord}]에 대한 서버 응답:`, response.data);
        setBoardDtos(response.data);
      } catch (error) {
        console.error(`키워드 [${keyWord}]에 대한 서버 요청 에러:`, error);
      }
    } else fetchBoardData();
  };

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
  const handleLogout = () => {
    // 로그아웃 버튼을 클릭했을 때 쿠키에 저장된 토큰 삭제 (만료시간을 현재로 바꾸어 토큰이 유효하지 않게 함.)
    setCookies("token", "", { expires: new Date() });
    // 로그아웃 버튼을 클릭했을 때 세션에서 사용자 정보 삭제
    sessionStorage.removeItem("user");
    // 사용자 상태 초기화
    setUser(null);
    // 현재 페이지 리로드
    window.location.reload();
  };

  //참가자 리스트와 찜하기 리스트 불러오기
  const [participants, setParticipants] = useState([]);
  const [likes, setLikes] = useState([]);
  const bringParticipants = async (e) => {
    if (user === null) {
      return Promise.resolve(); //로그인되지 않은 경우, 빈 Promise를 반환
    } else {
      return await axios
        .post("http://localhost:8080/api/app/find/participants", {
          email: user.email,
        })
        .then((response) => {
          console.log("아따1" + response);
          console.log("아따따1" + JSON.stringify(response.data));
          setParticipants(response.data);
          setIsParticipantsLoaded(true);
        });
    }
  };
  const bringLikes = async (e) => {
    if (user === null) {
      return;
    } else {
      return await axios
        .post("http://localhost:8080/api/app/find/likes", {
          email: user.email,
        })
        .then((response) => {
          console.log("아따2" + response);
          console.log("아따따2" + response.data);
          setLikes(response.data);
          setIsLikesLoaded(true);
        });
    }
  };
  const [isLoading, setIsLoading] = useState(true);
  const [isParticipantsLoaded, setIsParticipantsLoaded] = useState(false);
  const [isLikesLoaded, setIsLikesLoaded] = useState(false);

  useEffect(() => {
    const fetchParticipantsAndLikes = async () => {
      const results = await Promise.all([
        bringParticipants(),
        bringLikes(),
      ]).catch((error) => {
        console.error(error);
        return [null, null];
      });

      if (results.every((result) => result !== null)) {
        setIsLoading(false);
      }
    };

    fetchParticipantsAndLikes();
  }, [user]);

  // useEffect(() => {
  //   bringParticipants();
  //   bringLikes();
  // }, [user]);
  if (isLoading) {
    return <LoadingSpinner />; // 로딩 중일 때는 이 메시지를 표시
  }

  return (
    <>
      <div className="flex mx-[4.7rem] flex-wrap justify-between items-center ">
        <div>
          <Link to="/">
            <img src="img/mainlogo.svg" alt="메인로고" className="ml-[8rem]" />
          </Link>
        </div>
        <div>
          {user ? (
            // 세션이 있는 경우, 로그아웃 버튼 표시
            <div className="flex">
              <div className="mr-2 mt-1">{user.username}</div>
              <Button type="log-out" onClick={handleLogout}>
                로그아웃
              </Button>
              <Link to="/my" className="ml-[2.44rem]">
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
          boardDtos={boardDtos}
        >
          {user &&
          (!isParticipantsLoaded || !isLikesLoaded || !isKeywordLoaded) ? (
            <LoadingSpinner />
          ) : (
            boardDtos.map((boardDto) => (
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
            ))
          )}
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
