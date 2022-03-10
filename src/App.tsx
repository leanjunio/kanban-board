import { useState } from "react";
import "./App.scss";
import { Card } from "./Card";
import { Column } from "./Column";

export type Ticket = {
  task: string;
  stage: number;
};
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

  const openPrompt = (listIndex: number) => {
    const newTask = window.prompt("What to do next?");

    if (newTask) {
      const newTicket = { stage: listIndex, task: newTask };
      addTicketToList(newTicket, listIndex);
    }
  };

  const moveRight = (task: Ticket) => {
    const currentList = listUtils[task.stage]["list"];

    const indexToPushTo = currentList.findIndex((t) => t.task === task.task);

    const updatedList = currentList.filter((t) => t.task !== task.task);
    listUtils[task.stage]["setter"]([...updatedList]);

    task.stage++;
    const currentNewList = listUtils[task.stage]["list"];
    currentNewList.splice(indexToPushTo, 0, task);
    listUtils[task.stage]["setter"]([...currentNewList]);
  };

  const moveLeft = (task: Ticket) => {
    const currentList = listUtils[task.stage]["list"];
    const indexToPushTo = currentList.findIndex((t) => t.task === task.task);

    const updatedList = currentList.filter((t) => t.task !== task.task);
    listUtils[task.stage]["setter"]([...updatedList]);

    task.stage--;
    const currentNewList = listUtils[task.stage]["list"];
    currentNewList.splice(indexToPushTo, 0, task);

    listUtils[task.stage]["setter"]([...currentNewList]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Column column={0} onAdd={openPrompt} title="Winnie">
          {winnieList.map((t) => (
            <Card task={t} onRight={moveRight} />
          ))}
        </Column>
        <Column column={1} onAdd={openPrompt} title="Brad">
          {bradList.map((t) => (
            <Card task={t} onRight={moveRight} onLeft={moveLeft} />
          ))}
        </Column>
        <Column column={2} onAdd={openPrompt} title="Bob">
          {bobList.map((t) => (
            <Card task={t} onRight={moveRight} onLeft={moveLeft} />
          ))}
        </Column>
        <Column column={3} onAdd={openPrompt} title="Thomas">
          {thomasList.map((t) => (
            <Card task={t} onLeft={moveLeft} />
          ))}
        </Column>
      </header>
    </div>
  );
}

export default App;
