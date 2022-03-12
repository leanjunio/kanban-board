import { useState } from "react";

export const useTicket = (listNames: string[]) => {
  const lists = listNames.map((name) => ({ [name]: [] }));
  const [list, setLists] = useState(lists);

  return [list, setLists];
};
