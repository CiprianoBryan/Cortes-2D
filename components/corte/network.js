const express = require('express');
const response = require('../../network/response');
const resolveCut = require('./controller');
const router = express.Router();

router.post('/', async (req, res) => {
    const data = await resolveCut(req.body);
    try {
        response.success(req, res, '[response accepted]', 200)
    } catch(error) {
        response.error(req, res, error, 500, 'error');
    }
});

module.exports = router;