// util/WorkHoursCalculator.js
import React from 'react';

const WorkHoursCalculator = ({ date, startTime, endTime }) => {
    const calculateWorkHours = (date, startTime, endTime) => {
        if (!date || !startTime || !endTime || startTime === "00:00:00" || endTime === "00:00:00") {
            return "00:00:00";
        }

        const start = new Date(`${date}T${startTime}`);
        const end = new Date(`${date}T${endTime}`);

        // 주말인지 확인
        if (start.getDay() === 6 || start.getDay() === 0) {
            return "-";
        }

        const diffMs = end.getTime() - start.getTime();

        let totalSeconds = Math.floor(diffMs / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        return formattedTime;
    };

    const workHours = calculateWorkHours(date, startTime, endTime);

    return (
        <>
            {workHours}
        </>
    );
};

export default WorkHoursCalculator;
