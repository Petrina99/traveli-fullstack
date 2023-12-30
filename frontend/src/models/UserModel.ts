import { CommentModel, PostModel } from ".";

export interface UserModel {
    id?: number;
    email: string;
    username?: string;
    password: string;
    role?: string;
    posts?: PostModel[];
    comments?: CommentModel[]
    imageUrl?: string;
}