// src/index.ts
import express, { type Express, type Request, type Response } from 'express';
import morgan from 'morgan';
import morganMiddleware from './middleware/morgan.middleware.js';
import pkg from 'express-openid-connect';
const { auth, requiresAuth } = pkg;

// Create a new Express application instance
const app: Express = express();
const port = process.env.PORT || 3000;


// Your OIDC provider configuration goes here.
// These values are placeholders and must be replaced with your actual credentials.
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a-long-and-random-string-for-session-encryption',
  baseURL: 'http://localhost:3000', // The base URL of your application
  clientID: 'YOUR_CLIENT_ID', // Your client ID from the OIDC provider
  issuerBaseURL: 'https://YOUR_OIDC_DOMAIN.com', // The domain of your OIDC provider
};

// Use morgan middleware for logging HTTP requests
// app.use(morgan('combined'));

app.use(express.json())

// The `auth` middleware is the core of this integration.
// It handles everything from login/logout redirects to managing user sessions.
app.use(auth(config));


// The home page is a public route, accessible to everyone.
app.get('/', (req, res) => {
  // `req.oidc.isAuthenticated()` checks if the user is authenticated.
  if (req.oidc.isAuthenticated()) {
    res.send(`Hello, ${req.oidc?.user?.name}! You are logged in. <a href="/logout">Log Out</a>`);
  } else {
    res.send('You are not logged in. <a href="/login">Log In</a>');
  }
});

// This is a protected route. The `requiresAuth()` middleware checks for an active session.
// If the user is not authenticated, they will be redirected to the login page.
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(`
    <h1>User Profile</h1>
    <pre>${JSON.stringify(req.oidc.user, null, 2)}</pre>
  `);
});

// A route to demonstrate how to log out.
app.get('/logout', (req, res) => {
  res.redirect('/oidc/logout');
});



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


// A route for handling unauthorized access. placed at the last middleware
app.use((req, res, next) => {
  res.status(401).send('Unauthorized. Please log in.');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
