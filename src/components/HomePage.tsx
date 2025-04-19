import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const navigate = useNavigate();

    const joinGoogleMeet = () => {
        // Redirect directly to Google Meet
        window.location.href = "https://meet.google.com/iat-uhib-wcx";
    };

    return (
        <div style={{ 
            padding: '20px', 
            textAlign: 'center',
            maxWidth: '500px',
            margin: '0 auto'
        }}>
            <h2>Video Call Application</h2>
            <div style={{ margin: '20px 0' }}>
                <button 
                    onClick={joinGoogleMeet}
                    style={{ 
                        padding: '12px 24px',
                        fontSize: '16px',
                        backgroundColor: '#1a73e8',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Join Video Call (Google Meet)
                </button>
            </div>
            <p style={{ color: '#666' }}>
                You'll be redirected to Google Meet for the video call
            </p>
        </div>
    );
};

export default HomePage;