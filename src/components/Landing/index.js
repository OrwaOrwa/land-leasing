import React from "react";
import "./Landing.css";

function Landing() {
  return (
    <div className="main__div">
      <div className="title-div">
        <h2>Search For Land</h2>
      </div>
      <div className="search-div">
        <input placeholder="Grow"></input>
        <input placeholder="Location"></input>
        <input placeholder="Price"></input>
        <button>Search</button>
      </div>
      <div className="items-div">
        <div className="land__div">
          <div className="image__div">Image</div>
          <div className="content__div">
            <h4 className="land__name">Land Name</h4>
            <p className="land__description">Land Description</p>
            <h5 className="land__price">Land Prices</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
