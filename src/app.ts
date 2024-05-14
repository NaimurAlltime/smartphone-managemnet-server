import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import { AuthRoutes } from './app/modules/Auth/auth.route';
import { SmartphoneRoutes } from './app/modules/smartphone/smartphone.route';
import { SaleRoutes } from './app/modules/Sales/sales.route';

const app: Application = express();

// parser
app.use(express.json());
app.use(
  cors({
    origin: [
      'https://smartphone-management-client-side.netlify.app',
      'http://localhost:5173',
    ],
    credentials: true,
  }),
);

// application routes
app.use('/api/smartphones', SmartphoneRoutes);
app.use('/api/auth', UserRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/sales', SaleRoutes);

//testing
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running...');
});

// notfound api
app.use(notFound);

// global error handler middleware
app.use(globalErrorHandler);

export default app;
