// src/index.ts
import express, { type Express, type Request, type Response } from 'express';

// Create a new Express application instance
const app: Express = express();
const port = process.env.PORT || 3000;

// Define a simple route with type annotations for Request and Response
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express with TypeScript!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
