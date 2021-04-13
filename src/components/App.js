import React from "react";
import styled from "styled-components";

import Calendar from "./Calendar/Calendar"

function App() {
  const AppContainer = styled.div`
    background-color: white;
    padding: 7% 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  return (
    <AppContainer>
      <Calendar id="calendar1" shown={true} type="multiRange" date={new Date()}/>
      
    </AppContainer>
  );
}

export default App;
