import { Pagination, A11y, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const MainSwiper = () => {
  return (
    <div>
      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide className="mt-[2.1875rem]">
          <img src="img/ad1.svg" alt="광고" />
        </SwiperSlide>
        <SwiperSlide className="mt-[2.1875rem]">
          <img src="img/ad2.svg" alt="광고" />
        </SwiperSlide>
        <SwiperSlide className="mt-[2.1875rem]">
          <img src="img/ad3.svg" alt="광고" />
        </SwiperSlide>
        <SwiperSlide className="mt-[2.1875rem]">
          <img src="img/ad4.svg" alt="광고" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default MainSwiper;
