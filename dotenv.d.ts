declare namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      MONGODB_URL: string;
      JWT_SECRET:string;
    }
  }
  