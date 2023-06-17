interface ILogger {
  info(message: string): void;
  warn(message: string): void;
  debug(message: string): void;
  error(message: string): void;
}

const productionLogger = (): ILogger => ({
  //  parenthesis are returning a single value
  info(message: string): void {},
  warn(message: string): void {
    console.warn(message);
  },
  debug(message: string): void {},
  error(message: string): void {
    console.error(message);
  },
});

const developmentLogger = (): ILogger => ({
  info(message: string): void {
    console.info(message);
  },
  warn(message: string): void {
    console.warn(message);
  },
  debug(message: string): void {
    console.debug(message);
  },
  error(message: string): void {
    console.error(message);
  },
});

export const LoggerFactory = (): ILogger => {
  //the curly braces are executing multiple lines of code.
  if (process.env.NODE_ENV === 'production') {
    return productionLogger();
  } else {
    return developmentLogger();
  }
};
