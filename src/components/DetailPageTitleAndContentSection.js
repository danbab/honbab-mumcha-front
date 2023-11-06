import React from "react";

// 게시글 제목, 약속 시간, 게시글 내용 섹션
const DetailPageTitleAndContentSection = () => {
    const postTitle = '논현점 퇴근하고 만나서 밥 드실분 구해요';
    const meetDate = '2023.10.30 (월)';
    const time = '저녁 7시 40분';
    const postContent = '게시글 내용을 여기에 입력하세요.';

    return (
        <div className="max-w-screen-md mx-auto md:px-16 md:mt-14">
            <div className="text-lg md:text-xl font-bold">
                {postTitle}
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
                <p><img src="img/postimage.svg" className="md:mx-auto rounded-md p-3"></img>
                </p>
            </div>

            <div className="md:w-full md:h-full md:mt-7 bg-neutral-50 rounded-md">
                <p><img src="img/postimagedetail.svg" className="md:mx-auto rounded-md p-3"></img>
                </p>
            </div>
        </div>
    );
}

export default DetailPageTitleAndContentSection;