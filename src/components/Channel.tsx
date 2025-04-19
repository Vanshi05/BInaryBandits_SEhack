import React, { useEffect, useState, useRef } from 'react';
import { db } from '@/Backend/firebase';
import { 
  collection, 
  orderBy, 
  limit, 
  addDoc, 
  serverTimestamp, 
  query,
  DocumentData
} from 'firebase/firestore';
import { useFirestoreQuery } from '@/hooks';
import Message from './Message';
import { useNavigate } from 'react-router-dom';

interface User {
  uid: string;
  displayName: string;
  photoURL: string;
}

interface Message {
  id: string;
  text: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  uid: string;
  displayName: string;
  photoURL: string;
}

interface ChannelProps {
  user?: User | null;
}

const Channel = ({ user = null }: ChannelProps) => {
  const navigate = useNavigate();
  const messagesRef = collection(db, 'messages');
  const { docs: messages, error: queryError } = useFirestoreQuery(
    query(messagesRef, orderBy('createdAt', 'desc'), limit(100))
  );

  const [newMessage, setNewMessage] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (queryError) {
      console.error('Firestore query error:', queryError);
      setSubmitError('Failed to load messages. Please refresh the page.');
    }
  }, [queryError]);

  useEffect(() => {
    inputRef.current?.focus();
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    bottomListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    setSubmitError(null);
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setSubmitError('Please sign in to send messages');
      navigate('/login');
      return;
    }

    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage) return;

    try {
      await addDoc(messagesRef, {
        text: trimmedMessage,
        createdAt: serverTimestamp(),
        uid: user.uid,
        displayName: user.displayName || 'Anonymous',
        photoURL: user.photoURL || '',
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitError('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto h-full">
        <div className="py-4 max-w-screen-lg mx-auto">
          <div className="border-b dark:border-gray-600 border-gray-200 py-8 mb-4">
            <div className="font-bold text-3xl text-center">
              <p className="mb-1">Welcome to</p>
              <p className="mb-3">React FireChat</p>
            </div>
            <p className="text-gray-400 text-center">
              This is the beginning of this chat.
            </p>
          </div>

          {/* Error messages */}
          {submitError && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              <p>{submitError}</p>
            </div>
          )}

          <ul>
            {messages
              ?.sort((a, b) => (a?.createdAt?.seconds || 0) - (b?.createdAt?.seconds || 0))
              ?.map((message) => (
                <li key={message.id}>
                  <Message {...message} />
                </li>
              ))}
          </ul>
          
          <div ref={bottomListRef} />
        </div>
      </div>

      <div className="mb-6 mx-4">
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-row bg-gray-200 dark:bg-coolDark-400 rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto dark:text-white shadow-md"
        >
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent outline-none"
            aria-label="Message input"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="uppercase font-semibold text-sm tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50"
            aria-label="Send message"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Channel;