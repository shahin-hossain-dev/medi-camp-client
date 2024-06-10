const PageOfShow = ({ currentPage, itemsPerPage, allCamps, count }) => {
  console.log(currentPage, itemsPerPage, allCamps, count);

  const preState = currentPage * itemsPerPage;
  const stepNext = (currentPage + 1) * itemsPerPage;
  const overCount = stepNext > count;

  const remainingCount = overCount
    ? stepNext - itemsPerPage + allCamps.length
    : stepNext;

  return (
    <span className="text-neutral-500">
      Showing <span>{preState + 1} </span> - <span>{remainingCount}</span> from{" "}
      {count}
    </span>
  );
};

export default PageOfShow;
