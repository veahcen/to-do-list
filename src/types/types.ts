export interface ITodoState {
  id: string,
  title: string,
  completed: boolean,
  inTrash: boolean
}

export enum LoadingStatus {
  loading = 'loading',
  idle = 'idle',
  error = 'error'
}

export interface IInitialStateTodos {
  todos: ITodoState[],
  isLoadindStatus: LoadingStatus,
  todoFilter: string
}