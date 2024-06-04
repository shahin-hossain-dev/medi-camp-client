import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAlert from "../../hooks/useAlert";
import axios from "axios";

const UpdateProfileModal = () => {
  const { user, updateUserProfile } = useAuth();

  const alert = useAlert();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
    // setError,
    // reset,
  } = useForm();

  const handleUpdateProfile = async (data) => {
    const { photo, displayName } = data;
    // img bb image hosting api
    // 3 part: api - img file - headers
    const imgFile = { image: photo[0] };

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOSTING_KEY
      }`,
      imgFile,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );

    const userImage = res.data.data.url;
    console.log(userImage);

    updateUserProfile(displayName, userImage)
      .then(() => {
        document.getElementById("update-profile-modal").close();
        alert("Profile Update SuccessFully", "success");
      })
      .catch((error) => {
        console.log(error.message);
        alert("Something Wrong", "error");
      });
  };

  return (
    <div>
      {/* Apply Modal */}
      <dialog id="update-profile-modal" className="modal ">
        <div
          className="modal-box w-11/12 max-w-5xl"
          style={{ borderRadius: "10px" }}
        >
          {/* working  */}
          <div className=" shrink-0 w-full ">
            <h2 className="text-2xl md:text-3xl text-center font-medium">
              Update Profile
            </h2>
            <form
              onSubmit={handleSubmit(handleUpdateProfile)}
              className="card-body"
            >
              <div className="">
                {/* row three */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">User Name</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.displayName}
                      {...register("displayName", { required: true })}
                      className="input input-bordered  rounded-sm"
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">User Email</span>
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
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo</span>
                  </label>
                  <input
                    type="file"
                    {...register("photo", { required: true })}
                    placeholder="Upload your photo"
                    className="file-input file-input-bordered rounded-sm"
                  />
                  {errors.photo && (
                    <span className="text-red-500 mt-1 text-start">
                      Please choose a photo
                    </span>
                  )}
                </div>
                {/* row five */}
              </div>

              <div className="form-control mt-6 ">
                <button
                  type="submit"
                  className="btn text-[#ffffff] bg-gradient-to-br from-[#0066b2] to-[#003d6b] rounded-sm"
                >
                  <span className="relative text-base font-semibold">
                    Update Profile
                  </span>
                </button>
              </div>
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

export default UpdateProfileModal;
