import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from 'next/server'

const url = process.env.GRAFBASE_API_URL || ''
const key = process.env.GRAFBASE_API_KEY || ''

export async function GET(req: NextRequest) {
    const { userId } = getAuth(req);
    const query = `
    query DailyCollection {
        dailyCollection(first: 10) {
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
    const { data: { dailyCollection: edges } } = await response.json()
    const dailys = edges.edges.map((item: { node: object }) => item.node).filter((item: { userId: string }) => item.userId == userId)

    // console.log(dailys)
    return NextResponse.json({ dailys })
}


export async function POST(req: NextRequest) {
    const mutation = `
    mutation DailyCreate(
        $name: String!
        $userId: String!
    ) {
        dailyCreate(
            input: {
                name: $name
                userId: $userId
            }
        ) {
        daily {
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
    const { data: { dailyCreate: { daily } } } = await data.json()
    // console.log(daily)

    return NextResponse.json({ data: { name, userId, daily } })
}

export async function PUT(req: NextRequest) {
    const mutation = `
    mutation DailyUpdate(
        $id: ID!
        $check: Boolean
    ) {
        dailyUpdate(
            by: { id: $id }
            input: { check: $check }
        ) {
        daily {
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
    const { data: { dailyUpdate: { daily } } } = await data.json()
    // console.log(daily)

    return NextResponse.json({ data: { daily } })
}

export async function DELETE(req: NextRequest) {
    const mutation = `
    mutation DailyDelete($id: ID!) {
        dailyDelete(by: { id: $id }) {
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
    const { data: { dailyDelete: { deletedId } } } = await data.json()
    // console.log(deletedId)
    return NextResponse.json({ deletedId })
}