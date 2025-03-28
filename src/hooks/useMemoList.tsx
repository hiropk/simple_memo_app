import { useCallback, useState, useEffect } from "react";

export const useMemoList = () => {
  const [memos, setMemos] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setMessage("");
  }, []);

  const tooLongText = (text: string) => {
    return text.length <= 15;
  };

  const addTodo = useCallback(
    (text: string) => {
      if (tooLongText(text)) {
        const newMemos = [...memos];
        newMemos.push(text);
        setMemos(newMemos);
        setMessage("更新しました");
      } else {
        setMessage("更新に失敗しました");
      }
    },
    [memos]
  );

  const deleteTodo = useCallback(
    (index: number) => {
      const newMemos = [...memos];
      newMemos.splice(index, 1);
      setMemos(newMemos);
      setMessage("削除しました");
    },
    [memos]
  );

  return { memos, message, setMemos, tooLongText, addTodo, deleteTodo };
};
