import React, { useContext, useState, useEffect, useRef } from "react";
import { Box, styled } from "@mui/material";
import Footer from "./Footer";
import { AccountContext } from "../../../context/AccountProvider";
import { getMessages, newMessage } from "../../../service/api";
import Message from "./Message";

const bgImageUrl =
  "https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png";

const Wrapper = styled(Box)`
  background-image: url(${bgImageUrl});
  background-size: 50%;
`;

const Component = styled(Box)`
  height: 79.5vh;
  overflow-y: scroll;
`;

const Container = styled(Box)`
  padding: 1px 80px;
`;

const Messages = ({ person, conversation }) => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);
  const { account, socket, messageToggle, setMessageToggle } =
    useContext(AccountContext);
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  const scrollRef = useRef();

  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      let message = {};

      if (!file) {
        message = {
          senderId: account.sub,
          reciverId: person.sub,
          conversationId: conversation._id,
          type: "text",
          text: value,
        };
      } else {
        message = {
          senderId: account.sub,
          reciverId: person.sub,
          conversationId: conversation._id,
          type: "file",
          text: image,
        };
      }
      socket.current.emit("sendMessage", message);
      await newMessage(message);
      setValue("");
      setFile("");
      setImage("");
      setMessageToggle(!messageToggle);
    }
  };

  useEffect(() => {
    const getMessageDetails = async () => {
      let data = await getMessages(conversation._id);
      setMessages(data);
    };
    conversation && getMessageDetails();
  }, [person._id, conversation._id, conversation, messageToggle]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setIncomingMessage({
        ...data,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    incomingMessage &&
      conversation?.members?.includes(incomingMessage.senderId) &&
      setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, conversation]);

  return (
    <Wrapper>
      <Component>
        {messages &&
          messages.map((message) => (
            <Container key={message.createdAt} ref={scrollRef}>
              <Message message={message} />
            </Container>
          ))}
      </Component>
      <Footer
        sendText={sendText}
        setValue={setValue}
        value={value}
        setFile={setFile}
        file={file}
        setDataImage={setImage}
      />
    </Wrapper>
  );
};
export default Messages;
