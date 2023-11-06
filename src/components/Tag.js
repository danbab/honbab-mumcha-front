// import isEmptyValue from "../utils/isEmptyValue.js";
import { forwardRef, useEffect } from "react";
import isEmptyValue from "../utils/isEmptyValue";

const Tag = forwardRef(({ ...restProps }, ref) => {
  const { buttonHashTag, handleButtonHashTag, hashTags, handleHashTags } =
    restProps;

  // buttonHashTag : div 안에 들어가는 value(태그)
  //hashTags : 해쉬태그들
  // handleHashTags: 더해주는 함수

  const addTag = (e, tag) => {
    e.preventDefault();

    if (["남", "여", "상관없음"].includes(tag)) {
      const otherTags = ["남", "여", "상관없음"].filter((t) => t !== tag);
      if (hashTags.some((t) => otherTags.includes(t))) {
        return;
      }
    }

    if (["10대", "20대", "30대", "40대", "50대"].includes(tag)) {
      const otherTags = ["10대", "20대", "30대", "40대", "50대"].filter(
        (t) => t !== tag
      );
      if (hashTags.some((t) => otherTags.includes(t))) {
        return;
      }
    }

    handleHashTags((prevHashTags) => {
      return [...new Set([...prevHashTags, tag])];
    });
  };

  const changeHashTagButton = (e) => {
    const selectedValue = e.target.value;
  };

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = hashTags.filter(
      (hashTags) => hashTags !== deleteTagItem
    );
    handleHashTags(filteredTagList);
  };

  return (
    <>
      <div className="bg-[#F9F9F9] w-[33.9375rem] h-[20px] mt-3 rounded-[15px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] flex items-center flex-wrap min-h-[44px] px-[10px] focus-within:bg-tomato">
        {hashTags.map((hashTag, index) => {
          return (
            <div
              ref={ref}
              key={index}
              className="flex justify-between items-center m-[5px] p-[5px] bg-[tomato] rounded-[5px] text-white text-[13px] min-w-[50px]"
            >
              <span className="pt-[3px] pl-[2px]">{hashTag}</span>
              <button
                onClick={deleteTagItem}
                className="flex justify-center items-center w-[15px] h-[15px] ml-[5px] mt-[3px]"
              >
                X
              </button>
            </div>
          );
        })}
        <div
          onChange={changeHashTagButton}
          value={buttonHashTag}
          className="inline-flex bg-transparent border-none outline-none"
        ></div>
      </div>
      <div className="flex gap-4 mt-3">
        <button
          onClick={(e) => addTag(e, "남")}
          className="border rounded-[0.625rem] text-[1.15rem] text-[#ffffff] w-[2.5rem] h-[2rem] bg-sky-400 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
        >
          남
        </button>
        <button
          onClick={(e) => addTag(e, "여")}
          className="border rounded-[0.625rem] text-[1.15rem] text-[#ffffff] w-[2.5rem] h-[2rem] bg-red-400 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
        >
          여
        </button>
        <button
          onClick={(e) => addTag(e, "상관없음")}
          className="border rounded-[0.625rem] text-[1.15rem] text-[#ffffff] w-[4.6rem] h-[2rem] bg-red-400 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
        >
          상관없음
        </button>
        <select
          id="mbti"
          name="mbti"
          // value={mbti}
          className="mt-1 ml-3"
        >
          <option value="" selected>
            -- MBTI를 선택하세요 --
          </option>
          <option value="none">선택안함</option>
          <option value="ENFJ">ENFJ</option>
          <option value="ENFP">ENFP</option>
          <option value="ENTJ">ENTJ</option>
          <option value="ENTP">ENTP</option>
          <option value="ESFJ">ESFJ</option>
          <option value="ESFP">ESFP</option>
          <option value="ESTJ">ESTJ</option>
          <option value="ESTP">ESTP</option>
          <option value="INFJ">INFJ</option>
          <option value="INFP">INFP</option>
          <option value="INTJ">INTJ</option>
          <option value="INTP">INTP</option>
          <option value="ISFJ">ISFJ</option>
          <option value="ISFP">ISFP</option>
          <option value="ISTJ">ISTJ</option>
          <option value="ISTP">ISTP</option>
        </select>
      </div>
      <div className="flex gap-4 mt-3">
        <button
          className="border rounded-[0.625rem] text-[1.1rem] text-[#ffffff] w-[3.5rem] h-[2rem] bg-[#ADD8E6] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
          onClick={(e) => addTag(e, "10대")}
        >
          10대
        </button>
        <button
          className="border rounded-[0.625rem] text-[1.1rem] text-[#ffffff] w-[3.5rem] h-[2rem] bg-[#40E0D0] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
          onClick={(e) => addTag(e, "20대")}
        >
          20대
        </button>
        <button
          className="border rounded-[0.625rem] text-[1.1rem] text-[#ffffff] w-[3.5rem] h-[2rem] bg-[#808000] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
          onClick={(e) => addTag(e, "30대")}
        >
          30대
        </button>
        <button
          className="border rounded-[0.625rem] text-[1.1rem] text-[#ffffff] w-[3.5rem] h-[2rem] bg-[#800020] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
          onClick={(e) => addTag(e, "40대")}
        >
          40대
        </button>
        <button
          className="border rounded-[0.625rem] text-[1.1rem] text-[#ffffff] w-[3.5rem] h-[2rem] bg-[#ADDFAD] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
          onClick={(e) => addTag(e, "50대")}
        >
          50대
        </button>
      </div>
    </>
  );
});

export default Tag;
