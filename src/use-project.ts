import { useState } from "react";

export const useBoard = (names: string[]) => {
  const lists = names.map((name) => ({ [name]: [] }));
  const [board, setBoard] = useState(lists);

  return [board, setBoard];
};
