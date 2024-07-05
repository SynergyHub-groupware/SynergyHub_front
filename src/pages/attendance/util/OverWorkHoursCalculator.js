import React from 'react';

const OverWorkHoursCalculator = ({ startTime, endTime, owStartTime, owEndTime }) => {
    const calculateWorkHours = (startTime, endTime, owStartTime, owEndTime) => {
        if (!startTime || !endTime || !owStartTime || !owEndTime ||
            startTime === "00:00:00" || endTime === "00:00:00" || owStartTime === "00:00:00" || owEndTime === "00:00:00") {
            return "00:00:00";
        }

        const start = new Date(`1970-01-01T${startTime}`);
        const end = new Date(`1970-01-01T${endTime}`);
        const owStart = new Date(`1970-01-01T${owStartTime}`);
        const owEnd = new Date(`1970-01-01T${owEndTime}`);

        let totalSeconds;
        if (end > owEnd) {
            totalSeconds = Math.floor((owEnd.getTime() - owStart.getTime()) / 1000);
        } else {
            totalSeconds = Math.floor((end.getTime() - owStart.getTime()) / 1000);
        }

        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        return formattedTime;
    };

    const workHours = calculateWorkHours(startTime, endTime, owStartTime, owEndTime);

    return (
        <>
            {workHours}
        </>
    );
};

export default OverWorkHoursCalculator;
