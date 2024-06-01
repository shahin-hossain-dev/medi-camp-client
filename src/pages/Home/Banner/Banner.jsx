import { bannerData } from "./BannerData";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Banner = () => {
  console.log(bannerData);
  return (
    <div>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        // navigation
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
      >
        {bannerData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex items-center justify-between">
              <div className="flex-1 space-y-5 p-10">
                <h2 className="text-5xl font-bold text-[#003d6b]">
                  {slide.title}
                </h2>
                <p>{slide.description}</p>
                <span className="flex gap-3 items-center">
                  <FaRegCalendarCheck className="text-[#003d6b]" />{" "}
                  <span>{slide.date}</span>
                </span>
              </div>
              <div className="">
                <img
                  src={slide.image_url}
                  alt=""
                  className="w-1/2 h-[300px] lg:w-[700px] lg:h-[500px] "
                />
              </div>
            </div>
            <div className="w-[200px] absolute  h-[200px] bg-[] bg-gradient-to-br from-[#0066b2] to-[#003d6b] rounded-full -bottom-20 -left-20"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
