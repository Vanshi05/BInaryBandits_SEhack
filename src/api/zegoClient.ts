// src/api/zego/zegoClient.ts
import { ZIM } from 'zego-zim-web';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';

// Load from CDN first
declare global {
  interface Window {
    ZIM: typeof ZIM;
  }
}

const appID = Number(import.meta.env.VITE_ZEGO_APP_ID) || 0;
const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET || '';

export const initializeZIM = async (): Promise<typeof ZIM> => {
  if (!window.ZIM) {
    // Dynamically load the ZIM SDK
    await new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://storage.zego.im/zegocloud-webrtc/webrtc-zim/index.js';
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }
  return window.ZIM;
};

export const createZIM = async (userID: string, userName: string): Promise<ZIM> => {
  const ZIM = await initializeZIM();
  const zimInstance = ZIM.create(appID);
  await zimInstance.login({ userID, userName }, serverSecret);
  return zimInstance;
};

export const createZegoExpressEngine = (): ZegoExpressEngine => {
  return new ZegoExpressEngine(appID);
};