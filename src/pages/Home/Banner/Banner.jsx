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
  // console.log(bannerData);
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
            <div className="flex items-center justify-between ">
              <div className="absolute md:hidden flex justify-center items-center min-h-full w-full bg-[#00000099] ">
                <h2 className="text-3xl px-5 text-center font-bold text-[#ffffff]">
                  {slide.title}
                </h2>
              </div>
              <div className="flex-1 hidden md:block space-y-5 p-4 md:p-10">
                <h2 className="lg:text-5xl font-bold text-[#003d6b]">
                  {slide.title}
                </h2>
                <p>{slide.description}</p>
                <span className="flex gap-3 items-center">
                  <FaRegCalendarCheck className="text-[#003d6b]" />{" "}
                  <span>{slide.date}</span>
                </span>
              </div>
              <div className="flex-1  h-full">
                <img
                  src={slide.image_url}
                  alt=""
                  className="w-full ms-auto h-[300px] mt-0 object-cover lg:w-[700px] lg:h-[500px] "
                />
              </div>
            </div>
            <div className="w-[200px] absolute hidden lg:flex h-[200px] bg-[] bg-gradient-to-br from-[#0066b2] to-[#003d6b] rounded-full -bottom-24 -left-24"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
