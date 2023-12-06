export interface PostModel {
    id: number;
    title: string;
    date: string;
    location: string;
    content: string;
    user: string;
    likes: number;
    authorId: number;
    comments: number;
}
