import React from "react";

/*
 * 게시글 상세 페이지 제목과 내용
 * 구성 요소: 게시글 제목, 약속 시간, 게시글 내용, 사용자가 첨부한 이미지, 식당 위치를 표시할 지도
 */

const DetailPageTitleAndContentSection = () => {
    const postTitle = '논현점 퇴근하고 만나서 밥 드실분 구해요';
    const meetDate = '2023.10.30 (월)';
    const time = '저녁 7시 40분';
    const postContent = '게시글 내용을 여기에 입력하세요.';

    return (
        <div className="max-w-screen-md mx-auto md:px-16 md:mt-14">
            <div className="text-lg md:text-xl font-bold">
                <p>{postTitle}</p>
            </div>

            <div className="flex md:w-1/2 border border-black rounded-sm md:mt-7">
                <div className="flex-grow border-r border-black text-black text-center font-bold">
                    <p>{meetDate}</p>
                </div>
                <div className="md:px-5 text-black text-center text-base font-bold">
                    <p>{time}</p>
                </div>
            </div>

            <div className="md:w-full md:h-full md:mt-10 text-black text-base md:text-lg bg-neutral-100 rounded-md p-5">
                <p>{postContent}</p>
            </div>

            <div className="md:w-full md:h-full md:mt-28 bg-neutral-50 rounded-md">
                <p><img src="img/postimage.svg" className="md:mx-auto rounded-md p-3" alt="식당 사진"></img>
                </p>
            </div>

            <div className="md:w-full md:h-full md:mt-7 bg-neutral-50 rounded-md">
                <p><img src="img/postimagedetail.svg" className="md:mx-auto rounded-md p-3" alt="식당 상세정보"></img>
                </p>
            </div>
        </div>
    );
}

export default DetailPageTitleAndContentSection;