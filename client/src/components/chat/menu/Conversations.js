import { Box, Divider, styled } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { getUsers } from "../../../service/api";
import Conversation from "./Conversation";
import { AccountContext } from "../../../context/AccountProvider";

const Component = styled(Box)`
  height: 81vh;
  overflow: overlay;
`;

const StyledDivider = styled(Divider)`
  margin: 0 0 0 70px;
  background-color: #e9edef;
  opacity: 0.6;
`;

const Conversations = ({ searchedText }) => {
  const [users, setUsers] = useState([]);
  const { account, socket, setActiveUsers } = useContext(AccountContext);

  useEffect(() => {
    const fetchData = async () => {
      let response = await getUsers();
      const filtereData = response.filter((user) =>
        user.name.toLowerCase().includes(searchedText.toLowerCase())
      );
      setUsers(filtereData);
    };
    fetchData();
  }, [searchedText]);

  useEffect(() => {
    socket.current.emit("addUsers", account);
    socket.current.on("getUsers", (users) => {
      setActiveUsers(users);
    });
  }, [account]);

  return (
    <Component>
      {users &&
        users.map(
          (user) =>
            user.sub !== account.sub && (
              <Box key={user._id}>
                <Conversation user={user} />
                <StyledDivider />
              </Box>
            )
        )}
    </Component>
  );
};

export default Conversations;
