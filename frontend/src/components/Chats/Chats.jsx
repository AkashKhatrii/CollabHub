import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/authState';
import axios from 'axios';

export default function Chats() {
  const [chatRooms, setChatRooms] = useState([]);
  const { token, loggedInUser } = useRecoilValue(authState);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/chatrooms`, {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });
        setChatRooms(response.data);
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
      }
    };

    fetchChatRooms();
  }, [token]);

  return (
    <section className="chats-section">
      <h2>My Chats</h2>
      <ul className="chat-rooms-list">
        {chatRooms.map(chatRoom => (
          <li key={chatRoom.chatRoomId}>
            <Link to={`/chat/${chatRoom.chatRoomId}`}>
              Chat with {chatRoom.users.filter(user => user !== loggedInUser).join(', ')}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
