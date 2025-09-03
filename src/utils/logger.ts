import winston from 'winston';

// Define the log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.json()
);

// Create the logger instance
const logger = winston.createLogger({
  level: 'info', // Set the default log level
  format: logFormat,
  transports: [
    // Output logs to the console
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    // Output all logs to a file
    new winston.transports.File({ filename: 'logs/all.log' }),
    // Output error logs to a separate file
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

export default logger;