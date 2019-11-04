const express = require('express');

const corte = require('../components/corte/network');

const routes = (server) => {
    server.use('/corte', corte);
};

module.exports = routes;