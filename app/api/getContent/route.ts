//this is the api/getContent/[uuid]/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from "@clerk/nextjs";

export async function GET(request: NextRequest) {
    //const uuid =  request.nextUrl.searchParams.get("uuid");
    const url = new URL(request.url);
    const uuid = url.searchParams.get("uuid");

    const email = await currentUser().then(email => email?.emailAddresses[0].emailAddress);
    if (!uuid) {
        return NextResponse.json({ error: "uuid not found" }, { status: 404 });

    }


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
            return NextResponse.json({ error: `User ${email} not found from database ` }, { status: 404 });
        }

        const content = await prisma.content.findUnique({
            where: {
                uuid: uuid,
            },
        });

        if (!content) {
            return NextResponse.json({ error: `Content not found for the provided UUID the uuid is ${uuid}` }, { status: 404 });
        }

        return NextResponse.json(content);
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
