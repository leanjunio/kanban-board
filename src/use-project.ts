import { useState } from "react";
import { Direction, Ticket } from "./App";

export type List = {
  name: string;
  tickets: Ticket[];
};
export type Board = List[];

export const useBoard = (names: string[]) => {
  const tickets: Ticket[] = [];
  const lists: List[] = names.map((name) => ({ name, tickets }));
  const [board, setBoard] = useState(lists);

  const removeTicketFromCurrentList = (ticket: Ticket) => {
    const listToRemoveFrom = getList(ticket.stage);
    listToRemoveFrom.tickets = listToRemoveFrom.tickets.filter(
      ({ task }) => task !== ticket.task
    );

    updateList(ticket.stage, listToRemoveFrom);
  };

  const moveTicket = (ticket: Ticket, direction: Direction) => {
    const currentTicketPlacement = getCurrentTicketPlacement(ticket);
    removeTicketFromCurrentList(ticket);
    setTicketDestinationStage(ticket, direction);
    insertTicketToNewList(ticket, currentTicketPlacement);
  };

  const getList = (listIndex: number) => {
    return board[listIndex];
  };

  const updateList = (listIndex: number, update: List) => {
    const currentBoard = board;
    currentBoard[listIndex] = update;
    setBoard([...currentBoard]);
  };

  const getCurrentTicketPlacement = (ticket: Ticket) => {
    const currentList = getList(ticket.stage);
    const currentTicketPlacement = currentList.tickets.findIndex(
      ({ task }) => task === ticket.task
    );

    return currentTicketPlacement;
  };

  return [board];
};
