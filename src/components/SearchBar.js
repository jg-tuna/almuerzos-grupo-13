import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchBar = () => {
  const magnifyingGlass = <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
  return(
    <div className="relative rounded-md shadow-sm flex-1">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {magnifyingGlass}
      </div>
      <input type="text" name="search" id="search" className="focus:outline-red-500 focus:border-transparent focus:ring-0 focus:border-blue-400 focus:ring-0 block w-full pl-10 pr-12 sm:text-sm rounded-md py-3" autoComplete="off" placeholder="Buscar local..."/>
    </div>
  );
}

export default SearchBar;