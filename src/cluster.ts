import cluster from 'cluster';
import os from 'os';
import express, { type Express, type Request, type Response } from 'express';

// Get the number of CPU cores available on the system.
const numCPUs: number = os.cpus().length;

// Set the port for the application, using an environment variable if available.
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// The cluster module has a primary process that manages the workers.
// The `isPrimary` property is a modern alternative to `isMaster`.
if (cluster.isPrimary) {
    console.log(`Primary process ${process.pid} is running`);

    // Fork a worker for each CPU core.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Listen for a dying worker process. If a worker exits, we create a new one
    // to ensure the cluster maintains the desired number of workers.
    cluster.on('exit', (worker: import('cluster').Worker, code: number, signal: string) => {
        console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
        cluster.fork();
    });

} else {
    // This code runs on each of the worker processes.
    // Each worker is an independent Express application instance.
    const app: Express = express();

    app.get('/', (req: Request, res: Response) => {
        // Send a response that includes the PID of the worker handling the request.
        // This helps visualize the load balancing.
        res.send(`Hello from Express worker ${process.pid}!\n`);
    });

    // Each worker listens on the same port, managed by the primary process.
    app.listen(port, () => {
        console.log(`Worker ${process.pid} is listening on port ${port}`);
    });
}

