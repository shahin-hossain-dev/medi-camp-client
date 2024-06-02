import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const ParticipantRegiModal = ({ camp }) => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
    setError,
    // reset,
  } = useForm();

  const handleParticipantRegister = (data) => {
    console.log(data);
  };
  return (
    <div>
      {/* Apply Modal */}
      <dialog id="my_modal_5" className="modal modal-bottom lg:modal-middle">
        <div className="modal-box " style={{ borderRadius: "10px" }}>
          {/* working  */}
          <div className=" shrink-0 w-full ">
            <form
              onSubmit={handleSubmit(handleParticipantRegister)}
              className="card-body"
            >
              {/* row 1 */}
              <div className="">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Camp Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("campName", { required: true })}
                    placeholder="Provide Camp Name"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">User</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Short Description"
                    defaultValue={user?.displayName}
                    {...register("participantName", { required: true })}
                    className="input input-bordered disabled:input disabled:input-bordered"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">User Email</span>
                  </label>
                  <input
                    type="text"
                    name="jobDescription"
                    placeholder="User Email"
                    defaultValue={user?.email}
                    {...register("participantEmail", { required: true })}
                    className="input input-bordered disabled:input disabled:input-bordered"
                  />
                </div>
              </div>

              <div className="form-control mt-6 ">
                <button type="submit">
                  <span className="relative text-base font-semibold">
                    Submit Application
                  </span>
                </button>
              </div>
            </form>
          </div>
          {/* working  */}
          {/* modal closing button */}
          <div className="modal-action ">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
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
