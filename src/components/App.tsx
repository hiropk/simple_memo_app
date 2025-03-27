import { ChangeEvent, useState, FC, useCallback } from "react";
import styled from "styled-components";
import { MemoList } from "./MemoList";
import { useMemoList } from "./../hooks/useMemoList";

export const App: FC = () => {
  const { memos, message, addTodo, deleteTodo } = useMemoList();
  const [text, setText] = useState<string>("");

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const onClickAdd = () => {
    if (text.length <= 15) {
      addTodo(text);
      setText("");
    }
  };

  const onClickDelete = useCallback(
    (index: number) => {
      deleteTodo(index);
    },
    [deleteTodo]
  );

  return (
    <div>
      <h1>簡単メモアプリ</h1>
      <div>{message}</div>
      {text.length <= 15 ? null : <SDiv>文字数が長すぎます。</SDiv>}
      <input type="text" value={text} onChange={onChangeText} />
      <SButton onClick={onClickAdd}>追加</SButton>
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
