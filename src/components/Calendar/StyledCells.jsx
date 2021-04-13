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

export const InCell = styled(BasicCell)`
    cursor: pointer;

    &:hover {
        background-color: #ccc;
    }
`;

export const OutCell = styled(BasicCell)`
    color: #ccc;
`;

export const RangeInCell = styled(InCell)`
    color: #0e49b5;
    background-color: #0e49b555;
    font-weight: bold;
    border-radius: 999px;
    animation: ${popup} 0.15s linear;

    &:hover {
        color: #fff;
        background-color: #153e90;
    }
`;

export const RangeOutCell = styled(OutCell)`
    color: #fff;
    background-color: #0e49b522;
    border-radius: 999px;
    animation: ${popup} 0.15s linear;
`;

export const SelectedInCell = styled(InCell)`
    color: #fff;
    background-color: #153e90;
    box-shadow: 0 0 5px #0005;
    animation: ${popup} 0.15s linear;

    &:hover {
        background-color: #153e90;
    }
`;

export const SelectedOutCell = styled(OutCell)`
    color: #fff;
    background-color: #153e90aa;
`;
