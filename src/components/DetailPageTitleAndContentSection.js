import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";
/*
 * 게시글 상세 페이지 제목과 내용
 * 구성 요소: 게시글 제목, 약속 시간, 게시글 내용, 사용자가 첨부한 이미지, 식당 위치를 표시할 지도
 */

const DetailPageTitleAndContentSection = ({ boardData, isLoading }) => {

    if (isLoading || !boardData) {
        return <LoadingSpinner />;  // 로딩 중일 때는 LoadingSpinner 컴포넌트를 렌더링
    }

    return (
        <div className="max-w-screen-md mx-auto md:px-16 md:mt-20 md:text-2xl font-bold">
            <div>
                {/* 모집글 제목 */}
                <p>{boardData.title}</p>
            </div>
            <div className="flex md:mt-7 text-gray-950 text-center">약속 일시
                <div className="flex md:w-1/2 border border-black rounded-sm ml-3">
                    <div className="flex-grow border-r border-black text-gray-950 text-center">
                        {/* 모임 약속 날짜 */}
                        <p>{boardData.meetDate}</p>
                    </div>
                    <div className="md:px-5 text-gray-950 text-center">
                        {/* 모임 약속 시간 */}
                        <p>{boardData.time}</p>
                    </div>

                </div>
            </div>
            <div className="md:w-full h-full md:p-5 md:mt-10 text-gray-950 bg-neutral-100 rounded-md">
                {/* 모집글 내용 */}
                <p>{boardData.content}</p>
            </div>

            <div className="md:w-full md:h-full md:p-3 md:mt-10 bg-neutral-100 rounded-md">
                {/* 식당 이름 */}
                <p>식당 : {boardData.restaurantName}</p>
            </div>

            <div className="md:w-full md:h-full md:p-3 md:mt-10 bg-neutral-100 rounded-md">
                {/* 식당 주소 */}
                <p>주소 : {boardData.restaurantAddress}</p>
            </div>
        </div>
    );
}

export default DetailPageTitleAndContentSection;