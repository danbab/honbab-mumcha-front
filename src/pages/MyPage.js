import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import MyPageSideBar from "../components/MyPageSideBar";
import axios from "axios";
import BoardCard from "../components/BoardCard";
import MyBoardCard from "../components/MyBoardCard";
import MyPageSection from "../components/MyPageSection";
import Button from "../components/Button";
import RegisterUpdate from "../components/RegisterUpdate";


const MyPage = () => {
    const [myBoard, setMyBoard] = useState([]);
    const [selectMyPageCategory, setSelectMyPageCategory] = useState(null);
    const [user, setUser] = useState(null);
    const [partyUser, setPartyUser] = useState([]);
    const [boardId, setBoardId] = useState(null);

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

//    --------------------------------------------- 구분선 ----------------------------

const fetchBoardData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/my", {
        params: {
          email: user.email
        }
      });
  
      console.log(response.data);
      setMyBoard(response.data);
      response.data.forEach((board) => {
        if (user.username === board.writer.name) {
          console.log("이건 뭐야? 누구야?", board.writer.name);
          setBoardId(board.boardId);
        }
      });
      console.log("이름찍혀?", user.username); 
      
    } catch (error) {
      console.error("서버 요청 에러: ", error);
    }
  };
  
  useEffect(() => {
    if (user) {
      fetchBoardData();
    } 
  }, [user]);

  //    --------------------------------------------- 구분선 ----------------------------
  
//   useEffect(() => {
//     console.log("이름찍혀?", boardId);
//   }, [boardId]);
    //    --------------------------------------------- 구분선 ----------------------------

    const fetchBoardDataMyCategory = async (myCategory) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/my/board/${myCategory}`, {
                params: {
                    email: user.email
                }
            });
            console.log(`${myCategory}에 대한 서버 응답: `, response.data);
            setMyBoard(response.data);
            // console.log(myCategory);
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
                    `http://localhost:8080/api/board/findby/${keyWord}`
                );
                console.log(`${keyWord}에 대한 서버 응답:`, response.data);
                setMyBoard(response.data);
            } catch (error) {
                console.error(`${keyWord}에 대한 서버 요청 에러:`, error);
            }
        } else fetchBoardData();

    };

    //    --------------------------------------------- 구분선 ----------------------------

    const fetchBoardDataId = async (boardId) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/my/party/${boardId}`
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
                fetchBoardDataId(boardId);
            }
        };
        
    }, [selectMyPageCategory]);

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
                                {user.username}
                            </Link>
                            <Button type="login" onClick={handleLogout}>
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
                        <MyPageSideBar onSelectMyPageCategory={setSelectMyPageCategory} user={user} />
                    ) : []}
                </div>

                <MyPageSection fetchBoardDataByKeyword={fetchBoardDataByKeyword}>

                    {selectMyPageCategory === '정보수정' ? (
                        <RegisterUpdate user={user} />
                    ) : selectMyPageCategory === '내가찜한약속' ? (
                        <>
                            <div className="text-red-600">현재 기능 구현 중입니다 </div>
                        </>
                    ) : selectMyPageCategory === '내채팅' ? (
                        <>
                            <div className="text-red-600">현재 기능 구현 중입니다 </div>
                        </>
                    ) : selectMyPageCategory === '내파티' ? (

                        partyUser.map((partyUser) => (
                            <MyBoardCard partyUser={partyUser} user={user} />
                        ))

                    ) : (
                        myBoard.map((myBoards) => (
                            <BoardCard boardDto={myBoards} />
                        ))
                    )}

                </MyPageSection>
            </div>
        </>
    )

}

export default MyPage