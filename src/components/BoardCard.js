import Button from "./Button";

const Card = ({}) => {
  let style = "rounded-[0.625rem] shadow-md";

  return (
    <div className="bg-[#FDFDFD] w-[15.625rem] h-[24.875rem] rounded-[1.25rem] relative">
      <div className="w-[14.25rem] h-[21.875rem] flex justify-between mx-auto">
        <div className="flex gap-2 ml-2 mt-4">
          <img className="w-[2.125rem] h-[2.125rem]" src="img/iamlogo.svg" />
          <div className="text-[#000] text-[12px] mt-3">닉네임</div>
        </div>
        <div className="text-[#BFBFBF] text-[10px] mt-8 mr-[1.5rem]">
          작성일
        </div>
      </div>
      <img
        className="absolute top-[4.5rem] right-0 w-full h-[12.1875rem] "
        src="img/boardexampleimg.svg"
      />
      <p className="absolute bottom-[6rem] left-[1rem] text-[0.9375rem] font-bold">
        글제목
      </p>
      <ul className="list-disc absolute bottom-[3.8rem] left-[2rem] ">
        <li className="text-[#8B8686] text-[0.5rem]">태그1</li>
        <li className="text-[#8B8686] text-[0.5rem]">태그2</li>
      </ul>
      <button
        className="rounded-[0.625rem] text-[0.5rem] w-[3rem] h-[1.50rem] bg-[#54AB75] text-[#ffffff] absolute bottom-[1rem] left-[1rem] shadow-md"
        type="button"
      >
        참여하기
      </button>
    </div>
  );
};

export default Card;
