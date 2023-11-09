import { Link } from "react-router-dom";
import React from 'react'
import MyPageSideBar from "../components/MyPageSideBar";


const MyPage = () => {
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
                <div className="mr-[18rem]">
                <MyPageSideBar />
                </div>
                <div className="bg-[#F6F6F6] w-[95rem] h-[55.3125rem] rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px]">
                </div>

            </div>
        </>
    )

}

export default MyPage