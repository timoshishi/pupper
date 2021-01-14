const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { clientOrigins } = require('./config/env.dev');
const bodyParser = require('body-parser');

app.use(cors({ origin: clientOrigins }));
app.use(require('morgan')('dev'));
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

const apiRouter = express.Router();
const {
  dogsRouter,
  usersRouter,
  chatRouter,
  interestsRouter,
} = require('./routes/index.js');

app.use('/api', apiRouter);
apiRouter.use('/chat', chatRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/dogs', dogsRouter);
apiRouter.use('/interests', interestsRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.join(`${__dirname}/client/build/index.html`))
  );
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
