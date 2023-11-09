import Footer from "../components/Footer";
import Header from "../components/Header";
import KakaoMap from "../components/KakaoMap";
import LocationCircle from "../components/LocationCircle";
import MainSwiper from "../components/MainSwiper";
import MenuSquare from "../components/MenuSquare";

function MainPage() {
  return (
    <>
      <Header />
      <MainSwiper />
      <MenuSquare />
      <KakaoMap />
      <Footer />
    </>
  );
}

export default MainPage;
