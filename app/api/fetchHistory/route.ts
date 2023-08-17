// pages/api/userContent.ts

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from "@clerk/nextjs";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get("limit")) || 5; // Default to 5 if limit is not provided

    const clerkEmail = await currentUser().then(email => email?.emailAddresses[0].emailAddress);

    if (!clerkEmail) {
        return NextResponse.json({ error: "User not found and not authenticated" }, { status: 404 });
    }

    try {
        const contents = await prisma.content.findMany({
            where: {
                user: {
                    email: clerkEmail,
                },
            },
            orderBy: {
                updatedAt: 'desc',
            },
            take: limit,
        });

        if (!contents) {
            return NextResponse.json({ error: `No content found for user ${clerkEmail}` }, { status: 404 });
        }

        return NextResponse.json(contents);
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
