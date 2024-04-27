const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors"); // Import the cors package
const bodyParser = require('body-parser');
const path = require('path');

const masterAdminRoutes = require('./routes/MasterAdminRout');
const apiRoutes = require('./routes/FranchiseRoutes');
const stateRoutes = require('./routes/StateRoutes');
const cityRoutes = require('./routes/CityRoutes');
const areaRoutes = require('./routes/AreaRoutes');

const app = express();

app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
app.use('/api', masterAdminRoutes);

app.use('/api', apiRoutes);
app.use('/api', stateRoutes); 
app.use('/api', cityRoutes);
app.use('/api', areaRoutes);

const PORT =  5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
