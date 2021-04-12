import React from "react";

import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { useState, useEffect } from "react/cjs/react.development";

const BasicCell = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;
    padding: 5px;
    font-size: 1rem;
    transition: 0.3s all;
    color: #40394a;
    background-color: transparent;
`;

const InCell = styled(BasicCell)`
    cursor: pointer;

    &:hover {
        background-color: #ccc;
    }
`;

const OutCell = styled(BasicCell)`
    color: #ccc;
`;

const SelectedInCell = styled(InCell)`
    color: red;
    box-shadow: 0 0 5px #0005;
`
const SelectedOutCell = styled(OutCell)`
    background-color: #ccc3
`

export default function DayCell({
    day = 0,
    isIn = true,
    isSelected = false,
    inRange = false,
    isToday = false,
    onDayClicked = (day) => {},
}) {
    const [daySelected, setIsSelected] = useState(isSelected);


    const getCell = (selected) => {
        let date = day.getDate();
        if(isIn && selected) return <SelectedInCell onClick={() => onDayClicked(day)}>{date}</SelectedInCell>
        else if(isIn && !selected) return <InCell onClick={() => onDayClicked(day)}>{date}</InCell>
        else if(!isIn && selected) return <SelectedOutCell>{date}</SelectedOutCell>
        if(!isIn && !selected) return <OutCell>{date}</OutCell>
    }

    return (
        <>
            {
                getCell(daySelected)
            }

        </>
    );
}

DayCell.prototype = {
    day: PropTypes.object,
    isIn: PropTypes.bool,
    isSelected: PropTypes.bool,
    inRange: PropTypes.bool,
    isToday: PropTypes.bool,
};
