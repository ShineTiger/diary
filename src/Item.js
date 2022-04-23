const Item = ({ writer, score, created_date,content }) => {
  return (
    <div className="Item">
      <span>작성자 : {writer}</span>
      <span>점수 : {score}</span>
      <span>날짜 : {created_date}</span>
      <span>{content}</span>
    </div>
  );
};

export default Item;
