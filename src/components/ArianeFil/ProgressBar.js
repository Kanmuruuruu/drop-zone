import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ progressBar, changeProgress }) => {
  const makeAllDone = array => {
    // to get the id of the last done.
    const id = array.lastIndexOf(array.find(element => element.done === true));
    console.log(id);
    return array.map((element, index) => {
      if (index < id) {
        element.done = true;
      }
      return element;
    });
  };

  const makeActive = e => {
    const id = e.target.id;
    progressBar[id].done = true;
    const array = makeAllDone(progressBar);
    changeProgress([...array]);
  };

  return (
    <div className="container">
      <ul className="progressbar">
        {progressBar.map((item, index) => (
          <li className={item.done && "active"} id={index} onClick={makeActive}>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressBar;
