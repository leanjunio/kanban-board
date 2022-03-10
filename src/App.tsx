import { useState } from "react";
import "./App.scss";
import { Card } from "./Card";
import { Column } from "./Column";

export type Ticket = {
  task: string;
  stage: number;
};

export type Direction = "left" | "right";

function App() {
  const [winnieList, setWinnieList] = useState<Ticket[]>([]);
  const [bradList, setBradList] = useState<Ticket[]>([]);
  const [bobList, setBobList] = useState<Ticket[]>([]);
  const [thomasList, setThomasList] = useState<Ticket[]>([]);

  const listUtils = [
    { list: winnieList, setter: setWinnieList },
    { list: bradList, setter: setBradList },
    { list: bobList, setter: setBobList },
    { list: thomasList, setter: setThomasList },
  ];

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

  const removeTicketFromList = (ticket: Ticket, listIndex: number) => {
    const listToRemoveFrom = listUtils[listIndex]["list"];
    const setList = listUtils[listIndex]["setter"];
    const filteredList = listToRemoveFrom.filter(
      ({ task }) => task !== ticket.task
    );

    setList([...filteredList]);
  };

  const insertTicketIntoList = (
    ticket: Ticket,
    placementIndex: number,
    listIndex: number
  ) => {
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

  const moveRight = (task: Ticket) => {
    const indexToPushTo = getCurrentTicketPlacement(task);
    removeTicketFromList(task, task.stage);
    task.stage++;
    insertTicketIntoList(task, indexToPushTo, task.stage);
  };

  const moveLeft = (task: Ticket) => {
    const indexToPushTo = getCurrentTicketPlacement(task);
    removeTicketFromList(task, task.stage);
    task.stage--;
    insertTicketIntoList(task, indexToPushTo, task.stage);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Column column={0} onAdd={openAddTaskPrompt} title="Winnie">
          {winnieList.map((t) => (
            <Card task={t} onRight={moveRight} />
          ))}
        </Column>
        <Column column={1} onAdd={openAddTaskPrompt} title="Brad">
          {bradList.map((t) => (
            <Card task={t} onRight={moveRight} onLeft={moveLeft} />
          ))}
        </Column>
        <Column column={2} onAdd={openAddTaskPrompt} title="Bob">
          {bobList.map((t) => (
            <Card task={t} onRight={moveRight} onLeft={moveLeft} />
          ))}
        </Column>
        <Column column={3} onAdd={openAddTaskPrompt} title="Thomas">
          {thomasList.map((t) => (
            <Card task={t} onLeft={moveLeft} />
          ))}
        </Column>
      </header>
    </div>
  );
}

export default App;
