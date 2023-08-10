
import { User } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { currentUser } from '@clerk/nextjs';

export async function confirmOrCreate() {
    const user = await currentUser();
    //console.log("User in confirmOrCreate: ", user);  // Log user value in confirmOrCreate
    if (!user) return null;
    const emailObj = user.emailAddresses[0].emailAddress ?? null;
    console.log("5...this the emailobj", emailObj);

    if (emailObj) {
        const emailStringified = JSON.stringify(emailObj);
        //const parsedEmail = JSON.parse(emailStringified);
        //const email = parsedEmail.address;
        console.log("Email stringing filed: ", emailStringified);  // Log email
        const username = user.username;
        if (username) {
            const user = await upsertUser(emailStringified, username);
            console.log("this is the final user after being added into the database", user);
            return user;
        } else {
            return null;
        }
    }
}

export async function upsertUser(email: string, username: string): Promise<User> {
    try {
        console.log("Upserting user with email: ", email, " and username: ", username);  // Log when upserting user
        const user = await prisma.user.upsert({
            where: { email: email },
            update: { username: username },
            create: { email: email, username: username },
        });
        console.log('User upserted successfully:', user);
        return user;
    } catch (error) {
        console.log('Error upserting user:', error);
        throw error;
    }
}
