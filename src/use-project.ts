import { useEffect, useState } from "react";
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
    const listToRemoveFrom = getListTickets(ticket.stage);
    const filteredTickets = listToRemoveFrom.filter(
      ({ task }) => task !== ticket.task
    );

    updateListTickets(ticket.stage, filteredTickets);
  };

  const moveTicket = (ticket: Ticket, direction: Direction) => {
    const currentTicketPlacement = getListPosition(ticket);

    removeTicketFromCurrentList(ticket);
    setTicketDestinationStage(ticket, direction);
    insertTicketToNewList(ticket, currentTicketPlacement);
  };

  const getListTickets = (listIndex: number) => {
    return [...board[listIndex].tickets];
  };

  const updateListTickets = (listIndex: number, updates: Ticket[]) => {
    const currentBoard = board;
    currentBoard[listIndex].tickets = updates;
    setBoard([...currentBoard]);
  };

  const getListPosition = (ticket: Ticket) => {
    const currentListTickets = getListTickets(ticket.stage);
    const currentTicketPlacement = currentListTickets.findIndex(
      ({ task }) => task === ticket.task
    );

    return currentTicketPlacement;
  };

  const setTicketDestinationStage = (ticket: Ticket, direction: Direction) => {
    direction === "left" ? ticket.stage-- : ticket.stage++;
  };

  const insertTicketToNewList = (ticket: Ticket, placementIndex: number) => {
    const ticketsToAddTo = getListTickets(ticket.stage);
    const DELETE_COUNT = 0;

    ticketsToAddTo.splice(placementIndex, DELETE_COUNT, ticket);
    updateListTickets(ticket.stage, ticketsToAddTo);
  };

  const addNewTicket = (ticket: Ticket, listIndex: number) => {
    const ticketsToAddTo = getListTickets(listIndex);
    ticketsToAddTo.push(ticket);
    updateListTickets(listIndex, ticketsToAddTo);
  };

  return { board, moveTicket, addNewTicket };
};
