import moment from "moment";

const Search = ({ data, setAllCamps }) => {
  //  search handle
  // search camp with keywords
  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;

    const campSearch = data.filter(
      (camp) =>
        camp.campName.toLowerCase().includes(searchText.toLowerCase()) ||
        camp.fees === parseInt(searchText) ||
        moment(camp.dateAndTime).format("DD-MM-YYYY").includes(searchText) ||
        camp?.healthcareProfessional
          ?.toLowerCase()
          ?.includes(searchText.toLowerCase()) ||
        moment(camp.transactionDate)?.format("DD-MM-YYYY")?.includes(searchText)
    );
    setAllCamps(campSearch);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex-1">
        <fieldset className="form-control w-full">
          <label className="label flex justify-center md:justify-start mb-1 ">
            <span className="text-xl font-medium">Search Camps Keyword</span>
          </label>
          <div className="join">
            <input
              type="text"
              name="search"
              placeholder="search your job"
              className=" outline-none px-3 w-full join-item rounded-sm border border-[#0066b2]"
            />
            <button
              type="submit"
              className="btn rounded-sm join-item border-[#0066b2] hover:border-[#0066b2]"
            >
              Search
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Search;
