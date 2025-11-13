import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './src/db/db.config.js';


dotenv.config();
console.log(process.env.PORT)

const startServer = async ()=>{
    await connectDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT , ()=>{
        console.log("Server is running ");
    })

    app.get('/', (req, res) => {
        res.send('API is running...')
    })
}

startServer();
