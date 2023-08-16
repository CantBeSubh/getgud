"use client"
import { useOptionContext } from "@/provider/option-provider";
import { useState } from "react";
import './todos.css'

type Habit = {
    id: string;
    name: string;
    up: number;
    down: number;
}

type HabitsProps = {
    todos: Habit[];
    updateTodo: (id: string, check: boolean) => void;
    deleteTodo: (id: string) => void;
}

const HabitItem = (
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



const Habits = ({ todos, updateTodo, deleteTodo }: HabitsProps) => {

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
                    <h1 className="mb-4 text-4xl">TODOS</h1>

                    <button
                        className={`btn ${active === 'due' ? 'me' : ''}`}
                        onClick={() => {
                            setActive('due')
                            setShowDue(true)
                        }}
                    >Due</button>
                    <button
                        className={`btn ${active === 'done' ? 'me' : ''}`}
                        onClick={() => {
                            setActive('done')
                            setShowDue(false)
                        }}
                    >Done</button>
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