import { Box } from "@mui/system";
import React, { useState } from "react";
import Conversations from "./Conversations";
import Header from "./Header";
import Search from "./Search";

const Menu = () => {
  const [searchedText, setSearchedText] = useState("");

  return (
    <Box>
      <Header />
      <Search searchedText={searchedText} setSearchedText={setSearchedText} />
      <Conversations searchedText={searchedText} />
    </Box>
  );
};

export default Menu;
