import React, {useState, useRef, useEffect, useMemo} from "react"
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

  const getDiaryAnalysis = useMemo(
    () =>{
    console.log("analysis start")

    const goodCount = data.filter((good)=> good.score >=3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount/data.length) *100;
    return{goodCount, badCount, goodRatio};
  },[data.length]
  );

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;


  return (
    <div className="App">
      <Editor onCreate={onCreate}/>
      <div>
        <p>전체일지 : {data.length}</p>
        <p>점수높은 일지 : {goodCount}</p>
        <p>점수낮은 일지 : {badCount}</p>
        <p>점수높은 일지 비율 : {goodRatio}</p>
      </div>
      <List scoreList={data} onRemove={onRemove} onModify={onModify} /> 
    </div>
  );
};
export default App;
