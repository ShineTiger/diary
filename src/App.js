import React, {useState, useRef, useEffect} from "react"
import Editor from "./Editor";
import List from "./List";
import "./App.css";

//https://jsonplaceholder.typicode.com/comments


const App = () => {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res)=> res.json());
  
    const initData = res.slice(0,20).map((it)=>{
      return {
        id : dataId.current++,
        writer : it.email,
        score : Math.floor(Math.random()*5)+1,
        content : it.body,
        createDate : new Date().getTime(),
      }
    })

    setData(initData);
  }

  useEffect(()=>{
    getData()
  },[])

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
