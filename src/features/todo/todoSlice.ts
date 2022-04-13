import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface TodoState {
  todos: ITodo[];
  filter: Filter;
}

const initialState: TodoState = {
  todos: [
    { id: "1", text: "This is a task", completed: false },
    { id: "2", text: "Tap on text to edit", completed: false },
    { id: "3", text: "Completed items appear here", completed: true },
  ],
  filter: "all",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<ITodo>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
    toggleFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addTodo,
  removeTodo,
  toggleTodo,
  updateTodo,
  deleteCompleted,
  toggleFilter,
} = todoSlice.actions;

export const selectTodo = (state: RootState) => state.todo.todos;
export const selectFilter = (state: RootState) => state.todo.filter;

export default todoSlice.reducer;
