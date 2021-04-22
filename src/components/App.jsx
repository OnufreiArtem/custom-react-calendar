import React from "react";
import styled from "styled-components";

import Calendar from "./Calendar/Calendar"

function App() {
  const AppContainer = styled.div`
    background-color: white;
    padding: 7%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
  `;

  return (
    <AppContainer>
      <Calendar id="calendar1" type="single" date={new Date()}/>
      <Calendar id="calendar2" type="range" date={new Date()}/>
      <Calendar id="calendar3" type="multiRange" date={new Date()}/>
    </AppContainer>
  );
}

export default App;
