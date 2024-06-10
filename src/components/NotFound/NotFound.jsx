const NotFound = ({ result }) => {
  return (
    <div>
      {result === 0 && (
        <p className="text-2xl py-3 text-neutral-500 text-center">
          {" "}
          Result Not Found
        </p>
      )}
    </div>
  );
};

export default NotFound;
