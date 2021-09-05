export enum Types {
  SoundOff = 'SOUND_OFF',
  SoundOn = 'SOUND_ON',
  levelOne = 'LEVEL_ONE',
  levelTwo = 'LEVEL_TWO',
  levelThree = 'LEVEL_THREE',
}
export enum Volumes {
  levelOne = 0.25,
  levelTwo = 0.5,
  levelThree = 1,
}

// Mute
export type SoundType = {
  soundEnabled: boolean;
  volume: Volumes;
};

export type SoundActions =
  | { type: 'SOUND_OFF' }
  | { type: 'SOUND_ON' }
  | { type: 'LEVEL_ONE' }
  | { type: 'LEVEL_TWO' }
  | { type: 'LEVEL_THREE' };

export const muteReducer = (state: SoundType, action: SoundActions) => {
  switch (action.type) {
    case Types.SoundOn:
      return {
        ...state,
        soundEnabled: false,
      };

    case Types.SoundOff:
      return {
        ...state,
        soundEnabled: true,
      };
    case Types.levelOne:
      return {
        ...state,
        volume: Volumes.levelOne,
      };
    case Types.levelTwo:
      return {
        ...state,
        volume: Volumes.levelTwo,
      };
    case Types.levelThree:
      return {
        ...state,
        volume: Volumes.levelThree,
      };

    default:
      return state;
  }
};
