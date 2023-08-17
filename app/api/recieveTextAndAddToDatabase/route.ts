//api/recieveTextAndAddToDatabase/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { currentUser } from "@clerk/nextjs";
export async function POST(request: Request) {
    const email = await currentUser().then(email => email?.emailAddresses[0].emailAddress);

    const data = await request.json();
    const { uuid, ocrResult } = data;
    if (!email) {
        return NextResponse.json({ error: "User not found and not authenticated" }, { status: 404 });

    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found from database" }, { status: 404 });

        }

        const content = await prisma.content.upsert({
            where: {
                uuid: uuid,
            },
            update: {
                quillData: ocrResult,
            },
            create: {
                quillData: ocrResult,
                uuid: uuid,
                userId: user.id,
            },
        });

        return NextResponse.json(content);
    } catch (error) {
        return NextResponse.json({ error: "something went wrong " }, { status: 500 });

    }
}
