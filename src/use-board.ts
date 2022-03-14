import { useState } from "react";
import { Ticket, Direction, List } from "./types";
import { addTicketAtIndex, getAllOtherTickets, getTicketIndex } from "./utils";

/**
 * A hook that allows reusability and abstraction of board actions
 *
 * @param names - the list of names to make columns out of
 * @returns the functions necessary to interact with the board
 */
export const useBoard = (names: string[]) => {
  const tickets: Ticket[] = [];
  const lists: List[] = names.map((name) => ({ name, tickets }));
  const [board, setBoard] = useState(lists);

  const removeTicketFromCurrentList = (ticket: Ticket) => {
    const listIndex = ticket.stage;
    const currentList = getListTickets(listIndex);
    const remainingTickets = getAllOtherTickets(currentList, ticket);

    updateListTickets(listIndex, remainingTickets);
  };

  const moveTicket = (ticket: Ticket, direction: Direction) => {
    const position = getListPosition(ticket);

    removeTicketFromCurrentList(ticket);
    setTicketDestinationStage(ticket, direction);
    insertTicketToNewList(ticket, position);
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
    const tickets = getListTickets(ticket.stage);
    const ticketPosition = getTicketIndex(tickets, ticket);

    return ticketPosition;
  };

  const setTicketDestinationStage = (ticket: Ticket, direction: Direction) => {
    direction === "left" ? ticket.stage-- : ticket.stage++;
  };

  const insertTicketToNewList = (ticket: Ticket, placementIndex: number) => {
    const listIndex = ticket.stage;
    const ticketsToAddTo = getListTickets(listIndex);
    addTicketAtIndex(ticketsToAddTo, ticket, placementIndex);
    updateListTickets(listIndex, ticketsToAddTo);
  };

  const addNewTicket = (ticket: Ticket, listIndex: number) => {
    const ticketsToAddTo = getListTickets(listIndex);
    ticketsToAddTo.push(ticket);
    updateListTickets(listIndex, ticketsToAddTo);
  };

  return { board, moveTicket, addNewTicket };
};
