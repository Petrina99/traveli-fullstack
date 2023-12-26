import { usePostStore } from "@/store"

export const AdminDashboard = () => {

    const posts = usePostStore((state) => state.posts)

    return (
        <>
        </>
    )
}