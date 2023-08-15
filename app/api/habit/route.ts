import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from 'next/server'

const url = process.env.GRAFBASE_API_URL || ''
const key = process.env.GRAFBASE_API_KEY || ''

export async function GET(req: NextRequest) {
    const { userId } = getAuth(req);
    const query = `
    query HabitCollection {
        habitCollection(first: 10) {
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
    const { data: { habitCollection: edges } } = await response.json()
    const habits = edges.edges
        .map((item: { node: object }) => item.node)
        .filter((item: { userId: string }) => item.userId == userId)

    // console.log(habits)
    return NextResponse.json({ habits })
}


export async function POST(req: NextRequest) {
    const mutation = `
    mutation HabitCreate(
        $name: String!
        $userId: String!
    ) {
        habitCreate(
            input: {
                name: $name
                userId: $userId
            }
        ) {
        habit {
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
    const { data: { habitCreate: { habit } } } = await data.json()
    // console.log(habit)

    return NextResponse.json({ data: { name, userId, habit } })
}

export async function PUT(req: NextRequest) {
    const mutation = `
    mutation HabitUpdate(
        $id: ID!
        $check: Boolean
    ) {
        habitUpdate(
            by: { id: $id }
            input: { check: $check }
        ) {
        habit {
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
    const { data: { habitUpdate: { habit } } } = await data.json()
    // console.log(habit)

    return NextResponse.json({ data: { habit } })
}

export async function DELETE(req: NextRequest) {
    const mutation = `
    mutation HabitDelete($id: ID!) {
        habitDelete(by: { id: $id }) {
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
    const { data: { habitDelete: { deletedId } } } = await data.json()
    // console.log(deletedId)
    return NextResponse.json({ deletedId })
}