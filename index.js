const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const textRoutes = require('./src/routes/textRoute');
const imageRoutes = require('./src/routes/imageRoute');
const loggerMiddleware = require('./src/middlewares/loggerMiddleware');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(loggerMiddleware);

app.use('/text', textRoutes);
app.use('/image', imageRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
