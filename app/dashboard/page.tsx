'use client'

import { useEffect, useState } from "react"

export default function Home() {
    const [todos, setTodos] = useState<{ id: string, name: string, check: boolean, userId: string }[]>([])
    const [name, setName] = useState('')

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
        <main >
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={() => createTodo(name)}>Create Todo</button>
            <ul>
                {todos && todos.map((todo) => (
                    <li key={todo.id}
                        onDoubleClick={() => { deleteTodo(todo.id) }}
                    >{todo.name} - {todo.id} |
                        <input type="checkbox" checked={todo.check} onChange={() => { updateTodo(todo.id, !todo.check) }} />
                    </li>
                ))}
            </ul>
        </main>
    )
}