import styled from "styled-components";

export const CalendarContainer = styled.div`
    box-shadow: 0 0 10px #0005;
    padding: 1rem 1rem;
    border-radius: 5px;
`;

export const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    color: #153e90;
`;

export const CalendarTitle = styled.span`
    font-size: 2rem;
    font-weight: bold;
    font-family: "Dancing Script", cursive;
`;
export const MoveArrow = styled.div`
    aspect-ratio: 1/1;
    font-size: 2rem;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #153e90;
    transition: 0.3s all;

    &:hover {
        background-color: #ccc;
    }
`;

export const DaysContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    text-align: center;
`;

export const Selection = styled.span`
    display: inline-block;
    margin: 5px;
    border-radius: 999px;
    background-color: #153e90;
    color: #fff;
    font-size: 0.7rem;
    padding: 5px 10px;
    transition: 0.3s all;
    ${(props) => {
        if (props.selected) return "transform: scale(1.2);";
    }}
`;

export const Divider = styled.hr`
    border: none;
    height: 2px;
    border-radius: 5px;
`;

export const SelectionControl = styled.div`
    padding: 1rem;
`;
