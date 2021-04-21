import express from 'express';
import cors from 'cors';

import connectDB from './utils/db';
import pinRoutes from './routes/pins';
import userRoutes from './routes/users';

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/pins', pinRoutes);
app.use('/api/users', userRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`server is listening  on port ${port}`));
