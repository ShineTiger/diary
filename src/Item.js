

const Item = ({ writer, score, createDate, content, id, onRemove}) => {
  return (
    <div className="Item">
      <span>작성자 : {writer}</span>
      <span>점수 : {score}</span>
      <span>{content}</span>
      <span>날짜 : {new Date(createDate).toLocaleString()}</span>
      <button onClick={()=>onRemove(id)}>삭제</button>
      
    </div>
  );
};

export default Item;
