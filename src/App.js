import React, {useState, useRef} from "react"
import Editor from "./Editor";
import List from "./List";
import "./App.css";

// const dummyList = [
//   {
//     id: 1,
//     writer: "홍길동",
//     content: "example",
//     score: 1,
//     created_date: new Date().getTime()
//   },
//   {
//     id: 2,
//     writer: "홍길동2",
//     content: "example2",
//     score: 2,
//     created_date: new Date().getTime()
//   },
//   {
//     id: 3,
//     writer: "홍길동3",
//     content: "example3",
//     score: 3,
//     created_date: new Date().getTime()
//   },
//   {
//     id: 4,
//     writer: "홍길동4",
//     content: "example4",
//     score: 4,
//     created_date: new Date().getTime()
//   },
//   {
//     id: 5,
//     writer: "홍길동5",
//     content: "example5",
//     score: 5,
//     created_date: new Date().getTime()
//   },
// ];


const App = () => {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (writer, content, score) => {
    const createDate = new Date().getTime();
    const newItem = {
      id: dataId.current,
      writer,
      score,
      content,
      createDate     
    }
    dataId.current+= 1;
    setData([newItem, ...data])
  };

  const onRemove = (targetId) => {
    const updateList = data.filter((item) => item.id !== targetId);
    setData(updateList);
  }

  const onModify = (targetId,newContent) => {
    setData(
      data.map((item)=>
      item.id === targetId ? {...item, content: newContent} : item)
    )
  }


  return (
    <div className="App">
      <Editor onCreate={onCreate}/>
      <List scoreList={data} onRemove={onRemove} onModify={onModify} /> 
    </div>
  );
};
export default App;
