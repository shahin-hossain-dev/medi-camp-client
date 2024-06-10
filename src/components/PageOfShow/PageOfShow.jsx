const PageOfShow = ({ currentPage, itemsPerPage, allCamps, count }) => {
  const preState = currentPage * itemsPerPage;
  const stepNext = (currentPage + 1) * itemsPerPage;
  const overCount = stepNext > count;

  const remainingCount = overCount
    ? stepNext - itemsPerPage + allCamps.length
    : stepNext;

  return (
    <span className="text-neutral-500">
      Showing <span>{allCamps.length === 0 ? 0 : preState + 1} </span> -{" "}
      <span>{allCamps.length === 0 ? 0 : remainingCount}</span> from{" "}
      {allCamps.length === 0 ? 0 : count}
    </span>
  );
};

export default PageOfShow;
