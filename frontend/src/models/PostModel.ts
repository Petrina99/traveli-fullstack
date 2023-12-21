import { CommentModel, LikeModel } from ".";

export interface PostModel {
    id?: number;
    title: string;
    date?: string;
    location: string;
    content: string;
    likes?: LikeModel[];
    authorId: number;
    comments?: CommentModel[];
}
