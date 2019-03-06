import input, { TInputState } from './input'
import todos, { TTodosState } from './todos'
import { combineReducers } from 'redux';

export interface TCombinedStates {
  input: TInputState
  todos: TTodosState
}

export default combineReducers<TCombinedStates>({
  input,
  todos
})