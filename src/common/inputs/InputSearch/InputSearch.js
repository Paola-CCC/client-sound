import { React } from "react";
import "./InputSearch.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const InputSearch = ({ placeholder, value, onChange , onClick }) => {
  return (
  <div className="input-search-container"  tabIndex={0}>
    <input type="text" className="input-search-input" value={value} placeholder={placeholder} name="search" onChange={onChange}  tabIndex={-1}/>
    <button type="submit" className="icon-search"  onClick={onClick}>
      <FontAwesomeIcon icon={faMagnifyingGlass} flip="horizontal" />
    </button>
  </div>
  );
};

export default InputSearch;
