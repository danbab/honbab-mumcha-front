import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryTab from "../components/CategoryTab";

const BoardSideBar = ({
  onSelectCategory,
  selectedImg,
  setSelectedImg,
  lists,
  basicList,
  setBasicList,
}) => {
  const [selectedItem, setSelectedItem] = useState(null); //마우스 오버
  const [clickedItem, setClickedItem] = useState(null); //마우스 클릭

  useEffect(() => {
    if (selectedImg) {
      setClickedItem(selectedImg);
    }
  }, []);
  useEffect(() => {
    setClickedItem(selectedImg);
  }, [selectedImg]);

  const handleClick = (imgName, itemName) => {
    if (clickedItem === imgName) {
      setClickedItem(null);
      setSelectedImg(null);
      onSelectCategory(null);
    } else {
      setClickedItem(imgName);
      setSelectedItem(null);
      onSelectCategory(itemName);
      setSelectedImg(imgName);
    }
  };
  const handleMouseEnter = (imgname) => {
    if (!clickedItem) {
      // 클릭한 항목이 없는 경우에만 selectedItem을 업데이트
      setSelectedItem(imgname);
    }
  };
  const handleMouseLeave = () => {
    setSelectedItem(null); // 마우스가 떠날 때 selectedItem을 null로 설정
  };

  //카테고리가 바뀌면 (음식vs장소) 선택된 것들 초기화
  useEffect(() => {
    setClickedItem(null);
    setSelectedImg(null);
    onSelectCategory(null);
  }, [basicList]);

  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed bg-white left-0 z-40 w-[170px] d_s:w-64 h-screen transition-transform -translate-x-full t_ms:translate-x-0 text-lg leading-loose"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 overflow-y-auto">
          <CategoryTab
            lists={lists}
            basicList={basicList}
            setBasicList={setBasicList}
          />

          <ul className="space-y-2 font-medium">
            {basicList.map((item) => (
              <li key={item.alt}>
                <Link
                  to="#"
                  className="py-2"
                  onMouseEnter={() => handleMouseEnter(item.image)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    handleClick(item.image, item.name);
                  }}
                >
                  {selectedItem === item.image || clickedItem === item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-[6.625rem] object-cover w-full"
                    />
                  ) : (
                    <span className="ml-3 text-black">{item.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default BoardSideBar;
