// util/WeekWorkHoursCalculator.js
import React from 'react';

const WeekWorkHoursCalculator = ({ startTime, endTime }) => {
    const calculateWorkHours = (startTime, endTime) => {
        if (!startTime || !endTime || startTime === "00:00:00" || endTime === "00:00:00") {
            return "00:00:00";
        }

        const start = new Date(`2000-01-01T${startTime}`); // 임의의 날짜 (시간 계산용)
        const end = new Date(`2000-01-01T${endTime}`);     // 임의의 날짜 (시간 계산용)

        const diffMs = end.getTime() - start.getTime();

        let totalSeconds = Math.floor(diffMs / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        return formattedTime;
    };

    const workHours = calculateWorkHours(startTime, endTime);

    return <>{workHours}</>;
};

export default WeekWorkHoursCalculator;
