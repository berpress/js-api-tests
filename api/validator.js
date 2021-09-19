// eslint-disable-next-line import/no-extraneous-dependencies
import pino from 'pino';

const logger = pino({ level: process.env.LOG_LEVEL || 'info', prettyPrint: true, colorize: true });

function validate(schema, body) {
  const { error } = schema.validate(body);
  if (error !== undefined) {
    logger.error(`Schema is not valid. Error is ${error}`);
    throw new Error(`Check response! Schema is not valid. Error is ${error}`);
  }
}

export default validate;
