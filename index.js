const express = require('express');
const app = express();
const path = require('path');

console.log(process.env.DATABASE_URL);
app.use(require('morgan')('dev'));
app.use(express.json({ extended: false }));

app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/api/users', require('./routes/users'));

app.get('*', (req, res) =>
  res.sendFile(path.join(`${__dirname}/client/build/index.html`))
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
