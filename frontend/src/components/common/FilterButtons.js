import React from "react";

const FilterButtons = (props) => {
  return (
    <div className="filter-buttons">
      {props.data.map((data, index) => {
        return (
          <button
            onClick={(e) => props.handleChange(e, data, props.type, props.filterType)}
            key={index}
          >
            {data}
          </button>
        );
      })}
    </div>
  );
}

export default FilterButtons;