const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const app = express()
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(bodyParser.json());

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');

app.use('/api/users',userRoutes)
app.use('/api/expenses',expenseRoutes)

const PORT = process.env.PORT || 3000;
console.log(PORT)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));