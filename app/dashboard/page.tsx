'use client'

import { InputForm } from "@/components/dashboard/input-form"
import { useEffect, useState } from "react"
import Image from 'next/image'

export default function Home() {
    const [todos, setTodos] = useState<{ id: string, name: string, check: boolean, userId: string }[]>([])

    const getTodos = async () => {
        try {
            const response = await fetch('/api/todo')
            const { todos } = await response.json()
            setTodos(todos)
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

    useEffect(() => {
        getTodos()
    }, [])

    return (
        <main className="flex justify-between">
            <div className="flex flex-col w-1/4 space-y-4">
                <InputForm onSubmit={createTodo} placeholder="Todo" />
                <InputForm onSubmit={createTodo} placeholder="Habit" />
                <InputForm onSubmit={createTodo} placeholder="Daily" />
            </div>
            <div className="z-0 mx-auto">
                <Image
                    src="https://i.pinimg.com/originals/22/be/2d/22be2dc87badd5fd1959b4e2b28bf2e5.gif"
                    width={1080 / 2}
                    height={1080 / 2}
                    alt="gif"
                />
            </div>
            <div>

            </div>
        </main>
    )
}