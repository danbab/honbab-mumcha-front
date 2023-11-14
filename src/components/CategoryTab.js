import React, { useState, useEffect } from "react";
import Button from "../components/Button";
function CategoryTab({ lists, basicList, setBasicList }) {
  const [justifyActive, setJustifyActive] = useState(basicList);

  useEffect(() => {
    setJustifyActive(basicList);
  }, [basicList]);

  const handleJustifyClick = (value) => {
    if (JSON.stringify(value) === JSON.stringify(justifyActive)) {
      return;
    }
    setJustifyActive(value);
    if (JSON.stringify(value) === JSON.stringify(lists[0])) {
      setBasicList(lists[0]); //음식 카테고리 리스트로
    } else if (JSON.stringify(value) === JSON.stringify(lists[1])) {
      setBasicList(lists[1]); //장소 카테고리 리스트로
    }
  };

  return (
    <div className="mb-3 flex">
      <Button
        type={
          JSON.stringify(justifyActive) === JSON.stringify(lists[0])
            ? "category-green"
            : "category-white"
        }
        onClick={() => handleJustifyClick(lists[0])}
      >
        음식
      </Button>
      <Button
        type={
          JSON.stringify(justifyActive) === JSON.stringify(lists[1])
            ? "category-green"
            : "category-white"
        }
        onClick={() => handleJustifyClick(lists[1])}
      >
        장소
      </Button>
    </div>
  );
}
export default CategoryTab;
