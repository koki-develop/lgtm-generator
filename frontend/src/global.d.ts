declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_STAGE: 'local' | 'dev' | 'prod';
    readonly NEXT_PUBLIC_GA_MEASUREMENT_ID: string;
    readonly NEXT_PUBLIC_API_ORIGIN: string;
    readonly NEXT_PUBLIC_LGTMS_ORIGIN: string;
  }
}
