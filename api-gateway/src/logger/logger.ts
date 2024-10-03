import winston from 'winston';
import 'winston-logstash';
import { format as dateFnsFormat } from 'date-fns';

const customTimestampFormat = () => {
    return dateFnsFormat(new Date(), 'MM/dd/yyyy hh:mm:ss a');
};



export const customLogger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    defaultMeta: {
        serviceName: 'api-gateway',
        buildDetails: {
            nodeVersion: process.version,
            commitHash: process.env.COMMIT_HASH || 'local',
        }
    },
    // Winston logger configuration specifies where log messages should be sent
    transports: [
        new winston.transports.Console({
            // Combines multiple format functions.
            format: winston.format.combine(
                winston.format.colorize(),
                // Adds a timestamp to each log message.
                winston.format.timestamp({ format: customTimestampFormat }),
                // Customizes the log message format, excluding serviceName 
                // and buildDetails and including the timestamp, level, 
                // message, and additional metadata.
                winston.format.printf(({ message, timestamp, level, serviceName, buildDetails, ...meta }) => {
                    // Ignore serviceName and buildDetails when logging to the console
                    return `${timestamp} ${level}: ${message} ${JSON.stringify(meta)}`;
                })
            )
        }),
        new winston.transports.Http({
            level: 'info',
            host: 'localhost',
            port: 5000,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ]
});


// const levels = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     debug: 4,
// }

// const customTimestampFormat = () => {
//     return dateFnsFormat(new Date(), 'MM/dd/yyyy hh:mm:ss a');
// };

// const level = () => {
//     const env = process.env.NODE_ENV || 'development'
//     const isDevelopment = env === 'development'
//     return isDevelopment ? 'debug' : 'warn'
// }
// const format = winston.format.combine(
//     winston.format.timestamp({ format: customTimestampFormat }),
//     winston.format.colorize({ all: true }),
//     winston.format.printf(({ message, timestamp, level, serviceName, buildDetails, ...meta }) => {
//         // Ignore serviceName and buildDetails when logging to the console
//         return `${timestamp} ${level}: ${message} ${JSON.stringify(meta)}`;
//     })
// )

// const colors = {
//     error: 'red',
//     warn: 'yellow',
//     info: 'green',
//     http: 'magenta',
//     debug: 'white',
// }
// winston.addColors(colors)

// const transports = [
//     new winston.transports.Console(),
//     // new winston.transports.File({ filename: 'combined.log' })
//     // new (transports as any).Logstash({
//     //     port:5044,
//     //     host:'logstash',
//     //     node_name:'microservicetest'
//     // })
// ]

// export const logger = winston.createLogger({
//     level: level(),
//     levels,
//     format,
//     transports
// })


