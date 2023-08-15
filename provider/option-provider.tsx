"use client"
import { createContext, useContext, useState } from "react"

const Context = createContext([{}, () => { }] as any);

export function OptionProvider({ children }: { children: React.ReactNode }) {
    const [option, setOption] = useState({
        OptionDaily: false,
        OptionHabit: false,
        OptionTodo: false
    })
    return (
        <Context.Provider value={[option, setOption]}>{children}</Context.Provider>
    )
}

export function useOptionContext() {
    return useContext(Context);
}