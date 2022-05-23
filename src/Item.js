import React, { useEffect,useState } from "react";



const Item = ({ writer, score, createDate, content, id, onRemove, onModify}) => {
  useEffect(()=>console.log(`${id}item rendered`))

  const [modified,setModified] = useState(false);

  const toggleModify = () => {setModified(!modified)};

  const [localContent, setLocalContent] = useState(content);

  const handleQuitModify = () =>{
    setModified(false); 
    setLocalContent(content);
  };

  const handleModify = () =>{
    onModify(id,localContent);
    toggleModify();
  }



  
  return (
    <div className="Item">
      <span>작성자 : {writer}</span>
      <span>점수 : {score}</span>
      <span>
        {modified ? <><textarea value={localContent} onChange={(e)=>setLocalContent(e.target.value)}/></>:<>{content}</>}
      </span>
      <span>날짜 : {new Date(createDate).toLocaleString()}</span>
      {modified ? 
      <><button onClick={handleQuitModify}>수정취소</button>
      <button onClick={handleModify}>수정완료</button></> 
      : <><button onClick={()=>onRemove(id)}>삭제</button>
      <button onClick={toggleModify}>수정</button></>
      }
     
    </div>
  );
};

export default React.memo(Item);
