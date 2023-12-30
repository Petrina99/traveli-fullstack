import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { errorHandler } from './middleware/errorMiddleware'
import { createClient } from '@supabase/supabase-js'
import multer from 'multer'

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage })

import { 
    commentRouter, 
    postRouter, 
    userRouter,
    likeRouter 
} from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
const supabaseUrl = process.env.SUPABASE_URL || "none"
const supabaseKey = process.env.SUPABASE_KEY || "none"


export const supabase = createClient(supabaseUrl, supabaseKey)


// express.json() and express.urlencoded() for parsing body of a request as json
// we get {"username": "John"} instead of {}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/api/posts', postRouter)
app.use('/api/users', userRouter)
app.use('/api/comments', commentRouter)
app.use('/api/likes', likeRouter)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});