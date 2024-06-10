import Swal from "sweetalert2";

const useAlert = () => {
  const alert = (title, iconType) => {
    Swal.fire({
      title: title,
      icon: iconType,
      showConfirmButton: false,
      timer: 2000,
      background: "linear-gradient(to left top, #0066b2, #003d6b)",
      color: "White",
      width: "25em",
    });
  };
  return alert;
};

export default useAlert;
