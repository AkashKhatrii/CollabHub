import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { database, set, ref, push, onValue} from '../../utils/firebase';
import './Chat.css';
import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/authState';

export default function Chat() {
  const { chatRoomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { loggedInUser } = useRecoilValue(authState);

  const location = useLocation();
  const { username } = location.state || ''
  useEffect(() => {
    const chatRoomRef = ref(database, `chatrooms/${chatRoomId}/messages`);
    onValue(chatRoomRef, (snapshot) => {
      const data = snapshot.val();
      const messageList = data ? Object.values(data) : [];
      setMessages(messageList);
    });
  }, [chatRoomId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const chatRoomRef = ref(database, `chatrooms/${chatRoomId}/messages`);
      await push(chatRoomRef, {
        senderId: loggedInUser,
        text: newMessage,
        createdAt: new Date().toISOString(),
      });
      setNewMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key == 'Enter'){
        handleSendMessage();
    }
  }

  return (
    <section className="chat-section">
      <div className="chat-messages">
        <h3 style={{ textAlign: 'center', color: '#FF5722', marginBottom: '1rem', fontSize: '1.25rem'}}>{username}</h3>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.senderId === loggedInUser ? 'sent' : 'received'}`}
          >
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </section>
  );
}
