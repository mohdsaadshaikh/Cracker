import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define custom settings for file and console log levels
const options = {
  file: {
    level: "info",
    filename: path.join(__dirname, "../../logs.log"), // Log path
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
  errorFile: {
    level: "error",
    filename: path.join(__dirname, "../../error.log"), // Error log path
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  },
};

// Create logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.File(options.errorFile),
  ],
  exitOnError: false, // Do not exit on handled exceptions
});

// Only log to the console in development mode
if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console(options.console));
}

export default logger;
