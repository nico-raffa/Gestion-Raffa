import express from 'express'
import { exec } from 'child_process';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  if (req.body.ref === 'refs/heads/master') {
    exec('sh /home/server1/scripts/deploy.sh', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.sendStatus(500);
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  }
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Webhook listener running on port 3000'));