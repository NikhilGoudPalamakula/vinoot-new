const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors"); // Import the cors package
const bodyParser = require('body-parser');
const path = require('path');

const dotenv = require('dotenv'); 
dotenv.config({ path: 'config/.env' });

const masterAdminRoutes = require('./routes/MasterAdminRout');
const apiRoutes = require('./routes/FranchiseRoutes');
const stateRoutes = require('./routes/StateRoutes');
const cityRoutes = require('./routes/CityRoutes');
const areaRoutes = require('./routes/AreaRoutes');
const treatmentCategoryRoutes = require('./routes/TreatmentcategoryRoutes');
const treatmentPlanRoutes = require('./routes/TreatmentplanRoutes');
const patientdetails = require('./routes/PatientdetailsRoutes')
const billing = require('./routes/BillingRoute')


const app = express();

app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
app.use('/api', masterAdminRoutes);

app.use('/api', apiRoutes);


// Master data 
// Mount the treatment category routes
app.use("/api", treatmentCategoryRoutes);

// Mount the treatment plan routes
app.use("/api", treatmentPlanRoutes);

app.use('/api', stateRoutes); 
app.use('/api', cityRoutes);
app.use('/api', areaRoutes);

// --------------
app.use('/api', patientdetails);
app.use('/api', billing);


const PORT =  5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
