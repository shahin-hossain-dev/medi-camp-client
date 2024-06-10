import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAlert from "../../../hooks/useAlert";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const UpdateCamp = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const alert = useAlert();
  const { id } = useParams();
  const [startDate, setStartDate] = useState(null);
  const [updateDate, setUpdateDate] = useState(null);

  useEffect(() => {
    if (startDate) {
      const dateAndTime = startDate?.toISOString();
      setUpdateDate(dateAndTime);
    }
  }, [startDate]);

  const {
    data: camp,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["update-camp"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/camps/${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
    // setError,
    reset,
  } = useForm();

  const { mutateAsync } = useMutation({
    mutationFn: async (updateData) => {
      const res = await axiosSecure.patch(`/update-camp/${id}`, updateData);
      return res.data;
    },
    onSuccess: (res) => {
      // console.log(res);
      if (res.modifiedCount > 0) {
        alert("Camp Updated Successfully", "success");
        refetch();
      }
    },
  });

  const handleUpdateCamp = async (data) => {
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

    if (!imgFile.image) {
      const campInfo = {
        image: camp?.image,
        campName,
        fees: parseInt(fees),
        dateAndTime: updateDate,
        location,
        description,
        healthcareProfessional,
      };
      // console.log(campInfo);

      await mutateAsync(campInfo);
      return;
    }

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
      dateAndTime: updateDate,
      location,
      description,
      healthcareProfessional,
    };
    // console.log(campInfo);

    await mutateAsync(campInfo);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const {
    campName,
    dateAndTime: campDate,
    healthcareProfessional,
    location,
    fees,
    description,
  } = camp;

  return (
    <div>
      <div
        className=" w-[95%] md:w-11/12 mx-auto mt-12"
        style={{ borderRadius: "10px" }}
      >
        {/* working  */}
        <div className=" shrink-0 w-full ">
          <h2 className="text-2xl md:text-3xl text-center font-medium">
            Update a Camp
          </h2>
          <form onSubmit={handleSubmit(handleUpdateCamp)} className="card-body">
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
                    defaultValue={campName}
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
                    defaultValue={location}
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
                    defaultValue={healthcareProfessional}
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
                    defaultValue={fees}
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
                    {...register("photo")}
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
                    <span className="label-text">Camp Date</span>
                  </label>
                  <DatePicker
                    selected={startDate || campDate}
                    onChange={(date) => setStartDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/yyyy h:mm aa"
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
                    defaultValue={description}
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
                  Update Camp
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCamp;
