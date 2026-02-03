import express from 'express';
import gameRoutes from './routes/game.routes.js';
const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('API is running...');
});

app.use('/game', gameRoutes);
export default app;