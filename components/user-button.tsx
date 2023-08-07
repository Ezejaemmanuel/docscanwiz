//app/page.tsx
"use client";
import { UserButton } from "@clerk/nextjs";
export default function UserButtonHere() {
    return (
        <div>
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}

