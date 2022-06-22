import React, { useState, useCallback, useMemo } from "react";
import Button from "./components/UI/Button/Button";
import "./App.css";
import DemoOutput from "./components/Demo/Demo";
import DemoList from "./components/Demo/DemoList";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  console.log("APP RUNNING!");

  // const toggleParagraphHandler = () => {
  //   setShowParagraph((prevParagraphState) => !prevParagraphState);
  // };

  // const toggleParagraphHandler = useCallback(() => {
  //     setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  // }, []);

  const toggleParagraphHandler = useCallback(() => {
    if (allowToggle) {
      setShowParagraph((prevShowParagraph) => !prevShowParagraph);
    }
  }, [allowToggle]); // allowToggle is added here to tell react to update the function with latest value of allowToggle (closures locks the values of the variables used inside the functions)

  const allowToggleHandler = () => {
    setAllowToggle(true);
  };

  // ----------------------------------------------
  // -------useMemo() Hook----------------------
  // ----------------------------------------------
  const [listTitle, setListTitle] = useState("My List");

  // useCallback to store a function to not recreate it
  const changeTitleHandler = useCallback(() => {
    setListTitle("New Title");
  }, []);

  // to ensure that we do not unnecessary pass a new array to DemoList component
  // which makes it to be re-evaluated.
  const listItems = useMemo(() => [5, 3, 1, 10, 9], []); // not sorted
  return (
    <div className="app">
      <>
        <h1>Hi there!</h1>
        {/* {showParagraph && <p>This is new!</p>} */}
        <DemoOutput show={showParagraph} />
        {/* <DemoOutput show={false} /> */}
        <Button onClick={allowToggleHandler}>Allow Toggling</Button>
        <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
      </>
      {/* Example forfor useMemo hook */}
      <>
        <DemoList title={listTitle} items={listItems} />
        <Button onClick={changeTitleHandler}>Change List Title</Button>
        {/* Butotn internally uses React.memo() and because we use the function stored with useCallback, the Button will not re-render in this case */}
      </>
    </div>
  );
}

export default App;
