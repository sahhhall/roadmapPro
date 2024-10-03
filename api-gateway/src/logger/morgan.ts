import morgan from 'morgan';
import {customLogger} from './logger';


const logFormat = `
{
    "httpMethod": ":method",
    "requestUrl": ":url",
    "responseStatus": ":status",
    "responseTime": ":response-time ms"
}`;

// trims and parses the log message into a JSON object and logs 
// it using the customLogger with an info level and a message 
// indicating an HTTP request was received
function logMessageHandler(message : any) {
    customLogger.info('HTTP request received', JSON.parse(message.trim()));
}


// logMessageHandler as the stream to handle log messages.
const loggingMiddleware = morgan(
  logFormat,
  {
    stream: { write: logMessageHandler }
  }
);

export default loggingMiddleware;