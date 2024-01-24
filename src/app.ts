import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// application routes
app.use('/api/auth', UserRoutes);

//testing
app.get('/', (req: Request, res: Response) => {
  res.send('server in running');
});

// notfound api
app.use(notFound);

// global error handler middleware
app.use(globalErrorHandler);

export default app;
