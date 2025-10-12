
const app = require('./server');
const videoRoutes = require('./routes/videoRoutes')


app.get('/heartbeat', (req, res) => {
  res.json({ status: 'ok' });
});


// TODO: implement the base route for the APIs
app.use('/rocked/v1', videoRoutes);
