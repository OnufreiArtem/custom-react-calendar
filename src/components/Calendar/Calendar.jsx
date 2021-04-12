import React, { useState } from "react";

import PropTypes from "prop-types";
import styled, {keyframes} from "styled-components";

import {InCell, OutCell, SelectedInCell, SelectedOutCell, WeekDayCell} from "./StyledCells";

function Calendar({ date, type }) {
    const NUMBER_OF_ROWS = 6;

    const [current, setCurrent] = useState(new Date(date.getTime()));
    const [pointer, setPointer] = useState(new Date(date.getTime()));

    const [selectedDate, setSelectedDate] = useState(undefined);
    const [selectedRangePair, setRangePair] = useState({ 
        first: undefined,
        last: undefined
    })
    const [selectedRange, setSelectedRanges] = useState([]) 

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const weekDayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const CalendarContainer = styled.div`
        box-shadow: 0 0 10px #0005;
        padding: 2rem 1rem;
        border-radius: 5px;
    `;

    const CalendarHeader = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    `;

    const CalendarTitle = styled.span`
        font-size: 2rem;
        font-weight: bold;
        font-family: "Dancing Script", cursive;
    `;
    const MoveArrow = styled.div`
        aspect-ratio: 1/1;
        font-size: 2rem;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.3s all;

        &:hover {
            background-color: #ccc;
        }
    `;

    const DaysContainer = styled.div`
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-column-gap: 10px;
        text-align: center;
    `;

    const Selection = styled.span`
        margin: 5px;
        border-radius: 999px;
        background-color: #ccc;
        font-size: 0.7rem;
        padding: 5px 10px;
    `

    const Divider = styled.hr`
        border: none;
        height: 2px;
        border-radius: 5px;
    `

    const SelectionControl = styled.div``;

    const CalendarFooter = styled.div``;

    const getAllDates = (date) => {
        let mDate = new Date(date.getTime());
        mDate.setDate(0);
        let daysBefore = mDate.getDay();
        mDate.setDate(mDate.getDate() - daysBefore);
        return new Array(7 * NUMBER_OF_ROWS).fill(0).map(() => {
            mDate.setDate(mDate.getDate() + 1);
            return new Date(mDate.getTime());
        });
    };

    const dateFormat = (date) => {
        if(!date) return;
        return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    }

    const dateRangeFormat = (pair) => {
        if(!pair.first || !pair.second) return;
        return `${pair.first.getDate()}-${pair.first.getMonth()}-${pair.first.getFullYear()} - ${pair.second.getDate()}-${pair.second.getMonth()}-${pair.second.getFullYear()}`;
    }

    const ydmEquals = (date1, date2) => {
        return (
            date1?.getDate() === date2?.getDate() &&
            date1?.getFullYear() === date2?.getFullYear() &&
            date1?.getMonth() === date2?.getMonth()
        );
    };

    const movePointerLeft = (_) => {
        let tempDate = new Date(pointer.getTime());
        tempDate.setMonth(tempDate.getMonth() - 1);
        setPointer(tempDate);
    };

    const movePointerRight = (_) => {
        let tempDate = new Date(pointer.getTime());
        tempDate.setMonth(tempDate.getMonth() + 1);
        setPointer(tempDate);
    };

    const onDayClick = (date) => {
        if(type === "single") {
            setSelectedDate(date);

        } else if (type === "range") {
            let obj = Object.assign(selectedRangePair);
            if(obj.first === undefined) obj.first = date;
            else obj.last = date;
            setRangePair(obj)
            console.log(selectedRangePair)
        } 
        
    };

    return (
        <CalendarContainer>
            <CalendarHeader>
                <MoveArrow onClick={() => movePointerLeft()}>
                    <i className="fas fa-chevron-left"></i>
                </MoveArrow>
                <CalendarTitle>{`${
                    monthNames[pointer.getMonth()]
                } ${pointer.getFullYear()}`}</CalendarTitle>
                <MoveArrow onClick={() => movePointerRight()}>
                    <i className="fas fa-chevron-right"></i>
                </MoveArrow>
            </CalendarHeader>
            <DaysContainer>
                {weekDayNames.map((day) => (
                    <WeekDayCell>{day.toUpperCase()}</WeekDayCell>
                ))}

                {
                    getAllDates(pointer).map((day, index) => {

                        if(type === "single") {
                            if(day.getMonth() === pointer.getMonth()) {          
                                return ydmEquals(day, selectedDate) ? <SelectedInCell onClick={() => onDayClick(new Date(0))}>{day.getDate()}</SelectedInCell>
                                    : <InCell onClick={() => onDayClick(day)}>{day.getDate()}</InCell>;
                            } 
                            else {
                                return ydmEquals(day, selectedDate) ? <SelectedOutCell>{day.getDate()}</SelectedOutCell>
                                : <OutCell>{day.getDate()}</OutCell> 
                            }
                        }

                        if(type === "range") {
                            if(day.getMonth() === pointer.getMonth()) {          
                                return ydmEquals(day, selectedDate) ? <SelectedInCell onClick={() => onDayClick(new Date(0))}>{day.getDate()}</SelectedInCell>
                                    : <InCell onClick={() => onDayClick(day)}>{day.getDate()}</InCell>;
                            } 
                            else {
                                return ydmEquals(day, selectedDate) ? <SelectedOutCell>{day.getDate()}</SelectedOutCell>
                                : <OutCell>{day.getDate()}</OutCell> 
                            }
                        }
                         
                    })

                }
                
            </DaysContainer>

            <Divider />
            <SelectionControl>
                {
                    <Selection>{dateFormat(selectedDate)}</Selection>
                    
                }

                {
                    <Selection>{dateRangeFormat(selectedRangePair)}</Selection>
                }
                
            </SelectionControl>
            <Divider />
            <CalendarFooter></CalendarFooter>
        </CalendarContainer>
    );
}

Calendar.prototype = {
    date: PropTypes.date,
};

export default Calendar;
