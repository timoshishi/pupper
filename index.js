const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { clientOrigins, serverPort } = require('./config/env.dev');

app.use(cors({ origin: clientOrigins }));
app.use(require('morgan')('dev'));
app.use(express.json({ extended: false }));

const apiRouter = express.Router();
const { messagesRouter } = require('./messages/messages.router');

app.use('/api', apiRouter);
apiRouter.use('/messages', messagesRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.use('/api/users', require('./routes/users'));

  app.get('*', (req, res) =>
    res.sendFile(path.join(`${__dirname}/client/build/index.html`))
  );
}
app.listen(serverPort, () =>
  console.log(`Server started on port: ${serverPort}`)
);
