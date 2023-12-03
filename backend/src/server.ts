import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

import { 
  commentRouter, 
  postRouter, 
  userRouter 
} from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

// express.json() and express.urlencoded() for parsing body of a request as json
// we get {"username": "John"} instead of {}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/api/posts', postRouter)
app.use('/api/users', userRouter)
app.use('/api/comments', commentRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});