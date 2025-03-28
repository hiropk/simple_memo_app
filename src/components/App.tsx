import { ChangeEvent, useState, FC, useCallback } from "react";
import styled from "styled-components";
import { MemoList } from "./MemoList";
import { useMemoList } from "./../hooks/useMemoList";

export const App: FC = () => {
  const { memos, setMemos, message, tooLongText, addTodo, deleteTodo } =
    useMemoList();
  const [text, setText] = useState<string>("");

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const onClickAdd = () => {
    addTodo(text);
    setText("");
  };

  const onClickDelete = useCallback(
    (index: number) => {
      deleteTodo(index);
    },
    [deleteTodo]
  );

  const onClickReset = useCallback(() => {
    setMemos([]);
  }, []);

  return (
    <div>
      <h1>簡単メモアプリ</h1>
      <div>{message}</div>
      {tooLongText(text) ? null : <SDiv>文字数が長すぎます。</SDiv>}
      <input type="text" value={text} onChange={onChangeText} />
      <SButton onClick={onClickAdd}>追加</SButton>
      <SButton onClick={onClickReset}>メモを全て削除</SButton>
      <MemoList memos={memos} onClickDelete={onClickDelete} />
    </div>
  );
};

const SButton = styled.button`
  margin-left: 16px;
`;

const SDiv = styled.div`
  color: red;
`;
