import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const Menu = () => {
  const menuRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      menuRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.3 }
    );
  }, []);
  return (
    <div className="relative">
      <ul
        className="mt-[1.25rem] flex justify-start gap-5 absolute top-0 z-[100000]"
        ref={menuRef}
      >
        <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] py-3 whitespace-nowrap">
          <Link to="/boardList">음식으로 약속잡기</Link>
        </li>
        <li className="text-[#000] text-[0.8125rem] mb-[1.37rem] py-3 whitespace-nowrap">
          <Link to="/boardList">지역으로 약속잡기</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
