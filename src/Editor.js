import { useState } from "react";

const Editor = ({onCreate}) => {
  const [state, setState] = useState({
    writer: "",
    content: "",
    score: 0,
  });
  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    console.log(state);
    onCreate(state.writer, state.content, state.score)
    alert("저장 성공!");
    setState({
    writer: "",
    content: "",
    score: 0,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 스코어잡담</h2>
      <div>
        <input
          name="writer"
          value={state.writer}
          onChange={handleInput}
          placeholder="작성자"
          required
        />
      </div>
      <div>
        <textarea
          name="content"
          value={state.content}
          onChange={handleInput}
          placeholder="내용"
          required
        />
      </div>
      <span>오늘의 점수 : </span>
      <select name="score" onChange={handleInput}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <div>
        <button onClick={handleSubmit}>저장하기</button>
      </div>
    </div>
  );
};

export default Editor;
