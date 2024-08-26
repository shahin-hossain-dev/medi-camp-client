import { useEffect, useState } from "react";
import questionImg from "../../../assets/question/question.png";
import axios from "axios";
import { Fade } from "react-awesome-reveal";
const AskQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchFunc = async () => {
      const res = await axios.get("askQuestion.json");
      setQuestions(res.data);
    };
    fetchFunc();
  }, []);

  return (
    <div className="w-[90%] mx-auto mt-12 md:mt-24">
      <div className=" mb-12 md:mt-24 text-center space-y-4 md:w-1/2 mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-[#003d6b]">
          <Fade>
            <span className="text-[#0066b2]">Frequently asked questions</span>
          </Fade>
        </h2>
        <Fade delay={200} direction="up">
          <p className="px-10 text-slate-500">
            Testimonials offer genuine feedback and highlight our impact.
          </p>
        </Fade>
      </div>
      {/* Accordion   */}
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex-1">
          <Fade>
            <img src={questionImg} alt="" />
          </Fade>
        </div>
        <div className="join join-vertical w-full flex-1">
          {questions.map((question) => (
            <div
              data-aos="fade-up"
              key={question.id}
              className="collapse collapse-arrow join-item border border-base-300"
            >
              <input type="radio" name="my-accordion-4" defaultChecked />
              <div className="collapse-title text-lg md:text-xl font-medium text-neutral-700">
                {question.question}
              </div>
              <div className="collapse-content  text-neutral-500">
                <p>{question.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AskQuestions;
