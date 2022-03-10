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

  const openPrompt = (column: number) => {
    const newTask = window.prompt("What to do next?");

    if (newTask) {
      const listToAddTo = listUtils[column]["list"];
      listUtils[column]["setter"]([
        ...listToAddTo,
        { stage: column, task: newTask },
      ]);
    }
  };

  const moveRight = (task: Ticket) => {
    // move task to the "right"
    // remove task from current list
    const currentList = listUtils[task.stage]["list"];

    const indexToPushTo = currentList.findIndex((t) => t.task === task.task);

    const updatedList = currentList.filter((t) => t.task !== task.task);
    listUtils[task.stage]["setter"]([...updatedList]);

    // add to the new list on the right
    task.stage++;
    const currentNewList = listUtils[task.stage]["list"];
    currentNewList.splice(indexToPushTo, 0, task);
    listUtils[task.stage]["setter"]([...currentNewList]);
  };

  const moveLeft = (task: Ticket) => {
    // move task to the "left"
    // remove task from current list
    const currentList = listUtils[task.stage]["list"];
    const indexToPushTo = currentList.findIndex((t) => t.task === task.task);

    const updatedList = currentList.filter((t) => t.task !== task.task);
    listUtils[task.stage]["setter"]([...updatedList]);

    // add to the new list on the left
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
