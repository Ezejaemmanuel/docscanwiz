// import { User } from '@prisma/client';
// import { prisma } from '../../lib/prisma';
// import { currentUser } from '@clerk/nextjs';

// export async function confirmOrCreate() {
//     const user = await currentUser();
//     if (!user) return null;
//     const emailArray = user?.emailAddresses[0];
//     const email = emailArray.toString();
//     const usernamer = user?.username;
//     const username = emailArray.toString();
//     await upsertUser(email, username);
// }

// export async function upsertUser(emailAddresses: string, username: string): Promise<User> {
//     try {
//         const email = emailAddresses[0]; // Assuming you want to use the first email address in the array
//         const user = await prisma.user.upsert({
//             where: { email },
//             update: { username },
//             create: { email, username },
//         });
//         console.log('User upserted successfully:', user);
//         return user;
//     } catch (error) {
//         console.log('Error upserting user:', error);
//         throw error;
//     } finally {
//         await prisma.$disconnect();
//     }
// }
import { User } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { currentUser } from '@clerk/nextjs';

export async function confirmOrCreate() {
    const user = await currentUser();
    if (!user) return null;
    const emailObj = user.emailAddresses[0] ?? null;  // Retrieves first email address from the array
    if (emailObj) {
        const emailStringified = JSON.stringify(emailObj);
        const parsedEmail = JSON.parse(emailStringified);
        const email = parsedEmail.address;
        console.log("this is that crazy email", email, emailStringified, parsedEmail);
        const username = user.username;
        if (username) {
            await upsertUser(email, username);
        }
    }
}

export async function upsertUser(email: string, username: string): Promise<User> {
    try {
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
