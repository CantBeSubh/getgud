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

        <li>
            <a onClick={() => updateTodo(todo.id, !todo.check)}>{todo.name}</a>
            <span onClick={() => deleteTodo(todo.id)} className="X">X</span>
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
                className="todo"

            >
                <ul className="pt-5">
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

export default Todos