import Button from "./Button";
import Input from "./Input";

const BoardSection = ({ children }) => {
  return (
    // <div className="p-4 ml-[170px] d_s:ml-64 bg-[#F6F6F6] flex-grow">
    <div className="p-4 bg-[#F6F6F6] flex-grow">
      <div className="flex mb-5 ml-[4.7rem] flex-wrap justify-between items-center ">
        <Button type="make-reservation">지금 약속잡기</Button>
        <div className="flex mr-[6.85rem]">
          <Input type="board-search-input" name="검색창" />
          <Button type="search">검색</Button>
        </div>
      </div>
      {/* <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"> */}
      <div className="grid gap-4 mb-4 mx-auto grid-cols-1 t_s:grid-cols-2 d_s:grid-cols-3 d_m:grid-cols-4 d_l:grid-cols-5 justify-items-center items-center">
        {children}
      </div>
    </div>
  );
};

export default BoardSection;
