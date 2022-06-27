import React, { useContext, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
}
