import { type } from "@testing-library/user-event/dist/type";
import React from "react";

const MainSectionTitle = ({ children, type = "" }) => {
  let style = "ml-[8.57rem] text-[#365347] text-[1.75rem]";

  switch (type) {
    case "food-section":
      style += " mt-[3.93rem] 2xl:ml-[20.57rem]";
      break;

    case "menu-section":
      style += " mt-[3.93rem] 2xl:ml-[20.57rem]";
      break;

    default:
      style += " w-[28rem] h-[2.38rem]";
      break;
  }

  return (
    <div
      className={style}
      type={type}
      onClick={() => (window.location.href = "/boardList")}
    >
      {children}
    </div>
  );
};

export default MainSectionTitle;
