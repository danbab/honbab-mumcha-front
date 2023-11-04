import React, { useState, useEffect, useRef } from "react"; // useRef 추가
import Button from "./Button";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [username, setUsername] = useState("");
  const [roomNum, setRoomNum] = useState("");
  // let username = "rowoon";
  // let roomNum = 1;

  console.log(username);
  console.log(roomNum);

  const chatWindowRef = useRef(null); // 채팅창에 대한 ref 생성

  useEffect(() => {
    handleLogin();
  }, []); // 의존성 배열이 빈 배열이므로 useEffect는 컴포넌트가 처음 렌더링될 때만 실행됩니다.

  const handleLogin = () => {
    const inputUsername = prompt("아이디를 입력하세요");
    const inputRoomNum = prompt("채팅방 번호를 입력하세요");
    setUsername(inputUsername);
    setRoomNum(inputRoomNum);
    return;
  };

  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:8080/chat/roomNum/${roomNum}`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      const currentTime = new Date().toLocaleString();

      if (data.message) {
        // 서버에서 받은 메시지를 추가
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { sender: data.sender, message: data.message, time: currentTime },
        ]);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [username, roomNum]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = 0;
    }
  }, [chatHistory]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (message) {
      const chat = {
        sender: username,
        roomNum: roomNum,
        message: message,
      };

      await fetch("http://localhost:8080/chat", {
        method: "POST",
        body: JSON.stringify(chat),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      // console.log(response);

      // let parseResponse = await response.json();

      // console.log(parseResponse);

      // 메시지 전송 후 input의 value를 초기화
      setMessage("");
    }
  };

  return (
    <div className="w-[80.5rem] mx-auto my-0">
      <div className="mt-9 mb-4">{username}</div>
      {/* 채팅창에 ref 설정 */}
      <div
        ref={chatWindowRef}
        className="h-[40rem] py-6 border-t-4 border-gray-600 overflow-y-scroll flex flex-col-reverse"
      >
        {chatHistory
          .slice(0)
          .reverse()
          .map((data, index) => (
            <div
              key={index}
              className={
                data.sender === username
                  ? "mb-2 text-right mr-4 flex justify-end"
                  : "mb-2 text-left ml-4 flex justify-start"
              }
            >
              <div
                className={
                  data.sender === username
                    ? "bg-green-500 text-white p-2 rounded-lg w-80 inline-block"
                    : "bg-gray-500 text-white p-2 rounded-lg w-80 inline-block"
                }
              >
                {data.message}
              </div>
              <div className="text-xs text-gray-500 mt-1">{data.time}</div>
            </div>
          ))}
      </div>
      <form
        className="flex border-t-2 border-gray-300 gap-3"
        onSubmit={handleSendMessage}
      >
        <input
          className="w-[80.5rem] h-10 px-7"
          type="text"
          placeholder="채팅을 입력해주세요"
          value={message}
          onChange={handleInputChange}
        />
        <Button type="chat">전송</Button>
      </form>
    </div>
  );
};

export default Chat;
