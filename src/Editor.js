import { useState } from "react";

const Editor = () => {
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
    alert("저장 성공!");
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 스코어잡담</h2>
      <div>
        <input
          name="writer"
          onChange={handleInput}
          placeholder="작성자"
          required
        />
      </div>
      <div>
        <textarea
          name="content"
          onChange={handleInput}
          placeholder="내용"
          required
        />
      </div>
      <span>오늘의 점수 : </span>
      <select name="score" onChange={handleInput}>
        <option>1</option>
      </select>
      <div>
        <button onClick={handleSubmit}>저장하기</button>
      </div>
    </div>
  );
};

export default Editor;
