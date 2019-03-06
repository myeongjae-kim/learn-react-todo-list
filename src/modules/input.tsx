import { Record } from 'immutable';
import { createAction, ActionType, getType } from 'typesafe-actions';
import { handleActions } from 'redux-actions';

// Action
const SET_INPUT = 'input/SET_INPUT';
export const setInput = createAction(SET_INPUT, action => {
  return (value: string) => action({ value });
});

// State
export type TInputState = Record<{
  readonly value: string
}>;

// Initial State
const InputStateFactory = Record(
  { value: '' }
)

const initialState: TInputState = InputStateFactory();

function inputReducer(state: TInputState = initialState, action: ActionType<typeof setInput>): TInputState {
  switch (action.type) {
    case getType(setInput):
      return state.set('value', action.payload.value);
    default:
      return state;
  }
}

export default inputReducer;

/*
// Reducer
export default handleActions<TInputState>({
  [SET_INPUT]: (state, action): TInputState => {
    return state.set('value', action.payload);
  }
}, initialState)
*/