import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";
/*
 * 게시글 상세 페이지 제목과 내용
 * 구성 요소: 게시글 제목, 약속 시간, 게시글 내용, 사용자가 첨부한 이미지, 식당 위치를 표시할 지도
 */

const DetailPageTitleAndContentSection = ({ boardData, isLoading }) => {

    if (isLoading) {
        return <LoadingSpinner />;  // 로딩 중일 때는 LoadingSpinner 컴포넌트를 렌더링
    }

    return (
        <div className="max-w-screen-md mx-auto md:px-16 md:mt-14">
            <div className="text-lg md:text-xl font-bold">
                {/* 모집글 제목 */}
                <p>{boardData.title}</p>
            </div>

            <div className="flex md:w-1/2 border border-black rounded-sm md:mt-7">
                <div className="flex-grow border-r border-black text-black text-center font-bold">
                    {/* 모임 약속 시간 */}
                    <p>{boardData.time}</p>
                </div>
                <div className="md:px-5 text-black text-center text-base font-bold">
                    {/* 모임 약속 시간 */}
                    <p>{boardData.time}</p>
                </div>
            </div>

            <div className="md:w-full md:h-full md:mt-10 text-black text-base md:text-lg bg-neutral-100 rounded-md p-5">
                {/* 모집글 내용 */}
                <p>{boardData.content}</p>
            </div>

            <div className="md:w-full md:h-full md:mt-28 bg-neutral-50 rounded-md">
                {/* 식당 이름 */}
                <p>{boardData.restaurantName}</p>
            </div>

            <div className="md:w-full md:h-full md:mt-7 bg-neutral-50 rounded-md">
                {/* 식당 주소 */}
                <p>{boardData.restaurantAddress}</p>
            </div>
        </div>
    );
}

export default DetailPageTitleAndContentSection;