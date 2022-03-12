export type Ticket = {
  task: string;
  stage: number;
};

export type List = {
  name: string;
  tickets: Ticket[];
};

export type Direction = "left" | "right";
