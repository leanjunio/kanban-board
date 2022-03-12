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
  const { board, moveTicket, addNewTicket } = useBoard([
    "winnie",
    "brad",
    "bob",
    "thomas",
  ]);

  console.log({ board });

  const openAddTaskPrompt = (listIndex: number) => {
    const newTask = window.prompt("What to do next?");

    if (newTask) {
      const newTicket = { stage: listIndex, task: newTask };
      addNewTicket(newTicket, listIndex);
    }
  };

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
            {list.tickets.map((t, i) => (
              <Card key={i} task={t} onMove={moveTicket} />
            ))}
          </Column>
        ))}
      </header>
    </div>
  );
}

export default App;
