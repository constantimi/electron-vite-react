/// <reference types="vite/client" />
interface Window {
    // expose in the `electron/preload.ts`
    ipcRenderer: import('electron').IpcRenderer;
}
