export const log = (message: string) => {
    console.log(`[${new Date().toISOString()}] ${message}`);
  };
  
  export const errorLog = (message: string) => {
    console.error(`[${new Date().toISOString()}] ERROR: ${message}`);
  };
  