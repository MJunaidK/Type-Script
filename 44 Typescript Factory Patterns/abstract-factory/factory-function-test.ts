import { LoggerFactory } from './factory-function';

const logger = LoggerFactory();

logger.debug('debug message');
logger.warn('warn message');
logger.info('info message');
logger.error('error message');
