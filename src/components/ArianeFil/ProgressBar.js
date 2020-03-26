import React from "react";
import "./ProgressBar.css";
import Svg from "./Svg";

const ProgressBar = ({ progressBar }) => {
  return (
    <div className="container">
      <ul className="progressbar">
        {progressBar.map((item, index) => (
          <React.Fragment>
            <li
              className={item.done && "active"}
              id={index}
            >
              <Svg />
              {item.text}
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default ProgressBar;
