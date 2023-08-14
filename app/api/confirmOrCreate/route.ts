// import { NextResponse } from 'next/server'
// import { User } from '@prisma/client';
// import { prisma } from "./../../../lib/prisma";
// import { currentUser } from '@clerk/nextjs';
// export async function GET() {
//     const fallbackUsername = 'Anonymous'
//     const user = await currentUser();
//     if (!user) return null;
//     const emailObj = user.emailAddresses[0].emailAddress ?? null;
//     console.log("5...this the emailobj", emailObj);

//     if (emailObj) {
//         const emailStringified = JSON.stringify(emailObj);
//         console.log("Email stringified: ", emailStringified);
//         const username = user.username || fallbackUsername;
//         console.log("this is the user name the one that has as unknow as ", username);
//         if (emailStringified) {
//             try {
//                 console.log("Upserting user with email: ", emailStringified, " and username: ", username);
//                 const user = await prisma.user.upsert({
//                     where: { email: emailStringified },
//                     update: { username: username },
//                     create: { email: emailStringified, username: username },
//                 });
//                 console.log('User upserted successfully:', user);
//                 console.log("this is the final user after being added into the database", user);
//                 return NextResponse.json(user);
//             } catch (error) {
//                 console.log('Error upserting user:', error);
//                 return NextResponse.json({ error: "error upserting user" }, { status: 500 });


//             }
//         } else {
//             return NextResponse.json({ error: "There is a problem somewhere" }, { status: 500 });

//         }
//     }
// }
import { NextResponse } from 'next/server';
import { User } from '@prisma/client';
import { prisma } from './../../../lib/prisma';
import { currentUser } from '@clerk/nextjs';

async function upsertUser(email: string, username: string): Promise<User> {
    try {
        const user = await prisma.user.upsert({
            where: { email },
            update: { username },
            create: { email, username },
        });
        return user;
    } catch (error) {
        throw new Error('Error upserting user');
    }
}

export async function GET() {
    const fallbackUsername = 'Anonymous';
    const user = await currentUser();

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const emailObj = user.emailAddresses[0]?.emailAddress;

    if (!emailObj) {
        return NextResponse.json({ error: 'Email address not found' }, { status: 400 });
    }

    const emailStringified = JSON.stringify(emailObj);
    const username = user.username || fallbackUsername;

    try {
        const upsertedUser = await upsertUser(emailStringified, username);
        return NextResponse.json(upsertedUser);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
