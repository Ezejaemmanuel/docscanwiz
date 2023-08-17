import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { currentUser } from "@clerk/nextjs";

export async function GET(context: { params: { uuid: string } }) {
    const email = await currentUser().then(email => email?.emailAddresses[0].emailAddress);
    const { uuid } = context.params;



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

        const content = await prisma.content.findUnique({
            where: {
                uuid: uuid,
            },
        });

        if (!content) {
            return NextResponse.json({ error: "Content not found for the provided UUID" }, { status: 404 });
        }

        return NextResponse.json(content);
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
