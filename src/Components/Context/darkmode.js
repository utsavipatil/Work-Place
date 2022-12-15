import { createContext, useReducer } from "react";
export const DarkModeContext = createContext();

const initialStage = {
  darkMode: JSON.parse(localStorage.getItem("mode")) || false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Make_dark":
        localStorage.setItem('mode', true);
      return {
        darkMode: true,
      };
    case "Make_light":
        localStorage.setItem('mode' , false);
      return {
        darkMode: false,
      };

    default:
      throw new Error();
  }
};

export const DarkModeContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialStage);
  return (
    <DarkModeContext.Provider value={[state, dispatch]}>
      {props.children}
    </DarkModeContext.Provider>
  );
};
