import { NextResponse } from 'next/server'
import { User } from '@prisma/client';
import { prisma } from "./../../../lib/prisma";
import { currentUser } from '@clerk/nextjs';
export async function GET() {
    const fallbackUsername = 'Anonymous'
    const user = await currentUser();
    if (!user) return null;
    const emailObj = user.emailAddresses[0].emailAddress ?? null;
    console.log("5...this the emailobj", emailObj);

    if (emailObj) {
        const emailStringified = JSON.stringify(emailObj);
        console.log("Email stringified: ", emailStringified);
        const username = user.username || fallbackUsername;
        console.log("this is the user name the one that has as unknow as ", username);
        if (emailStringified) {
            try {
                console.log("Upserting user with email: ", emailStringified, " and username: ", username);
                const user = await prisma.user.upsert({
                    where: { email: emailStringified },
                    update: { username: username },
                    create: { email: emailStringified, username: username },
                });
                console.log('User upserted successfully:', user);
                console.log("this is the final user after being added into the database", user);
                return NextResponse.json(user);
            } catch (error) {
                console.log('Error upserting user:', error);
                return NextResponse.json({ error: "error upserting user" }, { status: 500 });


            }
        } else {
            return NextResponse.json({ error: "There is a problem somewhere" }, { status: 500 });

        }
    }
}
