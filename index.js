const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const textRoutes = require('./src/routes/textRoute');
const loggerMiddleware = require('./src/middlewares/loggerMiddleware');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(loggerMiddleware);

app.use('/text', textRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
