const Card = ({}) => {
  let style = "rounded-[0.625rem] shadow-md";

  return (
    <div className="w-[295px] h-[473px] mb-3 mt-5 relative">
      <div className="w-[295px] h-[473px] left-0 top-0 absolute bg-white rounded-[20px] shadow" />
      <div className="left-[49px] top-[43px] absolute text-black text-xs font-medium font-['Inter']">
        역관광경영학과
      </div>
      <div className="left-[179px] top-[45px] absolute text-stone-300 text-[10px] font-medium font-['Inter']">
        작성일
      </div>
      <img
        className="w-[295px] h-[195px] left-0 top-[70px] absolute"
        src="https://via.placeholder.com/295x195"
      />
      <div className="left-[11px] top-[233px] absolute text-white text-[15px] font-bold font-['Inter']">
        한남동 이탈리안 가실분?
      </div>
      <div className="left-[11px] top-[277px] absolute text-black text-[15px] font-bold font-['Inter']">
        이탈리안
      </div>
      <div className="left-[11px] top-[301px] absolute text-zinc-500 text-[6px] font-normal font-['Inter']">
        양식
      </div>
      <div className="left-[11px] top-[310px] absolute text-zinc-500 text-[6px] font-normal font-['Inter']">
        한남
      </div>
      <div className="w-11 h-3.5 left-[11px] top-[323px] absolute bg-[#54AB75] rounded-[5px] shadow" />
      <div className="left-[24px] top-[327px] absolute text-white text-[5px] font-normal font-['Inter']">
        참여하기
      </div>
    </div>
  );
};

export default Card;
