const express = require('express');
const router = express.Router(); // express has its on internal router. We are using express internal ability to chain routers together.

// /api/movies
//dont mean: http://localhost:3000/tickets <<<<- does not exist
router.use('/tickets', require('./api/ticketRoutes')); // calls tickets file.

router.use('/priority', require('./api/priorityRoutes'));

router.use('/notes', require('./api/noteRoutes'));

router.use('/status', require('./api/statusRoutes'));

router.use('/files', require('./api/fileRoutes'));

router.use('/details', require('./api/serviceDetailsRoutes'));

router.use('/departments', require('./api/departmentRoutes'));

router.use('/details', require('./api/serviceDetailsRoutes'));

router.use('/service', require('./api/serviceRoutes'));

router.use('/location', require('./api/locationRoutes'));

router.use('/users', require('./api/userRoutes'));

router.use('/agents', require('./api/agentRoutes'));
//it allows us to add in additional routes on the api. We created a system in which all routes will be pre-fixed with /api. We have the ability to create additional endpoints.

module.exports = router;
