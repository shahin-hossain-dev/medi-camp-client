import { Fade } from "react-awesome-reveal";

const SectionTitle = () => {
  return (
    <div>
      <div className="mt-12 md:mt-24 text-center space-y-4 md:w-1/2 mx-auto">
        <Fade>
          <h2 className="text-2xl md:text-4xl font-bold text-[#003d6b]">
            Our <span className="text-[#efb312]">Popular</span> Medical Camp
          </h2>
        </Fade>
        <Fade delay={200} direction="up">
          <p className="px-10 text-slate-500">
            Discover the impactful stories from our top medical camps in
            Bangladesh, showcasing remarkable health outcomes.
          </p>
        </Fade>
      </div>
    </div>
  );
};

export default SectionTitle;
