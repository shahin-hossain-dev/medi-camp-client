import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAlert from "../../../hooks/useAlert";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const AddCamp = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const alert = useAlert();
  const [startDate, setStartDate] = useState(new Date());
  // console.log(startDate.toISOString());
  const dateAndTime = startDate.toISOString();
  // console.log(moment(isoDate).format("DD, MMMM, YYYY"));

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
    // setError,
    reset,
  } = useForm();

  const { mutateAsync } = useMutation({
    mutationFn: async (registerData) => {
      const res = await axiosSecure.post("/camp-register", registerData);
      return res.data;
    },
    onSuccess: (res) => {
      console.log(res);
      if (res.insertedId) {
        alert("Camp added Successfully", "success");
      }
      reset();
    },
  });

  const handleAddCamp = async (data) => {
    console.log(data);
    const {
      campName,
      description,
      photo,
      fees,
      healthcareProfessional,
      location,
    } = data;
    // console.log(registerData);
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

    const campInfo = {
      image: userImage,
      campName,
      fees: parseInt(fees),
      dateAndTime,
      location,
      description,
      healthcareProfessional,
      participantCount: 0,
      createdBy: user?.email,
    };

    await mutateAsync(campInfo);
  };
  return (
    <div>
      <div
        className=" w-[95%] md:w-11/12 mx-auto mt-12"
        style={{ borderRadius: "10px" }}
      >
        {/* working  */}
        <div className=" shrink-0 w-full ">
          <h2 className="text-2xl md:text-3xl text-center font-medium">
            Add a new Camp
          </h2>
          <form onSubmit={handleSubmit(handleAddCamp)} className="card-body">
            <div className="">
              {/* row 1 */}
              <div className="flex flex-col md:flex-row md:gap-6">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text ">Camp Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered rounded-sm"
                    placeholder="Camp Name"
                    {...register("campName", { required: true })}
                  />
                  {errors.campName && (
                    <span className="text-red-500 mt-1 text-start">
                      Please fill up phone number field
                    </span>
                  )}
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Location</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered rounded-sm"
                    placeholder="Ex: Dhaka, Bangladesh"
                    {...register("location", { required: true })}
                  />
                  {errors.location && (
                    <span className="text-red-500 mt-1 text-start">
                      Please fill up phone number field
                    </span>
                  )}
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
                    className="input input-bordered  rounded-sm"
                    placeholder="Ex: Jhon Doe"
                    {...register("healthcareProfessional", { required: true })}
                  />
                  {errors.healthcareProfessional && (
                    <span className="text-red-500 mt-1 text-start">
                      Please fill up phone Healthcare Professional field
                    </span>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Camp Fee</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered rounded-sm"
                    placeholder="Camp Fees"
                    {...register("fees", { required: true })}
                  />
                  {errors.fees && (
                    <span className="text-red-500 mt-1 text-start">
                      Please fill up phone Fee field
                    </span>
                  )}
                </div>
              </div>
              {/* row three */}
              <div className="flex flex-col  md:flex-row gap-6">
                <div className="form-control w-full">
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
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Participant Email</span>
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                    className="input input-bordered rounded-sm w-full"
                  />
                  {errors.dateAndTime && (
                    <span className="text-red-500 mt-1 text-start">
                      Please Pick a Date
                    </span>
                  )}
                </div>
              </div>
              {/* row four */}
              <div className="flex flex-col md:flex-row gap-6 ">
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">Description </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-24 rounded-sm"
                    placeholder="Write about the camp."
                    {...register("description", { required: true })}
                  ></textarea>
                  {errors.phoneNumber && (
                    <span className="text-red-500 mt-1 text-start">
                      Please fill up phone number field
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
                <span className="relative text-base font-semibold">
                  Add Camp
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCamp;
