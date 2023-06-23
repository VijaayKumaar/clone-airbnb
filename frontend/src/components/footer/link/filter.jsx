
import React from "react";
import links from "./Link";
import "./styles.css";

function Filter({ selectedFilter, setSelectedFilter }) {
  const handleClick = (index) => {
    if (typeof setSelectedFilter === "function") {
      setSelectedFilter(index);
    }
  };

  return (
    <div className="filter-div">
      {links.map((item, index) => (
        <div
          key={index}
          className={`links-box ${index === selectedFilter && "selected-box"}`}
          onClick={() => handleClick(index)}
        >
          <img src={item.imgSrc} className="links-img" alt={item.label} />
          <p className={`links-label ${index === selectedFilter && "selected-label"}`}>
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Filter;
