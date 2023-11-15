import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { Link } from "react-router-dom";

const BoardSection = ({ children, fetchBoardDataByKeyword }) => {
  const [searchKeyword, setSearchKeyword] = useState();

  const handleSearch = () => {
    fetchBoardDataByKeyword(searchKeyword);
  };

  return (
    <div className="p-4 ml-[170px] m_lm:w-[500px] m_s:ml-0 d_s:ml-64 bg-[#F6F6F6] flex-grow">
      <div className="flex mb-5 ml-12 t_s2:ml-[5.25rem] t_ms:ml-[4.85rem] d_l:ml-[2.5rem] justify-between items-center">
        <Button type="make-reservation"><Link to="/write">지금 약속잡기</Link></Button>
        <div className="flex  m_lm:mr-0 t_s2:mr-16 m_s:mr-12 mr-14 d_l:mr-9">
          <Input
            type="board-search-input"
            name="검색창"
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <Button type="search" onClick={handleSearch}>
            검색
          </Button>
        </div>
      </div>

      <div className="grid gap-4 mb-4 mx-auto grid-cols-1 m_l:grid-cols-2 t_m:grid-cols-3 d_s:grid-cols-3 d_m:grid-cols-4 d_l:grid-cols-5 justify-items-center items-center">
        {children}
      </div>
    </div>
  );
};

export default BoardSection;