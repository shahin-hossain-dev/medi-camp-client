import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useAlert from "../../hooks/useAlert";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

const FeedbackModal = ({ feedback }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const alert = useAlert();
  const { campId, registeredId, campName } = feedback;

  const {
    register,
    control,
    handleSubmit,
    // watch,
    formState: { errors },
    // setError,
    // reset,
  } = useForm();

  const { mutateAsync } = useMutation({
    mutationFn: async (feedback) => {
      const res = await axiosSecure.post("/feedback", feedback);
      return res.data;
    },
    onSuccess: (res) => {
      document.getElementById("feedback-modal").close();
      if (res.insertedId) {
        alert("Feedback Successful", "success");
      }
    },
  });

  const handleFeedback = async (data) => {
    const feedback = {
      participantName: user?.displayName,
      participantEmail: user?.email,
      participantImage: user?.photoURL,
      date: new Date(),
      campName,
      campId,
      rating: data.rating,
      registeredId,
      feedbackMessage: data.feedbackMessage,
    };
    console.log(feedback);
    mutateAsync(feedback);
  };
  return (
    <div>
      <dialog id="feedback-modal" className="modal sm:modal-middle">
        <div
          className="modal-box w-11/12 max-w-5xl"
          style={{ borderRadius: "10px" }}
        >
          {/* working  */}
          <div className=" shrink-0 w-full ">
            <h2 className="text-xl md:text-2xl text-center font-medium">
              Participant Feedback
            </h2>
            <form onSubmit={handleSubmit(handleFeedback)} className="card-body">
              <div className="">
                {/* row three */}
                <div className="flex flex-col md:flex-row gap-6 ">
                  <div className="form-control w-full ">
                    <h4 className="font-medium">Rate Your Experience</h4>
                    <p>We will showcase your experience.</p>
                    <div className="mt-3 flex justify-center ">
                      <div>
                        {/* <Rating
                          style={{ maxWidth: 180, margin: "auto" }}
                          value={rating}
                          onChange={setRating}
                        /> */}
                        <Controller
                          control={control}
                          name="rating"
                          rules={{
                            validate: (rating) => rating > 0,
                          }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Rating
                              style={{ maxWidth: 180, margin: "auto" }}
                              value={value}
                              isRequired
                              onChange={onChange}
                              onBlur={onBlur}
                            />
                          )}
                        />
                      </div>
                    </div>

                    <label className="label">
                      <span className="label-text">Your Message</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered h-24 rounded-sm"
                      placeholder="Write your message."
                      {...register("feedbackMessage", { required: true })}
                    ></textarea>
                    {errors.feedbackMessage && (
                      <span className="text-red-500 mt-1 text-start">
                        Please fill up Feedback field
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-control mt-6 ">
                <button
                  type="submit"
                  className="btn text-[#ffffff] bg-gradient-to-br from-[#0066b2] to-[#003d6b] rounded-sm"
                >
                  <span className="relative text-base font-medium">
                    Submit Feedback
                  </span>
                </button>
              </div>
            </form>
          </div>

          <form method="dialog" className="">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost text-gray-500 absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default FeedbackModal;
