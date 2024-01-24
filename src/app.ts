import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// application routes

//testing
app.get('/', (req: Request, res: Response) => {
  res.send('server in running');
});

export default app;
