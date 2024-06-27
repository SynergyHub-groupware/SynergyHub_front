import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TimeComponent from './util/TimeComponent';
import TodayDateComponent from './util/TodayDateComponent';
import '../../css/timeAndAttendance.css';
import MonthWeekComponent from './util/MonthWeekComponent';
import TodayDate2Component from './util/TodayDate2Component';
import {callAttendanceTodayAPI, callMyAttendanceForWeekAPI, callMyInfoAPI} from '../../apis/AttendancelAPICalls'; // 출퇴근 시간 등록 API import 추가
import WeekAttendance from './table/WeekAttendance';
import AttendanceButton from "./button/AttendanceButton";

function MyAttendance() {
    const dispatch = useDispatch();
    const employee = useSelector((state) => state.attendanceReducer.employee);
    const attendances = useSelector((state) => state.attendanceReducer.attendances);
    const attendancesToday = useSelector((state) => state.attendanceReducer.attendanceToday);

    useEffect(() => {
        dispatch(callMyInfoAPI());
        dispatch(callMyAttendanceForWeekAPI());
        dispatch(callAttendanceTodayAPI());
    }, [dispatch]);

    const [isOpenFirst, setIsOpenFirst] = useState(true);
    const [isOpenSecond, setIsOpenSecond] = useState(false);
    const [isOpenThird, setIsOpenThird] = useState(false);
    const [isOpenFourth, setIsOpenFourth] = useState(false);

    const toggleFirst = () => {
        setIsOpenFirst((prev) => !prev);
    };

    const toggleSecond = () => {
        setIsOpenSecond((prev) => !prev);
    };

    const toggleThird = () => {
        setIsOpenThird((prev) => !prev);
    };

    const toggleFourth = () => {
        setIsOpenFourth((prev) => !prev);
    };

    return (
        <>
            <div className="ly_cont ly_flex">
                <div className="hp_mr50">
                    <div style={{ position: "sticky" }}>
                        <section className="bl_sect hp_padding30 el_shadowD4 hp_mb30 section1">
                            <div className="hp_fw700"><TodayDateComponent/></div>
                            <div className="ly_spaceBetween ly_fitemC hp_mt5">
                                <div className="hp_fw700 hp_fs28"><TimeComponent/></div>
                                <ul className="hp_alignR">
                                    <li className=""><b className="hp_fw700 hp_mr5">출근 시간</b> {attendancesToday?.startTime || '-'} </li>
                                    <li className=""><b className="hp_fw700 hp_mr5">퇴근 시간</b> {attendancesToday?.endTime || '-'}</li>
                                </ul>
                            </div>
                            <AttendanceButton />
                        </section>
                        <section className="bl_sect hp_padding30 el_shadowD4 hp_mb30 section1">
                            <div className="hp_fw700">지정 근무시간</div>
                            <div className="ly_spaceBetween ly_fitemC hp_mt5">
                                <div className="hp_fw700 hp_fs28">{employee.dept_title}</div>
                                <ul className="hp_alignR">
                                    <li className=""><b className="hp_fw700 hp_mr5">출근 가능 시간</b> 00:00:00</li>
                                    <li className=""><b className="hp_fw700 hp_mr5">퇴근 가능 시간</b> 00:00:00</li>
                                </ul>
                            </div>
                            <button type="button" className="el_btn8Back el_btnF hp_mt20 hp_fs16">변경하기</button>
                        </section>
                        <section className="bl_sect hp_padding30 el_shadowD4 hp_mb30 section1">
                            <div className="ly_spaceBetween">
                                <div className="hp_fw700">연차 사용 현황</div>
                            </div>
                            <div className="hp_fw700 hp_fs28 hp_mt5">1 / 15 <span className="hp_fs16">일</span></div>
                            <div className="hp_mt15">막대그래프 자리</div>
                            <ul className="hp_mt15">
                                <li className=""><b className="hp_fw700 hp_mr15">총 부여 연차</b> 15일</li>
                                <li className=""><b className="hp_fw700 hp_mr15">총 잔여 연차</b> 13일</li>
                            </ul>
                        </section>
                    </div>
                </div>
                <div>
                    <section style={{paddingLeft: '10px'}}>
                        <div className="ly_fitemC hp_mb30" style={{display: 'flex'}}>
                            <div className="ly_flex ly_fitemC">
                                <h4 className="el_lv1Head">나의 근태 현황</h4>
                            </div>
                            <div style={{paddingLeft: '15px'}}>
                                <button
                                    type="button"
                                    className="el_btn0Back el_btnD hp_fs20"
                                    style={{paddingBottom: '3px'}}
                                >
                                    <TodayDate2Component/>
                                </button>
                            </div>
                        </div>
                    </section>
                    <section
                        className="bl_sect hp_padding40 el_shadowD4 hp_mb20"
                        style={{position: 'relative', width: '900px', zIndex: '2'}}
                    >
                        <div className="hp_fw700">
                            <MonthWeekComponent/>
                        </div>
                        <div className="ly_spaceBetween hp_mt5">
                            <div className="">
                                <div className="hp_fw700 hp_fs32">18h 00m</div>
                                <div className="hp_mt15" style={{paddingBottom: '5px'}}>
                                    막대그래프 자리
                                </div>
                                <ul className="hp_mt15">
                                    <li className="" style={{paddingBottom: '5px'}}>
                                        <b className="hp_fw700 hp_mr15">누적 정규 근무</b> 00:00:00
                                    </li>
                                    <li className="">
                                        <b className="hp_fw700 hp_mr15">누적 초과 근무</b> 00:00:00
                                    </li>
                                </ul>
                            </div>
                            <div className="ly_spaceBetween ly_fdirecCol ly_fitemEnd">
                                <div className="hp_fw700 hp_fs22 hp_alignR">
                                    {employee.emp_name} {employee.position_name}님
                                    <br />
                                    오늘도 좋은 하루 되세요! 😊
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="el_btn0Back el_btnF hp_mt20 hp_fs16"
                                        style={{ width: '200px' }}
                                    >
                                        일정 확인하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <section
                            className={`bl_sect el_shadowD4 section2_title ${isOpenFirst ? 'go' : ''}`}
                            onClick={toggleFirst}
                        >
                            <div className="ly_flex ly_fitemC">
                                <h4 style={{ fontSize: '20px' }}>
                                    <b>📅&nbsp;&nbsp;&nbsp;금주 근태 현황</b>
                                </h4>
                            </div>
                        </section>
                        <WeekAttendance weekData={attendances} isOpen={isOpenFirst} toggle={toggleFirst} />
                    </section>
                    <section>
                        <section
                            className={`bl_sect el_shadowD4 section2_title ${isOpenSecond ? 'go' : ''}`}
                            onClick={toggleSecond}
                        >
                            <div className="ly_flex ly_fitemC">
                                <h4 style={{ fontSize: '20px' }}>
                                    <b>🚗&nbsp;&nbsp;&nbsp;출장 신청 현황</b>
                                </h4>
                            </div>
                        </section>
                        <WeekAttendance weekData={attendances} isOpen={isOpenSecond} toggle={toggleSecond} />
                    </section>
                    <section>
                        <section
                            className={`bl_sect el_shadowD4 section2_title ${isOpenThird ? 'go' : ''}`}
                            onClick={toggleThird}
                        >
                            <div className="ly_flex ly_fitemC">
                                <h4 style={{ fontSize: '20px' }}>
                                    <b>⏰&nbsp;&nbsp;&nbsp;초과 신청 현황</b>
                                </h4>
                            </div>
                        </section>
                        <WeekAttendance weekData={attendances} isOpen={isOpenThird} toggle={toggleThird} />
                    </section>
                    <section>
                        <section
                            className={`bl_sect el_shadowD4 section2_title ${isOpenFourth ? 'go' : ''}`}
                            onClick={toggleFourth}
                        >
                            <div className="ly_flex ly_fitemC">
                                <h4 style={{ fontSize: '20px' }}>
                                    <b>🎈&nbsp;&nbsp;&nbsp;휴가 신청 현황</b>
                                </h4>
                            </div>
                        </section>
                        <WeekAttendance weekData={attendances} isOpen={isOpenFourth} toggle={toggleFourth} />
                    </section>
                </div>
                <div className="" style={{ paddingLeft: '60px' }}>
                    <section className="bl_sect hp_padding20 el_shadowD4 hp_mb30 section3">
                        <div>
                            <p className="hp_fw700 section3_title">빠른 메뉴</p>
                        </div>
                        <div>
                            <button type="button" className="el_btn0Back el_btnF hp_mt10 section3_btn">
                                출장 신청
                            </button>
                            <button type="button" className="el_btn0Back el_btnF hp_mt10 section3_btn">
                                초과 신청
                            </button>
                            <button type="button" className="el_btn0Back el_btnF hp_mt10 section3_btn">
                                휴가 신청
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default MyAttendance;
