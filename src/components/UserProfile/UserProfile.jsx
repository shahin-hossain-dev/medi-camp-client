import moment from "moment";
import UpdateProfileModal from "../Modals/UpdateProfileModal";
import useAuth from "../../hooks/useAuth";

const UserProfile = () => {
  const { user } = useAuth();
  const join = user?.metadata?.creationTime;
  const lastLogin = user?.metadata?.lastSignInTime;
  //   console.log(join);
  return (
    <div className="md:p-16 p-5 mt-10 md:mt-0">
      {/* <div className="w-full relative h-[100px] bg-gradient-to-br from-[#374151] to-[#111827]"></div> */}
      <div className="flex flex-col md:flex-row gap-6">
        <div
          style={{ boxShadow: "2px 2px 20px #00000033" }}
          className="card p-3 bg-base-100 rounded-sm"
        >
          <div className="flex justify-center">
            <img
              src={user?.photoURL}
              className="rounded-full w-[140px] border-white border-4"
              alt=""
            />
          </div>
          <div className="card-body text-center">
            <h2 className=" text-2xl font-medium ">{user?.displayName}</h2>
            <p>{user?.email}</p>
          </div>
        </div>
        {/* info */}
        <div
          style={{ boxShadow: "2px 2px 20px #00000033" }}
          className="card flex-1 p-6 bg-base-100  rounded-sm"
        >
          <div className=" space-y-3 ">
            <h2 className="card-title me-3">Name: {user?.displayName}</h2>
            <p>
              <span className="font-medium me-3">Email:</span> {user?.email}
            </p>
            <p>
              <span className="font-medium me-3">Created Date:</span>{" "}
              {moment(join).format(" Do, MMMM, YYYY - h:mm a")}
            </p>
            <p>
              <span className="font-medium me-3">Last Login Date:</span>{" "}
              {moment(lastLogin).format(" Do, MMMM, YYYY - h:mm a")}
            </p>

            <div className="card-actions justify-end items-end">
              <button
                onClick={() =>
                  document.getElementById("update-profile-modal").showModal()
                }
                className=" text-[#000000]  rounded-sm px-5 duration-150 active:scale-95  font-medium me-3 bg-[#efb312] p-3 py-2"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <UpdateProfileModal />
    </div>
  );
};

export default UserProfile;
