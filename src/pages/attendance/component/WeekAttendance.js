import React from 'react';
import { useSelector } from 'react-redux';
import WorkHoursCalculator from "../util/WorkHoursCalculator";

const WeekAttendance = ({ isOpen, toggle }) => {
    const attendances = useSelector((state) => state.attendanceReducer.attendances);

    return (
        <div>
            <section className={`time_table bl_sect el_shadowD4 section2 ${isOpen ? 'go' : ''}`}>
                <ul className="bl_listRing" style={{ paddingTop: '30px', paddingRight: '10px' }}>
                    {attendances && attendances.length > 0 ? (
                        attendances.map((dayData, index) => (
                            <li className="bl_tnaWeek" key={index}>
                                <div className="ly_spaceBetween ly_fitemC">
                                    <div className="hp_fw700 hp_fs18 bl_tnaWeek__ttl letter03">{dayData.atdDate}</div>
                                    <ul className="ly_spaceBetween ly_fgrow1 bl_tnaWeek__list">
                                        <li className=""><b className="hp_fw700">출근</b> &nbsp;{dayData.startTime !== null ? dayData.startTime : "00:00:00"}</li>
                                        <li className=""><b className="hp_fw700">퇴근</b> &nbsp;{dayData.endTime !== null ? dayData.endTime : "00:00:00"}</li>
                                        <li className=""><b className="hp_fw700">초과</b> &nbsp;00:00:00</li>
                                        <li className=""><b className="hp_fw700">총 근무시간</b> &nbsp;
                                            {dayData.startTime !== null && dayData.endTime !== null ? (
                                                <WorkHoursCalculator startTime={dayData.startTime} endTime={dayData.endTime} />
                                            ) : (
                                                "00:00:00"
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="bl_tnaWeek">데이터가 없습니다.</li>
                    )}
                </ul>
            </section>
        </div>
    );
};

export default WeekAttendance;
