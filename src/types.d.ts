interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

type Filter = "all" | "active" | "completed";
