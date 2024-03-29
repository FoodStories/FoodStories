import { Logger, createLogger, transports, format } from 'winston';
import { ILogger } from './logger.interface';

export interface LoggerClass {
  new (componentName: string): ILogger;
}

export function makeLogger(serviceName: string): LoggerClass {
  return class implements ILogger {
    public logger: Logger = createLogger({
      level: 'info',
    });

    constructor(componentName: string) {
      this.logger.configure({transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.timestamp({ format: 'HH:mm:ss' }),
            format.metadata({ fillExcept: ['timestamp', 'level', 'message'] }),
            format.printf(({ timestamp, level, message, metadata }) => {
              if (metadata && Object.keys(metadata).length > 0) {
                const formattedMetadata = Object.entries(metadata)
                  .map(([key, value]) => `\n ${key}: '${value}'`)
                  .join(', ');
                return `[${timestamp}] [${level}] [${serviceName}] [${componentName}] ${message} \n{${formattedMetadata}\n}`;
              }
              return `[${timestamp}] [${level}] [${serviceName}] [${componentName}] ${message}`;
            })
          ),
        }),
      ]})
    }

    log(level: string, message: string, metadata?: unknown): void {
      this.logger.log(level, message, metadata);
    }

    warn(message: string, metadata?: unknown): void {
      this.logger.warn(message, metadata);
    }

    error(message: string, metadata?: unknown): void {
      this.logger.error(message, metadata);
    }

    debug(message: string, metadata?: unknown): void {
      this.logger.debug(message, metadata);
    }

    info(message: string, metadata?: unknown): void {
      this.logger.info(message, metadata);
    }
  };
}
