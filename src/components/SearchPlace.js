import React, { useState } from "react";
import MapContainer from "./MapContainer";

const SearchPlace = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  return (
    <>
    <div className="mt-[2.7rem] w-[78.75rem] mx-auto my-0">
      <form className="" onSubmit={handleSubmit}>
        <input
          placeholder="검색어를 입력해주세요:)"
          onChange={onChange}
          value={inputText}
          className="border-spacing-2  border border-gray-400"
        />
        <button className="bg-orange-200 w-[5.4rem] border-black mb-[1.6rem] mx-[1.2rem]"type="submit">검색</button>
      </form>
      <MapContainer searchPlace={place} />
      </div>
    </>
  );
};

export default SearchPlace;