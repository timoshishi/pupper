const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { clientOrigins } = require('./config/env.dev');

app.use(cors({ origin: clientOrigins }));
app.use(require('morgan')('dev'));
app.use(express.json({ extended: false }));

const apiRouter = express.Router();
const { messagesRouter } = require('./routes/messages/messages.router');
const { usersRouter } = require('./routes/users/users.router');

app.use('/api', apiRouter);
apiRouter.use('/messages', messagesRouter);
apiRouter.use('/users', usersRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.join(`${__dirname}/client/build/index.html`))
  );
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
