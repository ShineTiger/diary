import Item from "./Item";

const List = ({scoreList, onRemove, onModify}) => {
  return (
    <div className="ScoreList">
      <h2>점수 리스트</h2>
      <h4>{scoreList.length}개의 일기가 있습니다.</h4>
      <div>
       {scoreList.map((item)=>
           <Item key={item.id} {...item} onRemove={onRemove} onModify={onModify}/>
       )}

      </div>
    </div>
  );
};

export default List;
