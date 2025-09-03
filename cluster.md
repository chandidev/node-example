The cluster module uses a load-balancing mechanism to distribute incoming connections among the worker processes.

On most operating systems (excluding Windows), the master process acts as the single listener for all incoming connections on the specified port. When a new connection arrives, the master process decides which worker should handle it. The default and most common strategy is round-robin.

With the round-robin approach, the master process simply cycles through the list of worker processes in order. The first connection goes to worker 1, the second to worker 2, and so on. Once it reaches the last worker, it starts over from the beginning. This ensures that the load is distributed evenly across all available workers.

The code you have in cluster.ts handles all of this automatically. The line server.listen(port, ...) in the worker block doesn't mean that each worker is competing for the port. Instead, the cluster module makes it so that the master process is the one truly listening and then passing the incoming connections to the workers.

On Windows, due to how the operating system handles networking, each worker process listens on the same port directly. The OS itself takes care of distributing connections among the workers, but the principle of distributing the load remains the same.
 