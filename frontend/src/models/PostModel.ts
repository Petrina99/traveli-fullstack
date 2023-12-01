export interface PostModel {
    id: string;
    title: string;
    date: string;
    location: string;
    content: string;
    user: string;
    likes: number;
    comments: number;
}