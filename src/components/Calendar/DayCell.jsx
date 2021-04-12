import React  from "react";

import PropTypes from 'prop-types';
import styled from "styled-components";

import { useState } from "react/cjs/react.development";

let defaultColorScheme = {
    inColor: "#40394a",
    inColorSelected: "#red",
    outColor: "#ccc",
    outColorSelected: "#6a686e",
    inToday: "",
    outToday: "",
    inRange: "",
    outRange: "",
}

export default function DayCell({dayText=0, isIn=true, isSelected=false, inRange=false, isToday=false, colorScheme=defaultColorScheme}) {

    const [dayIn, setIsIn] = useState(isIn);
    const [daySelected, setIsSelected] = useState(isSelected);
    const [dayToday, setIsToday] = useState(isToday);
    const [dayRange, setInRange] = useState(inRange);

    const DateCellContainer = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;
    padding: 5px;
    font-size: 1rem;
    transition: .3s all;
    color: ${() => {
        if(dayIn) {
            return daySelected ? colorScheme.inColorSelected : colorScheme.inColor
        } else {
            return daySelected ? colorScheme.outColorSelected : colorScheme.outColor
        }
    }};
    cursor: pointer;

    &:hover {
        background-color: ${colorScheme.outColor}
    }

    `

    return(
        <DateCellContainer onClick={() => { if(dayIn) setIsSelected(!isSelected) }}>
            {dayText}
        </DateCellContainer>
    );

}


DayCell.prototype = {
    dayText: PropTypes.number,
    isIn: PropTypes.bool, 
    isSelected: PropTypes.bool,
    inRange: PropTypes.bool,
    isToday: PropTypes.bool,

    colorScheme: PropTypes.object = {
        inColor: PropTypes.string,
        inColorSelected: PropTypes.string,
        outColor: PropTypes.string,
        outColorSelected: PropTypes.string,
        inToday: PropTypes.string,
        outToday: PropTypes.string,
        inRange: PropTypes.string,
        outRange: PropTypes.string,
    },
}



