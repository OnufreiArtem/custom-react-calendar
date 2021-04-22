import styled, { keyframes } from "styled-components";

export const popup = keyframes`
  from {
    transform: scale(0.8)
  }

  to {
    transform: scale(1);
  }
`;

export const WeekDayCell = styled.span`
    margin-bottom: 20px;
`;

export const BasicCell = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;
    font-size: 1rem;
    transition: 0.3s all;
    color: #40394a;
    background-color: transparent;
    user-select: none;
`;

export const Cell = styled(BasicCell)`
    ${
        props => {
            if(props.inMonth) {
                return `
                cursor: pointer;

                &:hover {
                    background-color: #ccc;
                }`
            } else {
                return `color: #ccc;`
            }
        }
    }

`

export const SelectedCell = styled(BasicCell)`
    ${
        props => {
            if(props.inMonth) {
                return `
                color: #fff;
                background-color: #153e90;
                box-shadow: 0 0 5px #0005;
                cursor: pointer;
            
                &:hover {
                    background-color: #153e90;
                }`
            } else {
                return `
                color: #fff;
                background-color: #153e90aa;
                `
            }
        }
    }
    animation: ${popup} 0.15s linear;
`

export const RangeCell = styled(BasicCell)`
    ${
        props => {
            if(props.inMonth) {
                return`
                color: #0e49b5;
                background-color: #0e49b555;
                font-weight: bold;
                border-radius: 999px;
                cursor: pointer;

                &:hover {
                    color: #fff;
                    background-color: #153e90;
                }`
            } else {
                return `
                color: #fff;
                background-color: #0e49b522;
                border-radius: 999px;
                `
            }
        }
    }
    animation: ${popup} 0.15s linear;
`