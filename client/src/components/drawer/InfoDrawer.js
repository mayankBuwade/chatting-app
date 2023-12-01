import React from "react";
import { Drawer, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { ArrowBack } from "@mui/icons-material";
import Profile from "./Profile";

const DrawerStyle = {
  left: 20,
  top: "2.5%",
  height: "95%",
  width: "23.5%",
};

const Component = styled(Box)`
  background: #ededed;
  height: 85%;
`;

const Header = styled(Box)`
  background-color: #008069;
  height: 102px;
  color: #fff;
  display: flex;
  & > svg,
  & > p {
    margin-top: auto;
    padding: 15px;
    font-weight: 600;
  }
`;

const InfoDrawer = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: DrawerStyle }}
      style={{
        zIndex: 1500,
      }}
    >
      <Header>
        <ArrowBack onClick={() => setOpen(false)} />
        <Typography>Profile</Typography>
      </Header>
      <Component>
        <Profile />
      </Component>
    </Drawer>
  );
};

export default InfoDrawer;
