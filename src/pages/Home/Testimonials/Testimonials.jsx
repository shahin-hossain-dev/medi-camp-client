import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Rating } from "@smastrom/react-rating";

import moment from "moment";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { Fade } from "react-awesome-reveal";
AOS.init();

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await axiosPublic.get("/feedback");
      // console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="mt-24 w-[90%] mx-auto ">
      <div className=" mb-12 md:mt-24 text-center space-y-4 md:w-1/2 mx-auto ">
        <Fade>
          <h2 className="text-2xl md:text-4xl font-bold text-[#003d6b]">
            <span className="text-[#0066b2]">Testimonials</span>
          </h2>
        </Fade>
        <Fade delay={200} direction="up">
          <p className="px-10 text-slate-500">
            Testimonials offer genuine feedback and highlight our impact.
          </p>
        </Fade>
      </div>
      <div data-aos="fade-up">
        <Swiper
          spaceBetween={0}
          effect={"fade"}
          // navigation={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
          }}
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          className=""
        >
          {testimonials.map((feedback) => (
            <SwiperSlide key={feedback._id}>
              <div className="text-center py-12 bg-slate-200 rounded-md">
                <div className="flex justify-center items-center mb-3">
                  <Rating
                    style={{ maxWidth: 180 }}
                    value={feedback.rating}
                    readOnly
                  />
                </div>
                <div className="md:w-2/3 mx-auto  px-5">
                  <h3 className="text-xl md:text-2xl mb-5">
                    {feedback.feedbackMessage}
                  </h3>
                  <p className="text-lg md:text-xl mb-3  text-slate-500">
                    {feedback.campName}
                  </p>
                  <div className="flex items-center gap-2 justify-center">
                    <img
                      className="w-[50px] rounded-full "
                      src={feedback.participantImage}
                      alt=""
                    />
                    <div className="text-start text-slate-500">
                      <p>{feedback.participantName}</p>
                      <p>
                        {moment(feedback.date).format("DD-MM-YYYY, h:mm a")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
