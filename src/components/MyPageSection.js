import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const BoardSection = ({ children, fetchBoardDataByKeyword }) => {
  const [searchKeyword, setSearchKeyword] =useState();

  const handleSearch = () => {
    fetchBoardDataByKeyword(searchKeyword);
  }
  return (
    <div className="p-4 sm:ml-64 bg-[#F6F6F6] flex-grow">
      <div className="flex mb-5 ml-[4.7rem] flex-wrap justify-between items-center ">
        <div className="flex mr-[6.85rem]">
          <Input 
          type="board-search-input" 
          name="검색창"
          onChange={(e)=>setSearchKeyword(e.target.value)}
           />
          <Button type="search" onClick={handleSearch}>검색</Button>
        </div>
      </div>
      {/* <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"> */}
      <div className="grid grid-cols-5 gap-4 mb-4 mx-[4.7rem]">{children}</div>
    </div>
  );
};

export default BoardSection;
