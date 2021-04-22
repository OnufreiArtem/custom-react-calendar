import React, { useState } from "react";
import { nanoid } from 'nanoid'

import PropTypes from "prop-types";

import { WeekDayCell} from "./StyledCells";
import { CalendarContainer, CalendarHeader, CalendarTitle, MoveArrow, DaysContainer, Selection, Divider, SelectionControl, SelectionCloseBtn} from "./StyledCalendarLayouts"
import { sameMonths, ydmEquals, addMonth, dateFormat, dateRangeFormat, dateBetween } from "./CalendarUtils";
import { monthNames, weekDayNames, NUMBER_OF_ROWS} from "./Constants";

import CalendarCell from "./CalendarCell";

function Calendar({ date, type }) {

    const [pointer, setPointer] = useState(new Date(date.getTime()));

    const [selectedDate, setSelectedDate] = useState(undefined);
    
    const [selectedRanges, setSelectedRanges] = useState([{ 
        first: undefined,
        last: undefined
    }]) 

    const [selectedRangesIndex, setSelectedRangesIndex] = useState(0)

    const getAllDates = (date) => {
        const mDate = new Date(date.getTime());
        mDate.setDate(0);
        const daysBefore = mDate.getDay();
        mDate.setDate(mDate.getDate() - daysBefore);
        return new Array(7 * NUMBER_OF_ROWS).fill(0).map(() => {
            mDate.setDate(mDate.getDate() + 1);
            return new Date(mDate.getTime());
        });
    };

    const onDayClick = (date) => setSelectedDate(ydmEquals(selectedDate, date) ? undefined : date);

    const setStart = (date, index) => {
        const obj = {
            first: selectedRanges[index].first,
            last: selectedRanges[index].last,
        };

        obj.first = date;
        if(obj.last !== undefined && obj.first > obj.last) [obj.first, obj.last] = [obj.last, obj.first];
        setSelectedRanges(selectedRanges.map((range, idx) => idx === index ? obj : range))
    }

    const setEnd = (date, index) => {
        const obj = {
            first: selectedRanges[index].first,
            last: selectedRanges[index].last,
        };

        obj.last = date;
        if(obj.first !== undefined && obj.first > obj.last) [obj.first, obj.last] = [obj.last, obj.first];
        setSelectedRanges(selectedRanges.map((range, idx) => idx === index ? obj : range))
    }

    const onRangeDayClick = (e, date, index) => {
        if(e === undefined || ydmEquals(date, selectedRanges[index].first) || ydmEquals(date, selectedRanges[index].last)) return;
        e.shiftKey ? setEnd(date, index) : setStart(date, index);
    };

    const onRemoveSelection = (selectionIndex) => {
        let rangesLeft = selectedRanges.filter((_, index) => index !== selectionIndex);
        if(rangesLeft.length <= 0) rangesLeft.push({first: undefined, last: undefined}) ;
        setSelectedRanges( rangesLeft );
        setSelectedRangesIndex(0);
    }

    return (
        <CalendarContainer>
            <CalendarHeader>
                <MoveArrow onClick={() => setPointer(addMonth(pointer, -1))}>
                    <i className="fas fa-chevron-left"></i>
                </MoveArrow>
                <CalendarTitle>{`${
                    monthNames[pointer.getMonth()]
                } ${pointer.getFullYear()}`}</CalendarTitle>
                <MoveArrow onClick={() => setPointer(addMonth(pointer, 1))}>
                    <i className="fas fa-chevron-right"></i>
                </MoveArrow>
            </CalendarHeader>
            <DaysContainer>
                {weekDayNames.map((day) => (
                    <WeekDayCell key={nanoid()}>{day.toUpperCase()}</WeekDayCell>
                ))}

                {
                    getAllDates(pointer).map((day) => {

                        let isInMonth = sameMonths(day, pointer);
                        let isSelected = false;
                        let isInRange = false;
                        let clickFunc = undefined;

                        switch(type) {
                            case "single":
                                isSelected = ydmEquals(day, selectedDate);
                                clickFunc = () => onDayClick(day)
                                break;
                            case "range":
                                isSelected = ydmEquals(day, selectedRanges[0]?.first) || ydmEquals(day, selectedRanges[0]?.last);
                                isInRange = dateBetween(day, selectedRanges[0]?.first, selectedRanges[0]?.last);
                                clickFunc = (e) => onRangeDayClick(e, day, 0);
                                break;
                            case "multiRange":
                                isSelected = ydmEquals(day, selectedRanges[selectedRangesIndex]?.first) || ydmEquals(day, selectedRanges[selectedRangesIndex]?.last);
                                isInRange = dateBetween(day, selectedRanges[selectedRangesIndex]?.first, selectedRanges[selectedRangesIndex]?.last);
                                clickFunc = (e) => onRangeDayClick(e, day, selectedRangesIndex);   
                                break;  
                            default:
                                break;  
                        }

                        return <CalendarCell onClick={clickFunc}
                                key={nanoid()} inMonth={isInMonth} selected={isSelected} inRange={isInRange}>{day.getDate()}</CalendarCell>
                    })

                }
                
            </DaysContainer>

            <Divider />

            <SelectionControl>

            {
                ( () => {
                    if(type === "single" && selectedDate !== undefined) {
                        return <Selection>{dateFormat(selectedDate)}</Selection> 
                        
                    } else if(type === "range" && !(selectedRanges[0].first === undefined && selectedRanges[0].last === undefined)) {
                        return <Selection>
                            <span>{dateRangeFormat(selectedRanges[selectedRangesIndex])}</span> 
                            <SelectionCloseBtn onClick={() => onRemoveSelection(0)} className="fas fa-times" />
                        </Selection>

                    } else if(type === "multiRange") {
                        return <>
                            <Selection onClick={() => {
                                    setSelectedRanges([...selectedRanges, { 
                                        first: undefined,
                                        last: undefined
                                    }]);
                                    setSelectedRangesIndex(selectedRanges.length);
                            }}>Add range</Selection>

                            {
                                selectedRanges.map((obj, index) => 
                                <Selection key={nanoid()} selected={index === selectedRangesIndex} onClick={() => { setSelectedRangesIndex(index); }}>
                                    <span>{dateRangeFormat(obj)}</span> 
                                    <SelectionCloseBtn onClick={() => onRemoveSelection(index)} className="fas fa-times" />
                                </Selection>)
                            }
                        </>    
                    }
                } )()

            }

            </SelectionControl>
        </CalendarContainer>
    );
}

Calendar.propTypes = {
    type: PropTypes.string,
    date: PropTypes.object,
};

export default Calendar;
