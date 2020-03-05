const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const adminRoutes = require('./routes')
app.use(bodyParser.urlencoded({ extended: true })); 

app.set('view engine', 'pug');
app.set('views', './views');

app.use(adminRoutes);

app.listen(3000, () => {
    console.log('listening on port 3000');
});
