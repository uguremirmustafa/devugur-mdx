import React, { createContext, useReducer, Dispatch } from 'react';
import { muteReducer, SoundActions, SoundType } from './Reducers';

type InitialStateType = {
  sound: SoundType;
};

const initialState = {
  sound: {
    soundEnabled: true,
    volume: 0.25,
  },
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<SoundActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ sound }: InitialStateType, action: SoundActions) => ({
  sound: muteReducer(sound, action),
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
