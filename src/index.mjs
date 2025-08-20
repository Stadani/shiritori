import express, { request } from 'express';
import cors from "cors";
import gameRouter from './routes/game.mjs';

const app = express();
app.use(express.json());
app.use(cors());

app.use(gameRouter);
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

const PORT = process.env.PORT || 3000;


// const loggingMiddleware = (request, response, next) => {
//     console.log(`${request.method} ${request.url}`);
//     next();
// };
// app.use(loggingMiddleware);

// app.get('/', loggingMiddleware, (request, response)=> {
//     response.send('Hello, World!');
// });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

 