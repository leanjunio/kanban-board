import { useState } from "react";
import "./App.scss";
import { Card } from "./Card";
import { Column } from "./Column";
import { useBoard } from "./use-project";

export type Ticket = {
  task: string;
  stage: number;
};

export type Direction = "left" | "right";

function App() {
  const [board, setBoard] = useBoard(["winnie", "brad", "bob", "thomas"]);

  const addTicketToList = (ticket: Ticket, listIndex: number) => {
    const listToAddTo = listUtils[listIndex]["list"];
    const updateList = listUtils[listIndex]["setter"];

    updateList([...listToAddTo, ticket]);
  };

  const openAddTaskPrompt = (listIndex: number) => {
    const newTask = window.prompt("What to do next?");

    if (newTask) {
      const newTicket = { stage: listIndex, task: newTask };
      addTicketToList(newTicket, listIndex);
    }
  };

  const removeTicketFromCurrentList = (ticket: Ticket) => {
    const listIndex = ticket.stage;
    const listToRemoveFrom = listUtils[listIndex]["list"];
    const setList = listUtils[listIndex]["setter"];
    const filteredList = listToRemoveFrom.filter(
      ({ task }) => task !== ticket.task
    );

    setList([...filteredList]);
  };

  const insertTicketToNewList = (ticket: Ticket, placementIndex: number) => {
    const listIndex = ticket.stage;
    const listToAddTo = listUtils[listIndex]["list"];
    const setList = listUtils[listIndex]["setter"];
    const DELETE_COUNT = 0;

    listToAddTo.splice(placementIndex, DELETE_COUNT, ticket);

    setList([...listToAddTo]);
  };

  const getCurrentTicketPlacement = (ticket: Ticket) => {
    const currentList = listUtils[ticket.stage]["list"];
    const currentTicketPlacement = currentList.findIndex(
      ({ task }) => task === ticket.task
    );

    return currentTicketPlacement;
  };

  const moveTicket = (ticket: Ticket, direction: Direction) => {
    const currentTicketPlacement = getCurrentTicketPlacement(ticket);
    removeTicketFromCurrentList(ticket);
    setTicketDestinationStage(ticket, direction);
    insertTicketToNewList(ticket, currentTicketPlacement);
  };

  const setTicketDestinationStage = (ticket: Ticket, direction: Direction) => {
    direction === "left" ? ticket.stage-- : ticket.stage++;
  };

  console.log(board);

  return (
    <div className="App">
      <header className="App-header">
        {board.map((list, key) => (
          <Column
            key={key}
            column={key}
            onAdd={openAddTaskPrompt}
            title={list.name}
          >
            {list.tickets.map((t) => (
              <Card task={t} onMove={moveTicket} />
            ))}
          </Column>
        ))}
      </header>
    </div>
  );
}

export default App;
