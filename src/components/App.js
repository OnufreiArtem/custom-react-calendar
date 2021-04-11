import React from "react";
import styled from "styled-components";

import Calendar from "./Calendar/Calendar.js"

function App() {
  const AppContainer = styled.div`
    background-color: white;
    padding: 7% 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const PopupButton = styled.button`
    border-radius: 5px;
    background-color: #7eca9c;
    border: none;
    box-shadow: 0 0 8px #0004;
    transition: 0.3s all;
    font-size: 1.2rem;
    color: #40394a;
    padding: 0.5rem;
    margin: 1rem;

    &:hover {
      background-color: #ccffbd;
    }

    &:focus {
      outline: none;
    }
  `;

  const DateInput = styled.a`
    
  `

  const CalendarLabel = styled.p`
    display: inline-block;
    background-color: blue;
  `
  


  return (
    <AppContainer>
      <Calendar id="calendar1" shown={true} date={new Date()}/>
      
    </AppContainer>
  );
}

export default App;
