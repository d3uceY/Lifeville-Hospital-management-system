import { useContext, useState, useEffect } from "react";
import { socket } from "../sockets/Sockets";
import React from "react";

/* ============================
    context for sockets
   ============================ */
const SocketContext = React.createContext() //*

export const useSocket = () => {
    return useContext(SocketContext)
}

export function SocketContextProvider({ children }) {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

