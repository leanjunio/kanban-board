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

  const setTicketDestinationStage = (ticket: Ticket, direction: Direction) => {
    direction === "left" ? ticket.stage-- : ticket.stage++;
  };

  const insertTicketToNewList = (ticket: Ticket, placementIndex: number) => {
    const listIndex = ticket.stage;
    const listToAddTo = getList(ticket.stage);
    const DELETE_COUNT = 0;

    listToAddTo.tickets.splice(placementIndex, DELETE_COUNT, ticket);
    updateList(listIndex, listToAddTo);
  };

  const addTicketToList = (ticket: Ticket, listIndex: number) => {
    const listToAddTo = getList(listIndex);
    listToAddTo.tickets = [...listToAddTo.tickets, ticket];

    updateList(listIndex, listToAddTo);
  };

  return { board, moveTicket, addTicketToList };
};
