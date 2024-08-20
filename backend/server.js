import express from "express";
import { rateLimit } from "express-rate-limit";
import { xss } from "express-xss-sanitizer";
import helmet from "helmet";
import cors from "cors";
import fetchMetadata from './metadataService.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
app.use(helmet());
app.use(xss());
const limiter = rateLimit({
windowMs: 1000,
limit: 5
})
app.use(limiter);

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.post('/fetch-metadata', async (req, res) => {
  const urls = req.body.urls;
  try {
    const metadataList = await fetchMetadata(urls);
    console.log(metadataList.length);
    res.json(metadataList); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
export default app;