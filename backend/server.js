import express from "express";
import urlMetadata from "url-metadata";
import { rateLimit } from "express-rate-limit";
import { xss } from "express-xss-sanitizer";
import helmet from "helmet";
import cors from "cors";



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
      const metadataPromises = urls.map(url => urlMetadata(url));
      const metadataList = await Promise.all(metadataPromises);
      res.json(metadataList); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching metadata' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
