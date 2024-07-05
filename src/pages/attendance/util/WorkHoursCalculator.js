import React from 'react';

const WorkHoursCalculator = ({ startTime, endTime }) => {
    const calculateWorkHours = (startTime, endTime) => {
        // 출근 시간과 퇴근 시간이 "00:00:00" 형식일 경우를 처리하기 위해 추가적인 로직 필요
        if (!startTime || !endTime || startTime === "00:00:00" || endTime === "00:00:00") {
            return "00:00:00";
        }

        // 시작 시간과 종료 시간을 Date 객체로 변환
        const start = new Date(`1970-01-01T${startTime}`);
        const end = new Date(`1970-01-01T${endTime}`);

        // 시간 차이 계산 (밀리초 단위)
        const diffMs = end.getTime() - start.getTime();

        // 밀리초를 시간, 분, 초로 변환
        let totalSeconds = Math.floor(diffMs / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        // 시간, 분, 초를 '00:00:00' 형식으로 포맷팅
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        return formattedTime;
    };

    const workHours = calculateWorkHours(startTime, endTime);

    return (
        <>
            {workHours}
        </>
    );
};

export default WorkHoursCalculator;