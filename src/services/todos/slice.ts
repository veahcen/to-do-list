import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";
import { IInitialStateTodos, LoadingStatus } from "../../types/types";

export const initialState: IInitialStateTodos = {
  todos: [],
  isLoadindStatus: LoadingStatus.idle,
  todoFilter: 'all'
}

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/todos");
    }
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodos: (state) => {
      state.todos = state.todos.filter(item => !item.inTrash);
    },
    allTodosToTrash: (state) => {
      state.todos = state.todos.map(item => {
        return {...item, inTrash: true}
      });
    },
    changeFilter: (state, action) => {
      state.todoFilter = action.payload;
    },
    toggleTodoComplited: (state, action) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    toggleTodoInTrash: (state, action) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.inTrash = !todo.inTrash;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, state => {state.isLoadindStatus = LoadingStatus.loading})
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoadindStatus = LoadingStatus.idle;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, state => {state.isLoadindStatus = LoadingStatus.error})
  }
});

const {actions, reducer} = todoSlice;

export default reducer;
export const {
    addTodo,
    deleteTodos,
    changeFilter,
    toggleTodoComplited,
    toggleTodoInTrash,
    allTodosToTrash
} = actions;