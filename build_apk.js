const fs = require('fs');
const https = require('https');
const path = require('path');

const postData = JSON.stringify({
  host: "https://alokjha476.github.io/Kids-learning-app",
  name: "Magic Kids Learning",
  shortName: "KidsLearning",
  themeColor: "#2563eb",
  navColor: "#2563eb",
  backgroundColor: "#f0fdf4",
  startUrl: "/",
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3426/3426653.png",
  maskableIconUrl: "https://cdn-icons-png.flaticon.com/512/3426/3426653.png",
  appVersion: "1.0.0",
  appVersionCode: 1,
  packageId: "com.alokjha476.kidslearning",
  signingMode: "new",
  includeSourceCode: false
});

const req = https.request('https://pwabuilder-google-play.azurewebsites.net/generateAppPackage', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
}, (res) => {
  console.log('StatusCode:', res.statusCode);
  if (res.statusCode === 200) {
    const zipPath = path.join(__dirname, 'android_app.zip');
    const fileStream = fs.createWriteStream(zipPath);
    res.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log('Successfully downloaded android_app.zip!');
    });
  } else {
    let errData = '';
    res.on('data', chunk => errData += chunk);
    res.on('end', () => console.error('API Error:', errData));
  }
});

req.on('error', (e) => console.error('Req error:', e));
req.write(postData);
req.end();
