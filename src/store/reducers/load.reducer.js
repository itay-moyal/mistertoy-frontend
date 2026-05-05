const initialState = {
  isLoading: false,
}

export const SET_IS_LOADING = 'SET_IS_LOADING'

export function loadReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: cmd.isLoading }
  }
}
