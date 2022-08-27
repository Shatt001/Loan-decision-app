'use strict';

require('dotenv').config()
const express = require('express');

const PORT = process.env.API_PORT
const HOST = process.env.API_HOST

const srv = express();

srv.listen(PORT, () => {
  console.log(`Server platform: ${process.platform} Running on http://${HOST}:${PORT}`);
});

exports.srv = srv;