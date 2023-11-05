import Button from "./Button";
import Input from "./Input";

const BoardSection = ({ children }) => {
  return (
    <div className="p-4 sm:ml-64 bg-slate-400 flex-grow">
      <div className="flex mb-5 ml-[4.7rem] flex-wrap justify-between items-center ">
        <Button type="make-reservation">지금 약속잡기</Button>
        <div className="flex mr-[4.7rem]">
          <Input type="board-search-input" name="검색창" />
          <Button type="search">검색</Button>
        </div>
      </div>
      {/* <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"> */}
      <div className="grid grid-cols-4 gap-4 mb-4 ml-[4.7rem]">{children}</div>
    </div>
  );
};

export default BoardSection;
