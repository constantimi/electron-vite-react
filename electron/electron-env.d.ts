declare namespace NodeJS {
    interface ProcessEnv {
        APP_ROOT: string;
        /** /dist/ or /public/ */
        VITE_PUBLIC: string;
    }
}
