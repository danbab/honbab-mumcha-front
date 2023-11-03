import Footer from "../components/Footer";
import Header from "../components/Header";
import Map from "../components/Map";
import LocationCircle from "../components/LocationCircle";
import MainSwiper from "../components/MainSwiper";
import MenuSquare from "../components/MenuSquare";

function MyPage() {
  return (
    <>
      <Header />
      <MainSwiper />
      <MenuSquare />
      <LocationCircle />
      <Map />
      <Footer />
    </>
  );
}

export default MyPage;
