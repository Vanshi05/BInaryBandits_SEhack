// src/context/ZegoContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ZIM } from 'zego-zim-web';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';
import { createZIM, createZegoExpressEngine } from '../api/zegoClient';

interface ZegoContextType {
  zim: ZIM | null;
  zegoEngine: ZegoExpressEngine | null;
  isConnected: boolean;
  error: string | null;
}

const ZegoContext = createContext<ZegoContextType | null>(null);

export const ZegoProvider: React.FC<{
  userID: string;
  userName: string;
  children: React.ReactNode;
}> = ({ userID, userName, children }) => {
  const [state, setState] = useState<ZegoContextType>({
    zim: null,
    zegoEngine: null,
    isConnected: false,
    error: null,
  });

  useEffect(() => {
    const initializeZego = async () => {
      try {
        const zimInstance = await createZIM(userID, userName);
        const engineInstance = createZegoExpressEngine();

        zimInstance.on('connectionStateChanged', (state: number) => {
          setState(prev => ({
            ...prev,
            isConnected: state === 2,
          }));
        });

        setState({
          zim: zimInstance,
          zegoEngine: engineInstance,
          isConnected: true,
          error: null,
        });
      } catch (error) {
        setState({
          zim: null,
          zegoEngine: null,
          isConnected: false,
          error: error.message || 'Failed to initialize ZegoCloud',
        });
      }
    };

    initializeZego();

    return () => {
      if (state.zim) {
        state.zim.logout();
      }
      if (state.zegoEngine) {
        state.zegoEngine.destroyEngine();
      }
    };
  }, [userID, userName]);

  return (
    <ZegoContext.Provider value={state}>
      {children}
    </ZegoContext.Provider>
  );
};

export const useZego = () => {
  const context = useContext(ZegoContext);
  if (!context) {
    throw new Error('useZego must be used within a ZegoProvider');
  }
  return context;
};