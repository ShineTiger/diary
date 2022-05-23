import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
} from "react";
import Editor from "./Editor";
import List from "./List";
import "./App.css";

//https://jsonplaceholder.typicode.com/comments

const reducer = (state, action) =>{
  switch(action.type){
    case "INIT":{
      return action.data
    }
    case "CREATE":{
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date
      }
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it)=>it.id !== action.targetId);
    }
    case "EDIT":{
      return state.map((item)=>
        item.id === action.targetId ? 
        {...item, content:action.newContent} : item
      )
    }
    default :
    return state;
  }
}

const App = () => {
  //const [data, setData] = useState([]);

  const [data, dispatch]=useReducer(reducer,[])

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        id: dataId.current++,
        writer: it.email,
        score: Math.floor(Math.random() * 5) + 1,
        content: it.body,
        createDate: new Date().getTime(),
      };
    });
    dispatch({type:"INIT", data:initData})
    //setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((writer, content, score) => {

    dispatch({type:'CREATE', data:{writer,score,content,id:dataId.current}})

   /* const createDate = new Date().getTime();
    const newItem = {
      writer,
      score,
      content,
      createDate,
      id: dataId.current,
    };*/
    dataId.current += 1;
    //setData((data) => [newItem, ...data]);
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({type:"REMOVE", targetId})
    /*setData((data) => data.filter((item) => item.id !== targetId));*/
  }, []);

  const onModify = useCallback((targetId, newContent) => {
    dispatch({type:"EDIT", targetId,newContent})
    /*setData((data) =>
      data.map((item) =>
        item.id === targetId ? { ...item, content: newContent } : item
      )
    );*/
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((good) => good.score >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <Editor onCreate={onCreate} />
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
