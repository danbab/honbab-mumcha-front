import Heart from "../components/Heart";
import { useState } from "react";

const Card = ({ boardDto }) => {
  const [active, setActive] = useState(false);
  let date = new Date(boardDto.regdate);

  // 날짜 및 시간 형식 지정
  const options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  // 지역화된 문자열로 변환
  date = date
    .toLocaleDateString("ko-KR", options)
    .replace(/\./g, "-")
    .replace(/ /g, "");

  return (
    <div className="bg-[#FDFDFD] w-[15.625rem] h-[24.875rem] rounded-[1.25rem] relative">
      <div className="w-[14.25rem] h-[21.875rem] flex justify-between mx-auto">
        <div className="flex gap-2 ml-2 mt-[1.25rem]">
          <img className="w-[2.125rem] h-[2.125rem]" src="img/iamlogo.svg" />
          {/* 작성자 이름 */}
          <div className="text-[#000] text-[12px] mt-3">
            {boardDto.writer.name}
          </div>
        </div>
        {/* 작성일-reg_date */}
        <div className="text-[#BFBFBF] text-[10px] mt-[2.1rem] mr-[0.5rem]">
          {date}
        </div>
        {boardDto.regdate != boardDto.lastModified && (
          <span className="absolute top-12 right-[1.2rem] text-[#BFBFBF] text-[10px]">
            수정됨
          </span>
        )}
      </div>
      <img
        className="absolute top-[4.5rem] right-0 w-full h-[12.1875rem] "
        src="img/boardexampleimg.svg"
      />

      {/* 글 제목-title */}
      <p className="absolute bottom-[6rem] left-[1rem] ml-1 text-[1rem] font-bold">
        {boardDto.title}
      </p>
      <Heart
        className="w-[1.5rem] absolute bottom-[6rem] right-[1.1rem]"
        isActive={active}
        onClick={() => setActive(!active)}
        animationTrigger="both"
        inactiveColor="rgba(255,125,125,.75)"
        activeColor="#E14949"
        animationDuration={0.1}
      />

      <ul className="list-disc absolute bottom-[3.8rem] left-[2rem] ">
        <li className="text-[#8B8686] text-[0.5rem]">태그1</li>
        <li className="text-[#8B8686] text-[0.5rem]">태그2</li>
      </ul>

      <div className="absolute bottom-[1rem] left-[1rem]">
        <div className="w-[14.25rem] h-[2rem] flex justify-between ">
          <button
            className="rounded-[0.625rem] text-[0.8rem] w-[4rem] h-[1.85rem] bg-[#54AB75] text-[#ffffff]  shadow-md"
            type="button"
          >
            참여하기
          </button>
          {/* 상태에 따라 모집중 또는 모집완료 표시 */}
          {boardDto.status === 1 ? (
            <span className="mt-1 mr-4 text-[0.9rem] text-green-500 font-bold">
              모집중
            </span>
          ) : (
            <span className="mt-1 mr-4 text-[0.9rem] text-red-500 font-bold">
              모집완료
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
