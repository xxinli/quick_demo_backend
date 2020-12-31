
import { Environment } from "../env";
import * as winston from "winston";

export enum LogLevel {
  ERROR = "error",
  INFO = "info",
  DEBUG = "debug"
}

class BasicLogger {
  private readonly logger: winston.Logger;
  constructor (level: LogLevel) {
    this.logger = winston.createLogger({
      level,
      format: winston.format.json(),
      defaultMeta: { service: "user-service" },
      transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
      ],
    });

    //
    // If we're not in production then log to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    //
    if (Environment.getEnvironment() !== "production") {
      this.logger.add(new winston.transports.Console({
        format: winston.format.simple(),
      }));
    }
  }

  async log(message: string, obj?: any): Promise<void> {
    this.logger.log("debug", message, {
      ...obj
    });
  }
}

/**
 *  Global instance of the Logger
 */
export class Logger {
    public static getInstance(): BasicLogger {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!Logger._instance) {
            Logger._instance = new Logger();
        }

        return Logger._logger;
    }

    private constructor() {
        Logger._logger = new BasicLogger(Environment.getLogLevel() as LogLevel);
    }

    private static _logger: BasicLogger;
    private static _instance: Logger;
}
