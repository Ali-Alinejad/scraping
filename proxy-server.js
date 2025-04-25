const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

app.get('/proxy', async (req, res) => {
  try {
    const response = await axios.get('https://www.tgju.org');
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
