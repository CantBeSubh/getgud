"use client"
import { cn } from "@/lib/utils";
import { useOptionContext } from "@/provider/option-provider";
import { useState } from "react";
import './todos.css'

type Todo = {
    id: string;
    name: string;
    check: boolean;
}

type TodosProps = {
    todos: Todo[];
    updateTodo: (id: string, check: boolean) => void;
    deleteTodo: (id: string) => void;
}

const TodoItem = (
    { todo, updateTodo, deleteTodo }:
        {
            todo: Todo,
            updateTodo: (id: string, check: boolean) => void,
            deleteTodo: (id: string) => void
        }) => {
    return (

        <li
            className={`
                relative block w-full p-0 mx-[10px] my-0 text-center list-none pointer-events-none 
                opacity-0 translate-y-[30px] transition-all duration-200
            `}
        >
            <span
                onClick={() => updateTodo(todo.id, !todo.check)}
                className={`
                font-sans font-bold text-2xl uppercase inline-block relative text-[#eceece] transition-all 
                duration-200 hover:text-[#c4c3ca] cursor-pointer
                after:block after:absolute after:top-1/2 after:content-none after:h-[0.5vh] 
                after:mt-[-0.5vh] after:w-0 after:l-0 after:bg-[#353746] after:opacity-80 after:transition-width after:duration-200
                after:hover:w-full
                `}
            >{todo.name}</span>
            <span onClick={() => deleteTodo(todo.id)}>X</span>
        </li>
    )

}



const Todos = ({ todos, updateTodo, deleteTodo }: TodosProps) => {

    const [option, setOption] = useOptionContext();
    const [showDue, setShowDue] = useState(true);
    const [active, setActive] = useState<"due" | "done">('due');

    return (
        <>
            <input
                className="todo-icon"
                type="checkbox"
                id="todo-icon"
                name="todo-icon"
                checked={option.OptionTodo}
                onChange={() => setOption({
                    OptionDaily: false,
                    OptionHabit: false,
                    OptionTodo: !option.OptionTodo
                })}
            />
            <label htmlFor="todo-icon" />
            <span className='tooltipT'>
                Todos
            </span>
            <div
                className={`
                    backdrop-blur-lg fixed top-[90px] right-[165px] block
                    w-[50px] h-[50px] p-0 m-0 z-10 overflow-hidden
                `}
                style={{
                    transition: `
                        top 350ms 1100ms cubic-bezier(0.23, 1, 0.32, 1),
                        right 350ms 1100ms cubic-bezier(0.23, 1, 0.32, 1),
                        transform 250ms 1100ms ease,
                        width 650ms 400ms cubic-bezier(0.23, 1, 0.32, 1),
                        height 650ms 400ms cubic-bezier(0.23, 1, 0.32, 1),
                        background-color 750ms 1000ms cubic-bezier(0.23, 1, 0.32, 1);
                    `
                }}
            >
                <ul className={`
                    absolute top-1/2 left-0 block w-full
                    p-0 m-0 z-5 text-center
                `}
                    style={{
                        transform: 'translateY(-50%)',
                        listStyle: 'none',
                    }}
                >
                    <h1>TODOS</h1>

                    <div
                        className={cn(`
                            w-[70px] px-[4px] py-0 mx-0 my-[2px] bg-[#1f2029]
                            rounded-sm text-[#c4c3ca] decoration-transparent border-2 border-[#313342]
                        `,
                            active == "due" && `text-white border-white translate-y-1`
                        )}
                        onClick={() => {
                            setActive('due')
                            setShowDue(true)
                        }}
                    >Due</div>
                    <div
                        className={cn(`
                        w-[70px] px-[4px] py-0 mx-0 my-[2px] bg-[#1f2029]
                        rounded-sm text-[#c4c3ca] decoration-transparent border-2 border-[#313342]
                    `,
                            active == "done" && `text-white border-white translate-y-1`
                        )}
                        onClick={() => {
                            setActive('done')
                            setShowDue(false)
                        }}
                    >Done</div>
                    {todos?.map(todo => {
                        if (showDue && !todo.check) {
                            return (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    updateTodo={updateTodo}
                                    deleteTodo={deleteTodo}
                                />
                            )
                        }
                        else if (!showDue && todo.check) {
                            return (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    updateTodo={updateTodo}
                                    deleteTodo={deleteTodo}
                                />
                            )
                        }
                    })}
                </ul>
            </div>
        </>
    )
}
