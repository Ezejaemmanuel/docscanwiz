export async function POST(request: Request) {
    const data = await request.json()
    return NextResponse.json(data)
}
import { NextResponse } from 'next/server'

