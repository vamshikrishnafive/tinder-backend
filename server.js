import  express from 'express';
import mongoose from "mongoose";
import cors from 'cors';

import Cards from './dbCards.js'

//App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://admin:eo2J05jkhvQhQ2yF@cluster0.lfd2u.mongodb.net/tinderDB?retryWrites=true&w=majority'

//middleware
app.use(express.json());
app.use(cors());

//DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

//API Endpoints
app.get('/', (req, res) => {
    res.status(200).send("Hello !!")
})

app.post('/tinder/cards', (req, res) => {
    const dbCaad = req.body;
    
    Cards.create(dbCaad, (error, data) => {
        if(error) {
            res.status(500).send(error.message)
        } else {
            res.status(200).send(data)
        }
    })
})

app.get('/tinder/cards', (req, res) => {

    Cards.find((error, data) => {
        if(error) {
            res.status(500).send(error.message)
        } else {
            res.status(200).send(data)
        }
    })
})

//listener
app.listen(port, () => console.log(`Listening on port: ${port}`));


//password: eo2J05jkhvQhQ2yF