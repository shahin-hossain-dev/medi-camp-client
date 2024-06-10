import AskQuestions from "../AskQuestions/AskQuestions";
import Banner from "../Banner/Banner";
import PopularCamp from "../PopularCamp/PopularCamp";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Banner />
      <PopularCamp />
      <Testimonials />
      <AskQuestions />
    </div>
  );
};

export default Home;
