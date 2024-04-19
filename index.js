import connectToMongo from './database/db.js';
import express from 'express';
import auth from './routes/auth.js'
import cors from 'cors'
    
connectToMongo();
const app = express()
app.use(express.json());

app.use(cors());
const port = 4000

app.use('/api/auth', auth)
    
app.get('/', (req, res) => {
    res.send('GDSC NMIT')
})

app.get('/login', (req, res) => {
    res.send('GDSC NMIT')
})

app.get('/singup', (req, res) => {
    res.send('GDSC NMIT')
})
    
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})