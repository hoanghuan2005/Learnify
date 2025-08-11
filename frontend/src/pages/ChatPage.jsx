// import { useQuery } from '@tanstack/react-query';
// import React, { useEffect, useState } from 'react'
// import { getStreamToken } from '../lib/api';
// import { useParams } from 'react-router-dom';
// import useAuthUser from '../hooks/useAuthUser';
// import ChatLoader from '../components/ChatLoader';
// import ChatSidebar from '../components/ChatSidebar';  

// import {
//   Channel,
//   ChannelHeader,
//   Chat,
//   MessageInput,
//   MessageList,
//   Thread,
//   Window,
// } from "stream-chat-react";

// import { StreamChat } from 'stream-chat';

// // const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;
// // const STREAM_APP_ID = import.meta.env.VITE_STREAM_APP_ID;
// const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// function sanitizeId(id) {
//   return id?.replace(/[^a-zA-Z0-9_-]/g, "") || "";
// }

// console.log("STREAM_API_KEY:", STREAM_API_KEY);

// const ChatPage = () => {
//   const { id:targetUserId } = useParams();
//   const { authUser } = useAuthUser();

//   const [ chatClient, setChatClient ] = useState(null);
//   const [ channel, setChannel ] = useState(null);
//   const [ loading, setLoading ] = useState(true);


//   // const { data: tokenData } = useQuery({
//   //   queryKey: ["streamToken"],
//   //   queryFn: getStreamToken,
//   //   enabled: !!authUser,
//   // })

//   // useEffect(() => {
//   //   const initChat = async () => {
//   //     if (!tokenData?.token || !authUser) return;

//   //     const client = StreamChat.getInstance(STREAM_API_KEY);
//   //     await client.connectUser(
//   //       {
//   //         id: authUser._id,
//   //         name: authUser.fullName,
//   //         image: authUser.profilePic,
//   //       },
//   //       tokenData.token
//   //     );

//   //     const channelId = [authUser._id, targetUserId].sort().join("-");

//   //     const curChannel = client.channel("messaging", channelId, {
//   //       members: [authUser._id, targetUserId],
//   //     });

//   //     await curChannel.watch();

//   //     setChatClient(client);
//   //     setChannel(curChannel);
//   //     setLoading(false);
//   //   };

//   //   initChat();
//   // }, [tokenData, authUser, targetUserId]);

//   useEffect(() => {
//     if (!STREAM_API_KEY) {
//       console.error("STREAM_API_KEY is missing in .env");
//       setLoading(false); // tránh kẹt
//       return;
//     }

//     let isMounted = true;
//     const client = StreamChat.getInstance(STREAM_API_KEY);

//     const initChat = async () => {
//       try {
//         const userId = sanitizeId(authUser?._id || "mock-user-1");
//         const userName = authUser?.fullName || "Mock User";
//         const userImage = authUser?.profilePic || `https://i.pravatar.cc/150?u=${userId}`;
//         const token = client.devToken(userId);

//         await client.connectUser(
//           { id: userId, name: userName, image: userImage },
//           token
//         );

//         if (!isMounted) return;

//         const safeTargetId = sanitizeId(targetUserId || "mock-user-2");
//         const channelId = [userId, safeTargetId].sort().join("-");
//         const curChannel = client.channel("messaging", channelId, {
//           members: [userId, safeTargetId],
//         });

//         await curChannel.watch();

//         if (!isMounted) return;

//         setChatClient(client);
//         setChannel(curChannel);
//       } catch (error) {
//         console.error("Chat init error:", error);
//       } finally {
//         if (isMounted) setLoading(false); // luôn tắt loading
//       }
//     };

//     initChat();

//     return () => {
//       isMounted = false;
//       client.disconnectUser();
//     };
//   }, [authUser, targetUserId]);


//   if (loading || !chatClient || !channel) {
//     return <ChatLoader />;
//   }

//   return (
//     <div className="h-[93vh]">
//       {/* Chat Sidebar */}
//       <ChatSidebar />

//       {/* Chat Window */}
//       <Chat client={chatClient}>
//         <Channel channel={channel}>
//           <div className="w-full relative">
//             <Window>
//               <ChannelHeader />
//               <MessageList />
//               <MessageInput focus />
//             </Window>
//           </div>
//           <Thread />
//         </Channel>
//       </Chat>
//     </div>
//   );
// };

// export default ChatPage;

// ChatPage.jsx
import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window
} from "stream-chat-react";

import ChatSidebar from "../components/ChatSidebar";

const ChatPage = () => {
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    // Fake API Key, chỉ để UI chạy
    const client = StreamChat.getInstance("fake_api_key");

    // Fake user
    const userId = "mock-user";
    client.connectUser(
      { id: userId, name: "Mock User" },
      client.devToken(userId)
    );

    // Fake channel
    const ch = client.channel("messaging", "mock-channel", {
      name: "Mock Chat Room",
      members: [userId]
    });

    setChatClient(client);
    setChannel(ch);

    return () => client.disconnectUser();
  }, []);

  if (!chatClient || !channel) return <div>Loading Chat UI...</div>;

  return (
    <div className="h-[93vh] flex">
      <ChatSidebar />

      <div className="flex-1">
        <Chat client={chatClient} theme="messaging light">
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </div>
    </div>
  );
};

export default ChatPage;

