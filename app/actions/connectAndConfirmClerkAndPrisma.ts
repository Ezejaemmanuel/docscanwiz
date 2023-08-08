import { User } from '@prisma/client';
import { prisma } from '../../lib/prisma';

export async function upsertUser(email: string, username: string): Promise<User> {
    try {
        const user = await prisma.user.upsert({
            where: { email },
            update: { username },
            create: { email, username },
        });
        console.log('User upserted successfully:', user);
        return user;
    } catch (error) {
        console.log('Error upserting user:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}
