import { useState } from "react";
import { Ticket } from "./App";

export type List = {
  name: string;
  tickets: Ticket[];
};
export type Board = List[];

export const useBoard = (names: string[]) => {
  const tickets: Ticket[] = [];
  const lists: List[] = names.map((name) => ({ name, tickets }));
  const [board, _] = useState(lists);

  return [board];
};
