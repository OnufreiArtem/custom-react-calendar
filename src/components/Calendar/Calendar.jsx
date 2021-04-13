import React, { useState } from "react";

import PropTypes from "prop-types";
import styled, {keyframes} from "styled-components";

import {InCell, OutCell, SelectedInCell, SelectedOutCell, WeekDayCell, RangeInCell, RangeOutCell} from "./StyledCells";

function Calendar({ date, type }) {
    const NUMBER_OF_ROWS = 6;

    const [current, setCurrent] = useState(new Date(date.getTime()));
    const [pointer, setPointer] = useState(new Date(date.getTime()));

    const [selectedDate, setSelectedDate] = useState(undefined);
    
    const [selectedRangePair, setRangePair] = useState({ 
        first: undefined,
        last: undefined
    })
    const [selectedRanges, setSelectedRanges] = useState([{ 
        first: undefined,
        last: undefined
    }]) 
    const [selectedRangesIndex, setSelectedRangesIndex] = useState(0)

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
        padding: 1rem 1rem;
        border-radius: 5px;
    `;

    const CalendarHeader = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        color: #153e90;
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
        color: #153e90;
        transition: 0.3s all;

        &:hover {
            background-color: #ccc;
        }
    `;

    const DaysContainer = styled.div`
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-column-gap: 10px;
        grid-row-gap: 10px;
        text-align: center;
    `;

    const Selection = styled.span`
        display: inline-block;
        margin: 5px;
        border-radius: 999px;
        background-color: #153e90;
        color: #fff;
        font-size: 0.7rem;
        padding: 5px 10px;
        transition: .3s all;
        ${
            props => { if(props.selected) return "transform: scale(1.2);"}
        }
        
    `

    const Divider = styled.hr`
        border: none;
        height: 2px;
        border-radius: 5px;
    `

    const SelectionControl = styled.div`
        padding: 1rem;
    `;
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
        return `${pair.first !== undefined ? dateFormat(pair.first) : "_"} - ${pair.last !== undefined ? dateFormat(pair.last) : "_"}`;
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
        setSelectedDate(date);
    };

    const setStart = (date) => {
        let obj = {
            first: selectedRangePair.first,
            last: selectedRangePair.last,
        };

        obj.first = date;
        if(obj.last !== undefined && obj.first > obj.last) [obj.first, obj.last] = [obj.last, obj.first];
        setRangePair(obj)
    }

    const setEnd = (date) => {
        let obj = {
            first: selectedRangePair.first,
            last: selectedRangePair.last,
        };

        obj.last = date;
        if(obj.first !== undefined && obj.first > obj.last) [obj.first, obj.last] = [obj.last, obj.first];
        setRangePair(obj)
    }

    const onRangeDayClick = (date, e) => {
        if(e === undefined || ydmEquals(date, selectedRangePair.first) || ydmEquals(date, selectedRangePair.last)) return;

        if(e.shiftKey) {
            setEnd(date);
        } else {
            setStart(date)
        }
    };

    const setStartInRange = (date, index) => {
        let obj = {
            first: selectedRanges[index].first,
            last: selectedRanges[index].last,
        };

        obj.first = date;
        if(obj.last !== undefined && obj.first > obj.last) [obj.first, obj.last] = [obj.last, obj.first];
        setRangePair(obj)
    }

    const setEndInRange = (date, index) => {
        let obj = {
            first: selectedRanges[index].first,
            last: selectedRanges[index].last,
        };

        obj.last = date;
        if(obj.first !== undefined && obj.first > obj.last) [obj.first, obj.last] = [obj.last, obj.first];
        setRangePair(obj)
    }

    const onMultiRangeDayClick = (date, index, e) => {
        if(e === undefined || ydmEquals(date, selectedRangePair.first) || ydmEquals(date, selectedRangePair.last)) return;

        if(e.shiftKey) {
            setEndInRange(date, index);
        } else {
            setStartInRange(date, index)
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
                    getAllDates(pointer).map((day) => {
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
                                
                                if(ydmEquals(day, selectedRangePair.first) || ydmEquals(day, selectedRangePair.last)) {
                                    return <SelectedInCell onClick={(e) => onRangeDayClick(day, e)}>{day.getDate()}</SelectedInCell>
                                } else {
                                    if(day > selectedRangePair.first && day < selectedRangePair.last) {
                                        return <RangeInCell onClick={(e) => onRangeDayClick(day, e)}>{day.getDate()}</RangeInCell>;
                                    } else {
                                        return <InCell onClick={(e) => onRangeDayClick(day, e)}>{day.getDate()}</InCell>;
                                    }
                                }
                            } 
                            else {
                                if(ydmEquals(day, selectedRangePair.first) || ydmEquals(day, selectedRangePair.last)) {
                                    return <SelectedOutCell>{day.getDate()}</SelectedOutCell>
                                } else {
                                    if(day > selectedRangePair.first && day < selectedRangePair.last) {
                                        return <RangeOutCell>{day.getDate()}</RangeOutCell>;
                                    } else {
                                        return <OutCell>{day.getDate()}</OutCell>;
                                    }
                                }
                            }
                        }

                        if(type === "multiRange") {
                            if(day.getMonth() === pointer.getMonth()) {
                                
                                if(ydmEquals(day, selectedRanges[selectedRangesIndex].first) || ydmEquals(day, selectedRangePair.last)) {
                                    return <SelectedInCell onClick={(e) => onMultiRangeDayClick(day, selectedRangesIndex, e)}>{day.getDate()}</SelectedInCell>
                                } else {
                                    if(day > selectedRanges[selectedRangesIndex].first && day < selectedRanges[selectedRangesIndex].last) {
                                        return <RangeInCell onClick={(e) => onMultiRangeDayClick(day, selectedRangesIndex, e)}>{day.getDate()}</RangeInCell>;
                                    } else {
                                        return <InCell onClick={(e) => onMultiRangeDayClick(day, selectedRangesIndex, e)}>{day.getDate()}</InCell>;
                                    }
                                }
                            } 
                            else {
                                if(ydmEquals(day, selectedRanges[selectedRangesIndex].first) || ydmEquals(day, selectedRanges[selectedRangesIndex].last)) {
                                    return <SelectedOutCell>{day.getDate()}</SelectedOutCell>
                                } else {
                                    if(day > selectedRanges[selectedRangesIndex].first && day < selectedRanges[selectedRangesIndex].last) {
                                        return <RangeOutCell>{day.getDate()}</RangeOutCell>;
                                    } else {
                                        return <OutCell>{day.getDate()}</OutCell>;
                                    }
                                }
                            }
                        }
                         
                    })

                }
                
            </DaysContainer>

            <Divider />
            <SelectionControl>
                {
                    (() => {
                        if(type==="single") return <Selection>{dateFormat(selectedDate)}</Selection>
                        else if(type==="range") return <Selection>{dateRangeFormat(selectedRangePair)}</Selection>
                        else if(type==="multiRange") 
                            return selectedRanges.map((obj, index) => <Selection selected={index === selectedRangesIndex}
                                 onClick={() => {setSelectedRangesIndex(index);}}>{dateRangeFormat(obj)}</Selection>)
                    })()
                }
                {
                    (()=> {
                        if(type==="multiRange") {
                            <Selection onClick={() => {
                                setSelectedRanges([...selectedRanges, { 
                                    first: undefined,
                                    last: undefined
                                }]);
                                setSelectedRangesIndex(selectedRanges.length - 1);
                            }}>+</Selection>
                        }
                    })()
                }
                
            </SelectionControl>
        </CalendarContainer>
    );
}

Calendar.prototype = {
    date: PropTypes.date,
};

export default Calendar;
