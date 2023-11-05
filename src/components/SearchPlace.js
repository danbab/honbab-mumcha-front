import React, { useState } from "react";
import MapContainer from "./MapContainer";
import Input from "./Input";

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
        <form className="relative" onSubmit={handleSubmit}>
          <Input
            type="main-search-location"
            placeholder="검색어를 입력해주세요:)"
            onChange={onChange}
            value={inputText}
          />
          <button>
            <img
              className="w-[1.25rem] h-[1.25rem] absolute top-[0.5rem] right-[1.3rem]"
              src="img/search.svg"
              alt="검색버튼"
            />
          </button>
        </form>
        <MapContainer searchPlace={place} />
      </div>
    </>
  );
};

export default SearchPlace;
