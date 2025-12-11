import pino from "pino";

const logSender = (level, event) => {
  if(level === 'error') console.error(event);
};

const appLogger = pino({
  browser: {
    serialize: true,
    asObject: true,
    transmit: { send: logSender },
  },
});

export default appLogger;