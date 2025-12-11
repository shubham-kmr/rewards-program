import logger from '../logger';

export const getTransactionData = async () => {
  logger.info("[API] Requesting transaction records...");

  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 1000) + 500;

    setTimeout(async () => {
      try {
        const res = await fetch('/data/transactions.json');
        if (!res.ok) throw new Error("HTTP Fetch Error");
        
        const json = await res.json();
        logger.info(`[API] Retrieved ${json.length} records successfully.`);
        resolve(json);
      } catch (err) {
        logger.error("[API] Failed to retrieve data", err);
        reject(err);
      }
    }, delay);
  });
};