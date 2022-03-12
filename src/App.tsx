import "./App.scss";
import { Card } from "./Card";
import { Column } from "./Column";
import { useBoard } from "./use-board";

function App() {
  const names = ["winnie", "brad", "bob", "thomas"];
  const { board, moveTicket, addNewTicket } = useBoard(names);

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
            {list.tickets.map((t, i) => {
              const firstStage = 0;
              const lastStage = board.length - 1;
              const isInFirstColumn = t.stage === firstStage;
              const isInLastColumn = t.stage === lastStage;

              return (
                <Card
                  isFirst={isInFirstColumn}
                  isLast={isInLastColumn}
                  key={i}
                  ticket={t}
                  onMove={moveTicket}
                />
              );
            })}
          </Column>
        ))}
      </header>
    </div>
  );
}

export default App;
