import express, { request } from 'express';
import cors from "cors";
import gameRouter from './routes/game.mjs';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/api', gameRouter);
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index', { title: 'Shiritori' });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

 