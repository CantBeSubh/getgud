import { auth } from "@clerk/nextjs";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { userId } = auth()

    return (
        <>
            HELLO {userId}
            {children}
        </>
    )
}