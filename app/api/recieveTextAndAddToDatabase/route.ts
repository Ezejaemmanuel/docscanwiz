
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const data = await request.json();
    const { email, id, ocrResult } = data;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });

        }

        const content = await prisma.content.upsert({
            where: {
                uuid: id,
            },
            update: {
                quillData: ocrResult,
            },
            create: {
                quillData: ocrResult,
                uuid: id,
                userId: user.id,
            },
        });

        return NextResponse.json(content);
    } catch (error) {
        return NextResponse.json({ error: "something went wrong " }, { status: 500 });

    }
}
