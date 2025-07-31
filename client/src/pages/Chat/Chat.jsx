import React, { useRef, useState, useEffect } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Coversation/Conversation";
import NavIcons from "../../components/NavIcons/NavIcons";
import "./Chat.css";
import { userChats } from "../../api/ChatRequests";
import { getUser } from "../../api/UserRequests"; // ✅ Import this
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  // Get user's chats with other user data included
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);

        // Fetch other user data for each chat
        const enrichedChats = await Promise.all(
          data.map(async (chat) => {
            const otherUserId = chat.members.find((id) => id !== user._id);
            const { data: otherUser } = await getUser(otherUserId);
            return { ...chat, otherUser };
          })
        );

        setChats(enrichedChats);
        setFilteredChats(enrichedChats);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Setup socket connection
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Receive messages from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  // Search filtering using enriched otherUser data
  useEffect(() => {
    if (!searchValue.trim()) {
      setFilteredChats(chats);
    } else {
      const filtered = chats.filter((chat) => {
        const name = `${chat.otherUser.firstname} ${chat.otherUser.lastname}`;
        return name.toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredChats(filtered);
    }
  }, [searchValue, chats]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div>
      <NavIcons searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="Chat">
        {/* Left Side */}
        <div className="Left-side-chat">
          <div className="Chat-container">
            <h2>Chats</h2>
            <div className="Chat-list">
              {filteredChats.map((chat) => (
                <div key={chat._id} onClick={() => setCurrentChat(chat)}>
                  <Conversation
                    data={chat}
                    currentUser={user._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="Right-side-chat">
          <div style={{ width: "20rem", alignSelf: "flex-end" }}></div>
          <ChatBox
            chat={currentChat}
            currentUser={user._id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
