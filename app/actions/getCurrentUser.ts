import { currentUser } from '@clerk/nextjs';

export default async function getCurrentUser() {
    const user = await currentUser();
    if (!user) return null;
    return user;
}
