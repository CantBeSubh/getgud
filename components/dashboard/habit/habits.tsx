"use client"
import { useOptionContext } from "@/provider/option-provider";
import { useState } from "react";
import './habits.css'
import { ArrowDown, ArrowUp } from "lucide-react";

type Habit = {
    id: string;
    name: string;
    up: number;
    down: number;
}

type HabitsProps = {
    habits: Habit[];
    updateHabit: (id: string, type: "upvote" | "downvote") => void,
    deleteHabit: (id: string) => void
}

type HabitItemProps = {
    habit: Habit,
    updateHabit: (id: string, type: "upvote" | "downvote") => void,
    deleteHabit: (id: string) => void
}

const HabitItem = ({ habit, updateHabit, deleteHabit }: HabitItemProps) => {
    const handleUp = () => {
        updateHabit(habit.id, "upvote")
    }
    const handleDown = () => {
        updateHabit(habit.id, "downvote")
    }
    const handleDel = () => {
        deleteHabit(habit.id)
    }

    return (
        <li>
            <span>
                <i onClick={handleUp} >
                    <ArrowUp size={20} className="mr-2" />
                </i>
                <span>{habit.up} </span>
            </span>
            <a onClick={handleDel}> {habit.name} </a>
            <span>
                <span> -{habit.down}</span>
                <i onClick={handleDown} >
                    <ArrowDown size={20} className="ml-2" />
                </i>
            </span>
        </li>
    )

}



const Habits = ({ habits, updateHabit, deleteHabit }: HabitsProps) => {

    const [option, setOption] = useOptionContext();

    return (
        <>
            <input
                className="habit-icon"
                type="checkbox"
                id="habit-icon"
                name="habit-icon"
                checked={option.OptionHabit}
                onChange={() => setOption({
                    OptionDaily: false,
                    OptionHabit: !option.OptionHabit,
                    OptionTodo: false
                })}
            />
            <label htmlFor="habit-icon" />
            <span className='tooltipH'>
                Habits
            </span>
            <div className="habit">
                <ul className="pt-5">
                    <h1 className="mb-4 text-4xl text-gray-300">HABITS</h1>
                    {habits?.map(habit => {

                        return (
                            <HabitItem
                                key={habit.id}
                                habit={habit}
                                updateHabit={updateHabit}
                                deleteHabit={deleteHabit}
                            />
                        )
                    }
                    )}
                </ul>
            </div>
        </>
    )
}

export default Habits