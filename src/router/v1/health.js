const { Router } = require('express');
const router = Router();
const healthController = require('../../controller/api/v1/healthController.js');

router.get('/self', healthController.self);

// Add more routes here if needed
router.get('/health', healthController.health);

module.exports = router;
