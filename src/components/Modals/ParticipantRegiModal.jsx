import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ParticipantRegiModal = ({ camp }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { campName, healthcareProfessional, location, fees } = camp;

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
    setError,
    // reset,
  } = useForm();

  const { mutateAsync } = useMutation({
    mutationFn: async (registerData) => {
      const res = await axiosSecure.post(
        "/registered-participant",
        registerData
      );
      console.log(res);
    },
  });

  const handleParticipantRegister = async (data) => {
    const registerData = {
      campName,
      healthcareProfessional,
      location,
      fees,
      participantName: user?.displayName,
      participantEmail: user?.email,
      ...data,
    };
    // console.log(registerData);

    await mutateAsync(registerData);
  };
  return (
    <div>
      {/* Apply Modal */}
      <dialog id="my_modal_5" className="modal ">
        <div
          className="modal-box w-11/12 max-w-5xl"
          style={{ borderRadius: "10px" }}
        >
          {/* working  */}
          <div className=" shrink-0 w-full ">
            <form
              onSubmit={handleSubmit(handleParticipantRegister)}
              className="card-body"
            >
              <div className="">
                {/* row 1 */}
                <div className="flex flex-col md:flex-row md:gap-6">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text ">Camp Name</span>
                    </label>
                    <input
                      type="text"
                      disabled
                      defaultValue={campName}
                      className="input input-bordered rounded-sm"
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Location</span>
                    </label>
                    <input
                      type="text"
                      disabled
                      defaultValue={location}
                      className="input input-bordered rounded-sm"
                    />
                  </div>
                </div>
                {/* row two */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">
                        Healthcare Professional Name
                      </span>
                    </label>
                    <input
                      type="text"
                      defaultValue={healthcareProfessional}
                      disabled
                      className="input input-bordered  rounded-sm"
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Camp Fee</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={"$" + fees}
                      disabled
                      className="input input-bordered rounded-sm"
                    />
                  </div>
                </div>
                {/* row three */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Participant Name</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.displayName}
                      disabled
                      className="input input-bordered  rounded-sm"
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Participant Email</span>
                    </label>
                    <input
                      type="text"
                      name="jobDescription"
                      defaultValue={user?.email}
                      disabled
                      className="input input-bordered  rounded-sm"
                    />
                  </div>
                </div>
                {/* row four */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Phone Number </span>
                    </label>
                    <input
                      type="number"
                      placeholder="Phone Number"
                      {...register("phoneNumber", { required: true })}
                      className="input input-bordered appearance-none  rounded-sm"
                    />
                    {errors.phoneNumber && (
                      <span className="text-red-500 mt-1 text-start">
                        Please fill up phone number field
                      </span>
                    )}
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Emergency Contact</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Emergency Contact"
                      {...register("emergencyContact", { required: true })}
                      className="input input-bordered rounded-sm"
                    />
                    {errors.emergencyContact && (
                      <span className="text-red-500 mt-1 text-start">
                        Please fill up emergency contact field
                      </span>
                    )}
                  </div>
                </div>
                {/* row five */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="form-control w-full flex-1">
                    <label className="label">
                      <span className="label-text">Age </span>
                    </label>
                    <input
                      type="number"
                      placeholder="Your Age"
                      {...register("participantAge", { required: true })}
                      className="input input-bordered appearance-none  rounded-sm"
                    />
                    {errors.participantAge && (
                      <span className="text-red-500 mt-1 text-start">
                        Please fill up phone number field
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1">
                    <div className="form-control ">
                      <label className="label">
                        <span className="label-text">Gender </span>
                      </label>
                      <div className="flex gap-6">
                        <label className="label cursor-pointer">
                          <span className="label-text me-3">Male</span>
                          <input
                            type="radio"
                            name="gender"
                            className="radio checked:bg-[#0066b2]"
                            {...register("gender")}
                            value={"male"}
                            defaultChecked
                          />
                        </label>
                        <label className="label cursor-pointer">
                          <span className="label-text me-3">Female</span>
                          <input
                            type="radio"
                            name="gender"
                            className="radio checked:bg-[#0066b2]"
                            value={"female"}
                            {...register("gender")}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-control mt-6 ">
                <button
                  type="submit"
                  className="btn text-[#ffffff] bg-gradient-to-br from-[#0066b2] to-[#003d6b] rounded-sm"
                >
                  <span className="relative text-base font-semibold">
                    Register Camp
                  </span>
                </button>
              </div>
            </form>
          </div>
          {/* working  */}
          {/* modal closing button */}
          {/* <div className="modal-action ">
            <form method="dialog">
              <button className="btn rounded-sm">Close</button>
            </form>
          </div> */}
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ParticipantRegiModal;
