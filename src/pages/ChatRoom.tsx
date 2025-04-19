import { useEffect } from 'react';
import { ZIMKitManager, ZIMKit } from '@zegocloud/zimkit-react';
import { zegoConfig } from '@/api/zegoCloud';
import { useUser } from '@/context/UserContext';
import { useChat } from '@/context/ChatContext';

export default function ChatRoom() {
  const { user } = useUser();
  const { initializeChat } = useChat();

  useEffect(() => {
    if (!user) return;

    const initChat = async () => {
      try {
        await ZIMKitManager.init(zegoConfig.appID);
        await ZIMKitManager.connectUser({
          userID: user.id,
          userName: user.name || `User-${user.id.substring(0, 6)}`,
          avatarUrl: user.avatar
        });
        initializeChat();
      } catch (error) {
        console.error('Failed to initialize chat:', error);
      }
    };

    initChat();

    return () => {
      ZIMKitManager.disconnectUser();
    };
  }, [user, initializeChat]);

  if (!user) {
    return <div>Please log in to access chat</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-hidden">
        <ZIMKit />
      </div>
    </div>
  );
}