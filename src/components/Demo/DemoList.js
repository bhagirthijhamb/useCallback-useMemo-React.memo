import React, { useMemo } from "react";

import classes from "./DemoList.module.css";

const DemoList = (props) => {
  const { items } = props;

  // sorting logic is performance intensive
  // we dont want to run this code everytime this entire component is re-evaluated.
  // we memoize the rsult of the sorting.
  //  const sortedList = items.sort((a, b) => a - b);
  const sortedList = useMemo(() => {
    console.log("Items sorted");
    return items.sort((a, b) => a - b);
  }, [items]);
  console.log("DemoList RUNNING");

  return (
    <div className={classes.list}>
      <h2>{props.title}</h2>
      <ul>
        {sortedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

// react.memo() is used to avoid unnecessary re-evaluations
export default React.memo(DemoList);
