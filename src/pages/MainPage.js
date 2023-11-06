import Footer from "../components/Footer";
import Header from "../components/Header";
import LocationCircle from "../components/LocationCircle";
import MainSwiper from "../components/MainSwiper";
import MenuSquare from "../components/MenuSquare";
import SearchPlace from "../components/SearchPlace";
import React, { useState, useEffect } from "react";

function MainPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  return (
    <>
      <Header />
      <MainSwiper />
      <MenuSquare />
      <LocationCircle />
      <SearchPlace />
      <Footer />
    </>
  );
}

export default MainPage;
