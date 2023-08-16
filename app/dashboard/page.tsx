'use client'

import { InputForm } from "@/components/dashboard/input-form"
import { useEffect, useState } from "react"
import Image from 'next/image'
import Todos from "@/components/dashboard/todo/todos"
import Habits from "@/components/dashboard/habit/habits"

export default function Home() {
    const [todos, setTodos] = useState<{ id: string, name: string, check: boolean, userId: string }[]>([])
    const [habits, setHabits] = useState<{ id: string, name: string, up: number, down: number, userId: string }[]>([])

    const getTodos = async () => {
        try {
            const response = await fetch('/api/todo')
            const { todos } = await response.json()
            setTodos(todos)
        } catch (error) {
            console.error(error)
        }
    }

    const getHabits = async () => {
        try {
            const response = await fetch('/api/habit')
            const { habits } = await response.json()
            setHabits(habits)
        } catch (error) {
            console.error(error)
        }
    }

    const createTodo = async (name: string) => {
        try {
            await fetch('/api/todo', {
                method: 'POST',
                body: JSON.stringify({
                    name
                })
            })
        } catch (error) {
            console.error(error)
        } finally {
            getTodos()
        }
    }

    const updateTodo = async (id: string, check: boolean) => {
        try {
            await fetch('/api/todo', {
                method: 'PUT',
                body: JSON.stringify({
                    id,
                    check
                })
            })
        } catch (error) {
            console.error(error)
        } finally {
            getTodos()
        }
    }

    const deleteTodo = async (id: string) => {
        try {
            await fetch('/api/todo', {
                method: 'DELETE',
                body: JSON.stringify({
                    id
                })
            })
        } catch (error) {
            console.error(error)
        } finally {
            getTodos()
        }
    }

    const createHabit = async (name: string) => {
        try {
            await fetch('/api/habit', {
                method: 'POST',
                body: JSON.stringify({
                    name
                })
            })
        } catch (error) {
            console.error(error)
        } finally {
            getHabits()
        }
    }

    const updateHabit = async (id: string, type: "upvote" | "downvote") => {
        try {
            await fetch('/api/habit', {
                method: 'PUT',
                body: JSON.stringify({
                    id,
                    type
                })
            })
        } catch (error) {
            console.error(error)
        } finally {
            getHabits()
        }
    }

    const deleteHabit = async (id: string) => {
        try {
            await fetch('/api/habit', {
                method: 'DELETE',
                body: JSON.stringify({
                    id
                })
            })
        } catch (error) {
            console.error(error)
        } finally {
            getHabits()
        }
    }

    useEffect(() => {
        getTodos()
        getHabits()
    }, [])

    return (
        <div className="flex justify-between p-8">
            <div className="flex flex-col w-1/4 space-y-4 justify-between">
                <InputForm onSubmit={createTodo} placeholder="Todo" />
                <InputForm onSubmit={createHabit} placeholder="Habit" />
                <iframe
                    style={{ borderRadius: '12px' }}
                    // src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator&theme=0"
                    src="https://open.spotify.com/embed/playlist/37i9dQZF1DX5trt9i14X7j?utm_source=generator&theme=0"
                    width="150%"
                    height='380px'
                    allow="autoplay; 
                    clipboard-write;
                    encrypted-media; 
                    fullscreen; 
                    picture-in-picture"
                />
            </div>
            <div className="z-0 mx-auto">
                <Image
                    src="https://i.pinimg.com/originals/22/be/2d/22be2dc87badd5fd1959b4e2b28bf2e5.gif"
                    width={600}
                    height={600}
                    alt="gif"
                />
            </div>
            <div>
                <Todos todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
                <Habits habits={habits} updateHabit={updateHabit} deleteHabit={deleteHabit} />
            </div>
        </div>
    )
}