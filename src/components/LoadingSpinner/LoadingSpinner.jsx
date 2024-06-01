import spinnerImg from "../../assets/loading.webp";
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <img src={spinnerImg} className="w-[100px]" alt="" />
    </div>
  );
};

export default LoadingSpinner;
