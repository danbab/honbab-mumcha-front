import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MyPageSideBar from "../components/MyPageSideBar";
import axios from "axios";
import BoardCard from "../components/BoardCard";
import MyBoardCard from "../components/MyBoardCard";
import MyPageSection from "../components/MyPageSection";
import Button from "../components/Button";
import RegisterUpdate from "../components/RegisterUpdate";
import { useCookies } from "react-cookie";

const MyPage = () => {
  const [myBoard, setMyBoard] = useState([]);
  const [selectMyPageCategory, setSelectMyPageCategory] = useState(null);
  const [user, setUser] = useState(null);
  const [partyUser, setPartyUser] = useState([]);
  const [boardId, setBoardId] = useState([]);
  const [cookies, setCookies] = useCookies();
  //쿠키에 담긴 토큰 정보 변수에 할당
  const token = cookies.token;

  // const baseUrl = "http://localhost:8080/api/my";
  const getCurrentUser = async () => {
    try {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        // JSON 문자열을 객체로 변환
        const userObject = JSON.parse(storedUser);
        setUser(userObject);
      } else {
        window.location.href = "/login"; // 로그인 페이지로 보내기
      }
    } catch (e) {
      console.error("사용자 정보 가져오기 실패:" + e);
    }
  };
  useEffect(() => {
    // 컴포넌트가 처음으로 렌더링될 때 getCurrentUser 실행
    getCurrentUser();
  }, []); // 빈 배열을 전달하여 이펙트가 한 번만 실행되도록 설정

  //요청 헤더에 토큰 값 넘기기
  const requestOption = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //    --------------------------------------------- 구분선 ----------------------------

  const fetchBoardData = async () => {
    console.log(user);
    try {
      const response = await axios.get("http://localhost:8080/api/my", {
        params: {
          email: user.email,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMyBoard(response.data);
      // 참가자 리스트와 찜하기 리스트도 불러옵니다.
      bringParticipants();
      bringLikes();
    } catch (error) {
      console.error("서버 요청 에러: ", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBoardData();
    }
  }, [user]);

  useEffect(() => {
    console.log("이름찍혀?", boardId);
  }, [boardId]);

  //    --------------------------------------------- 구분선 ----------------------------

  const fetchBoardDataMyCategory = async (myCategory) => {
    let temp = [];

    try {
      const response = await axios.get(
        `http://localhost:8080/api/my/board/${myCategory}`,
        {
          params: {
            email: user.email,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(`${myCategory}에 대한 서버 응답: `, response.data);
      setMyBoard(response.data);
      response.data.map((board) => {
        console.log(user.name);
        console.log(board.writer.name);
        if (user.name === board.writer.name) {
          temp.push(board.boardId);
        }
      });
      setBoardId(temp);
      console.log("내가 찍고싶은 보드아이디" + boardId);
    } catch (error) {
      console.error(`${myCategory}에 대한 서버 요청 에러: `, error);
    }
  };

  //    --------------------------------------------- 구분선 ----------------------------

  const fetchBoardDataByKeyword = async (keyWord) => {
    if (keyWord === null) {
      fetchBoardData();
    } else if (keyWord && keyWord.trim() !== "") {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/board/findby/${keyWord}`,
          requestOption
        );
        console.log(`${keyWord}에 대한 서버 응답:`, response.data);
        setMyBoard(response.data);
      } catch (error) {
        console.error(`${keyWord}에 대한 서버 요청 에러:`, error);
      }
    } else fetchBoardData();
  };

  //    --------------------------------------------- 구분선 ----------------------------

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
          setParticipants(response.data);
          //   setIsParticipantsLoaded(true);
        });
    }
  };

  //    --------------------------------------------- 구분선 ----------------------------

  const bringLikes = async (e) => {
    if (user === null) {
      return;
    } else {
      return await axios
        .post("http://localhost:8080/api/app/find/likes", {
          email: user.email,
        })
        .then((response) => {
          setLikes(response.data);
          //   setIsLikesLoaded(true);
        });
    }
  };

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
        // setIsLoading(false);
      }
    };

    fetchParticipantsAndLikes();
  }, [myBoard]);

  //    --------------------------------------------- 구분선 ----------------------------

  const fetchBoardDataId = async (boardId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/my/party`,
        boardId,
        requestOption
      );
      console.log(`${boardId}파티 유저 응답 :`, response.data);
      setPartyUser(response.data);
    } catch (error) {
      console.error(`에 대한 서버 요청 에러`, error);
    }
  };

  //    --------------------------------------------- 구분선 ----------------------------

  useEffect(() => {
    if (selectMyPageCategory) {
      console.log("여기?", selectMyPageCategory);
      fetchBoardDataMyCategory(selectMyPageCategory);

      if (selectMyPageCategory === "내파티") {
        console.log("여기는 확인되는거야???");
        console.log(myBoard);
        let newBoardIds = []; // 새로운 boardId를 저장할 배열

        myBoard.forEach((board) => {
          if (user.name === board.writer.name) {
            console.log("이건 뭐야? 누구야?", board.writer.name);
            newBoardIds.push(board.boardId); // 배열에 새로운 boardId 추가
          }
        });

        setBoardId(newBoardIds); // 새로운 boardId 배열을 상태로 저장
      }
    }
  }, [selectMyPageCategory]);

  useEffect(() => {
    if (boardId.length > 0) {
      fetchBoardDataId(boardId);
    }
  }, [boardId]);

  //    --------------------------------------------- 구분선 ----------------------------
  const handleLogout = () => {
    // 로그아웃 버튼을 클릭했을 때 세션에서 사용자 정보 삭제
    sessionStorage.removeItem("user");
    // 사용자 상태 초기화
    setUser(null);
    window.location.href = "/";
  };

  return (
    <>
      <div className="flex mx-[4.7rem] flex-wrap justify-between items-center ">
        <Link to="/">
          <img src="img/mainlogo.svg" alt="메인로고" className="ml-[8rem]" />
        </Link>
        <div className="flex">
          <img src="img/Bell.svg" alt="이미지" />
          {/* <p>{user.username}</p> */}
          {user ? (
            // 세션이 있는 경우, 로그아웃 버튼 표시
            <>
              <Link to="/my">
                <p className="mt-1.5 mx-5">{user.name}</p>
              </Link>
              <Button type="log-out" onClick={handleLogout}>
                로그아웃
              </Button>
            </>
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

      <div className="flex">
        <div className="mr-[1.2rem]">
          {user ? (
            <MyPageSideBar
              onSelectMyPageCategory={setSelectMyPageCategory}
              user={user}
            />
          ) : (
            []
          )}
        </div>

        <MyPageSection fetchBoardDataByKeyword={fetchBoardDataByKeyword}>
          {selectMyPageCategory === "정보수정" ? (
            <RegisterUpdate user={user} />
          ) : selectMyPageCategory === "내가찜한약속" ? (
            myBoard.map((myBoards) => (
              <BoardCard
                boardDto={myBoards}
                user={user}
                participants={participants}
                bringParticipants={bringParticipants}
                likes={likes}
                bringLikes={bringLikes}
              />
            ))
          ) : selectMyPageCategory === "내채팅" ? (
            <>
              <div className="text-red-600">현재 기능 구현 중입니다 </div>
            </>
          ) : selectMyPageCategory === "내파티" ? (
            Object.entries(partyUser).map(([title, users]) => (
              users.map(participantUser => (
                <MyBoardCard
                  title={title}
                  participantUser={participantUser}
                  user={user}
                  boardId={boardId}
                />
              ))
            ))
          ) : (
            myBoard.map((myBoards) => (
              <BoardCard
                boardDto={myBoards}
                user={user}
                participants={participants}
                bringParticipants={bringParticipants}
                likes={likes}
                bringLikes={bringLikes}
              />
            ))
          )}
        </MyPageSection>
      </div>
    </>
  );
};

export default MyPage;
