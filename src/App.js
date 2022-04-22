import React, {useState, useEffect} from "react"
import Editor from "./Editor";
import "./App.css";

//


const App = () => {
  return (
    <div className="App">
      <Editor />
      {/* <DiaryList diaryList={dummyList} /> 일기리스트를 렌더링하는 컴포넌트 */}
    </div>
  );
};
export default App;
