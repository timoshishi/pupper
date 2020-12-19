const express = require('express');
const app = express();
const path = require('path');

app.use(require('morgan')('dev'));
app.use(express.json({ extended: false }));

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api', async (req, res) => {
  try {
    res.json({ message: 'Hello world' });
  } catch (err) {
    console.error('Error at index.js /', err.message);
    res.json({ msg: err.message });
  }
});

app.get('*', (req, res) =>
  res.sendFile(path.join(`${__dirname}/client/build/index.html`))
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => `Server started on port: ${PORT}`);
