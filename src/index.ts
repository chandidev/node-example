// src/index.ts
import express, { type Express, type Request, type Response } from 'express';
import morgan from 'morgan';
import morganMiddleware from './middleware/morgan.middleware.js';


// Create a new Express application instance
const app: Express = express();
const port = process.env.PORT || 3000;

// Use morgan middleware for logging HTTP requests
// app.use(morgan('combined'));

app.use(express.json())

morgan.token('body', (req) => {
  return JSON.stringify((req as Request).body)
})

// app.use(morgan(':method :url :body'))
// app.use(morgan(':date[iso] :method :url :status :response-time ms'));

app.use(morganMiddleware);

// Define a simple route with type annotations for Request and Response
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express with TypeScript!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
