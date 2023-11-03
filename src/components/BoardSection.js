import Button from "./Button";
import Input from "./Input";

const BoardSection = ({ children }) => {
  return (
    <div class="p-4 sm:ml-64">
      <section className="flex p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="flex mb-4">
          <Button type="make-reservation">지금 약속잡기</Button>
          <Input type="board-search-input" name="검색창" />
          <Button type="search">검색</Button>
        </div>
        {children}
      </section>
    </div>
  );
};

export default BoardSection;
