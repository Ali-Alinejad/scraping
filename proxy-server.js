const express = require('express');
const axios = require('axios');
const cors = require('cors');  // اضافه کردن پکیج cors

const app = express();
const port = 5000;

// فعال کردن CORS برای تمامی درخواست‌ها
app.use(cors());

// مسیری برای ارسال درخواست به سایت tgju.org
app.get('/proxy', async (req, res) => {
  try {
    const response = await axios.get('https://www.tgju.org');
    res.send(response.data); // ارسال داده‌های دریافتی از سایت به فرانت‌اند
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

// شروع سرور پروکسی
app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
