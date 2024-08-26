import { createContext } from "react";

export const PlayerContext = createContext({
  isPlayer: false,
  allowPlayer: () => {},
  denyPlayer: () => {},
});
