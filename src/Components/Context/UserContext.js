import React, { useReducer, createContext } from "react";

export const UserContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  userinfo: JSON.parse(localStorage.getItem('userinfo')) || null
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      localStorage.setItem('user', JSON.stringify(action.payload))
      return {
        user: action.payload,
      };
    case "SET_USER_INFO":
      localStorage.setItem('userinfo', JSON.stringify(action.payload))
      return {
        ...state,
        userinfo: action.payload,
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};