import styled from "@emotion/styled";
import { Dialog } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";
import ChatBox from "./chat/ChatBox";
import EmptyChat from "./chat/EmptyChat";
import Menu from "./menu/Menu";

const dialogStyle = {
  height: "95%",
  width: "100%",
  margin: "20px",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  overflow: "hidden",
  borderRadius: 0,
};

const Container = styled(Box)`
  display: flex;
`;

const LeftComponent = styled(Box)`
  min-width: 450px;
`;

const RightComponent = styled(Box)`
  width: 76.2%;
  min-width: 350px;
  height: "100%";
  border-left: 1px solid rgba(0, 0, 0, 0.14);
`;

const ChatDialog = () => {
  const { person } = useContext(AccountContext);

  return (
    <Dialog
      open={true}
      PaperProps={{ sx: dialogStyle }}
      hideBackdrop={true}
      maxWidth={"lg"}
    >
      <Container>
        <LeftComponent>
          <Menu />
        </LeftComponent>
        <RightComponent>
          {Object.keys(person).length ? <ChatBox /> : <EmptyChat />}
        </RightComponent>
      </Container>
    </Dialog>
  );
};

export default ChatDialog;
