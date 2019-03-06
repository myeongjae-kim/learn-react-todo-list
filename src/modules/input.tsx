import { Record } from 'immutable';
import { createAction, ActionType, getType } from 'typesafe-actions';

// Action
const SET_INPUT = 'input/SET_INPUT';
export const setInput = createAction(SET_INPUT, action => {
  return (value: string) => action({ value });
});

// State
export type TInputState = Record<{
  readonly value: string
}>;

export type TInputActions = ActionType<typeof setInput>

// Initial State
const InputStateFactory = Record(
  { value: '' }
)

const initialState: TInputState = InputStateFactory();

// Reducer
function inputReducer(
  state: TInputState = initialState,
  action: TInputActions
): TInputState {
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