import morgan from 'morgan';
import { winstonLogger } from '@sahhhallroadmappro/common';
const useLogger = winstonLogger('api-gateway')

const logFormat = `
{
    "httpMethod": ":method",
    "requestUrl": ":url",
    "responseStatus": ":status",
    "responseTime": ":response-time ms",
    "user-agnet":":user-agent"
}`;

// trims and parses the log message into a JSON object and logs 
// it using the customLogger with an info level and a message 
// indicating an HTTP request was received
function logMessageHandler(message : any) {
  useLogger.info('HTTP request received', JSON.parse(message.trim()));
}


// logMessageHandler as the stream to handle log messages.
const loggingMiddleware = morgan(
  // 'combined',
  logFormat,
  {
    stream: { write: logMessageHandler }
  }
);

export default loggingMiddleware;