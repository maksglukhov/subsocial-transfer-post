import React, { useState, useEffect } from "react";
import "../css/App.css";

import ConnectWallet from "./ConnectWallet";
import Main from "./Main";

function App() {
  return (
    <div className='App'>
      <ConnectWallet></ConnectWallet>
      <Main></Main>
    </div>
  );
}

export default App;
