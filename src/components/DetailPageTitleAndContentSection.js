import React from "react";

// 게시글 제목, 약속 시간, 게시글 내용 섹션
const DetailPageTitleAndContentSection = () => {
    const postTitle = '논현점 퇴근하고 만나서 밥 드실분 구해요';
    const meetDate = '2023.10.30 (월)';
    const time = '저녁 7시 40분';
    const postContent = '게시글 내용을 여기에 입력하세요.';

    return (
        <div className="max-w-screen-md mx-auto p-4 md:p-16">
            <div className="text-lg md:text-xl font-bold">
                {postTitle}
            </div>

            <div className="w-full md:w-72 h-2.25 border border-black  rounded-md flex justify-between mt-2 mb-4">
                <div className="flex-grow border-r border-black text-black text-center text-base font-bold">
                    <p>{meetDate}</p>
                </div>
                <div className="px-3 text-black text-center text-base font-bold">
                    <p>{time}</p>
                </div>
            </div>

            <div className="w-full h-96 md:mt-10 text-black text-base md:text-lg bg-neutral-100 rounded-md p-4">
                <p>{postContent}</p>
            </div>

            <div className="w-full h-full md:mt-28 p-4">
                <p><img src="img/postimage.svg"></img>
                </p>
            </div>

            <div className="w-full h-full md:mt-20 p-4">
                <p><img src="img/postimagedetail.svg"></img>
                </p>
            </div>
        </div>
    );
}

export default DetailPageTitleAndContentSection;