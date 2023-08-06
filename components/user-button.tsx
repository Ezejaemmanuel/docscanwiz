//app/page.tsx
import { UserButton } from "@clerk/nextjs";
export default function UserButtonHere() {
    return (
        <div>
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}
