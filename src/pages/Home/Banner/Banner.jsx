import { bannerData } from "./BannerData";
// import { FaRegCalendarCheck } from "react-icons/fa6";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Fade } from "react-awesome-reveal";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Banner = () => {
  // console.log(bannerData);
  const { user } = useAuth();
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
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
      >
        {bannerData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className=" h-[300px] relative lg:h-[650px]">
              <div className="absolute z-20 md:hidden flex justify-center items-center min-h-full w-full  ">
                <div className="space-y-3 text-[#ffffff] w-11/12 mx-auto text-center">
                  <Fade delay={100}>
                    <h2 className="text-3xl px-5 text-center font-bold ">
                      {slide.title}
                    </h2>
                  </Fade>
                  <Fade delay={500}>
                    <p>{slide.description}</p>
                  </Fade>
                </div>
              </div>
              <div className="z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center absolute hidden w-8/12 md:block space-y-5 text-white p-4 ">
                <Fade delay={100}>
                  <h4 className="text-2xl ">Our Achievements</h4>
                </Fade>
                <Fade delay={300}>
                  <h2 className="lg:text-5xl font-bold ">{slide.title}</h2>
                </Fade>
                <Fade delay={500}>
                  <p>{slide.description}</p>
                </Fade>

                <div className="mt-3">
                  {!user && (
                    <Fade delay={700}>
                      <Link to={"/join-us"}>
                        <button className=" text-[#000000] rounded-sm px-5 duration-150 active:scale-95  font-medium me-3 bg-[#efb312] p-3 py-2">
                          Join Us
                        </button>
                      </Link>
                    </Fade>
                  )}
                </div>
                {/* <span className="flex gap-3 items-center">
                  <FaRegCalendarCheck className="" />{" "}
                  <span className="">{slide.date}</span>
                </span> */}
              </div>
              <div className="w-full relative h-full">
                <div className="w-full h-full z-10 absolute bg-black opacity-60"></div>
                <img
                  src={slide.image_url}
                  alt=""
                  className="w-full ms-auto h-full  mt-0 object-cover object-top  lg:h-[650px] "
                />
              </div>
            </div>

            {/* <div className="w-[200px] absolute hidden lg:flex h-[200px] bg-[] bg-gradient-to-br from-[#0066b2] to-[#003d6b] rounded-full -bottom-24 -left-24"></div> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
