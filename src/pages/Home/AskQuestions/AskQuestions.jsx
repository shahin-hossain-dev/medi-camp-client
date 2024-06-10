import { useEffect, useState } from "react";
import questionImg from "../../../assets/question/question.png";
import axios from "axios";
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
    <div className="w-[90%] mx-auto">
      <div className=" mb-12 md:mt-24 text-center space-y-4 md:w-1/2 mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-[#003d6b]">
          <span className="text-[#0066b2]">Frequently asked questions</span>
        </h2>
        <p className="px-10 text-slate-500">
          Testimonials offer genuine feedback and highlight our impact.
        </p>
      </div>
      {/* Accordion   */}
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex-1">
          <img src={questionImg} alt="" />
        </div>
        <div className="join join-vertical w-full flex-1">
          {questions.map((question) => (
            <div
              key={question.id}
              className="collapse collapse-arrow join-item border border-base-300"
            >
              <input type="radio" name="my-accordion-4" defaultChecked />
              <div className="collapse-title text-xl font-medium text-neutral-700">
                {question.question}
              </div>
              <div className="collapse-content text-neutral-500">
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
