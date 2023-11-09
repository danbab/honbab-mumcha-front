import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import MyPageSideBar from "../components/MyPageSideBar";
import axios from "axios";
import MyBoardCard from "../components/MyBoardCard";
import MyPageSection from "../components/MyPageSection";


const MyPage = () => {
    const[myBoard, setMyBoard] = useState([]);

    useEffect(()=>{
        const fetchBoardData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/my/board");
                console.log("서버 응답 :" + response.data);
                setMyBoard(response.data);
            } catch (error) {
                console.error("서버 요청 에러: ", error);
            }
        };

        fetchBoardData();
    }, []);


    return (
        <>
            <div className="flex mx-[4.7rem] flex-wrap justify-between items-center ">
                <Link to="/">
                    <img src="img/mainlogo.svg" alt="메인로고" className="ml-[8rem]" />
                </Link>
                <div className="flex">
                    <img src="img/Bell.svg" alt="이미지" />
                </div>
            </div>

            <div className="flex">
                <div className="mr-[1.2rem]">
                <MyPageSideBar />
                </div>
                
                <MyPageSection>

                {myBoard.map((myBoards) => (
                    <MyBoardCard myBoards={myBoards} />
                ))}
                
                </MyPageSection>     
            </div>
        </>
    )

}

export default MyPage