import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

app.use(cors(corsOptions))

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
})

app.get('/', (req, res) => {
    res.send('API is running...')
})



import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

export default app