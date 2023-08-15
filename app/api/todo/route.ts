import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from 'next/server'

const url = process.env.GRAFBASE_API_URL || ''
const key = process.env.GRAFBASE_API_KEY || ''

export async function GET(req: NextRequest) {
    const { userId } = getAuth(req);
    const query = `
    query TodoCollection {
        todoCollection(first: 10) {
            edges {
                node {
                    name
                    check
                    id
                    userId
                }
            }
        }
    }`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'x-api-key': key,
        },
        body: JSON.stringify({
            query
        })
    })
    const { data: { todoCollection: edges } } = await response.json()
    const todos = edges.edges.map((item: { node: object }) => item.node).filter((item: { userId: string }) => item.userId == userId)

    // console.log(todos)
    return NextResponse.json({ todos })
}


export async function POST(req: NextRequest) {
    const mutation = `
    mutation TodoCreate(
        $name: String!
        $userId: String!
    ) {
        todoCreate(
            input: {
                name: $name
                userId: $userId
            }
        ) {
        todo {
            name
            id
            check
        }
        }
    }
    `

    const { name } = await req.json()
    const { userId } = getAuth(req)

    // console.log(name, userId)
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    if (!userId) return NextResponse.json({ error: 'User is required' }, { status: 400 })
    const data = await fetch(url, {
        method: 'POST',
        headers: {
            'x-api-key': key,
        },
        body: JSON.stringify({
            query: mutation,
            variables: {
                name,
                userId
            }
        })
    })
    const { data: { todoCreate: { todo } } } = await data.json()
    // console.log(todo)

    return NextResponse.json({ data: { name, userId, todo } })
}

export async function PUT(req: NextRequest) {
    const mutation = `
    mutation TodoUpdate(
        $id: ID!
        $check: Boolean
    ) {
        todoUpdate(
            by: { id: $id }
            input: { check: $check }
        ) {
        todo {
            name
            check
            }
        }
    }
    `
    const { id, check } = await req.json()
    // console.log(id, check)
    if (!id) return NextResponse.json({ error: 'Id is required' }, { status: 400 })
    if (check == undefined) return NextResponse.json({ error: 'Check is required' }, { status: 400 })
    const data = await fetch(url, {
        method: 'POST',
        headers: {
            'x-api-key': key,
        },
        body: JSON.stringify({
            query: mutation,
            variables: {
                id,
                check
            }
        })
    })
    const { data: { todoUpdate: { todo } } } = await data.json()
    // console.log(todo)

    return NextResponse.json({ data: { todo } })
}

export async function DELETE(req: NextRequest) {
    const mutation = `
    mutation TodoDelete($id: ID!) {
        todoDelete(by: { id: $id }) {
            deletedId
        }
    }
    `
    const { id } = await req.json()
    // console.log(id)
    if (!id) return NextResponse.json({ error: 'Id is required' }, { status: 400 })
    const data = await fetch(url, {
        method: 'POST',
        headers: {
            'x-api-key': key,
        },
        body: JSON.stringify({
            query: mutation,
            variables: {
                id
            }
        })
    })
    const { data: { todoDelete: { deletedId } } } = await data.json()
    // console.log(deletedId)
    return NextResponse.json({ deletedId })
}