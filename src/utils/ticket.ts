import { Ticket } from "../types";

export const getTicketIndex = (list: Ticket[], ticket: Ticket) => {
  return list.findIndex(({ task }) => task === ticket.task);
};

export const getAllOtherTickets = (list: Ticket[], ticket: Ticket) => {
  return list.filter(({ task }) => task !== ticket.task);
};

export const addTicketAtIndex = (
  list: Ticket[],
  ticket: Ticket,
  index: number
) => {
  const DELETE_COUNT = 0;
  list.splice(index, DELETE_COUNT, ticket);
};
