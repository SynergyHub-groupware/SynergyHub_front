import React, { useEffect, useState } from 'react';
import '../css/main.css';
import Header from "../components/commons/Header";
import PheedComponent from "./pheed/PheedComponent";
import { useDispatch, useSelector } from "react-redux";
import {
    callAbsenteeAPI,
    callAttendanceTodayAPI,
    callBirthEmpAPI, callMsgAPI,
    callMyInfoAPI,
    callNoticeAPI,
    callTaskAPI,
} from "../apis/AttendancelAPICalls";
import AttendanceSummary from "./attendance/component/AttendanceSummary";

function Main() {
    const dispatch = useDispatch();
    const employee = useSelector((state) => state.attendanceReducer.employee);
    const attendancesToday = useSelector((state) => state.attendanceReducer.attendanceToday);
    const absentee = useSelector((state) => state.attendanceReducer.absentee);
    const birthEmp = useSelector((state) => state.attendanceReducer.birth);
    const task = useSelector((state) => state.attendanceReducer.task);
    const msg = useSelector((state) => state.attendanceReducer.msg);
    const notice = useSelector((state) => state.attendanceReducer.notice);

    useEffect(() => {
        // 필요한 API 호출
        dispatch(callMyInfoAPI());
        dispatch(callAttendanceTodayAPI());
        dispatch(callAbsenteeAPI());
        dispatch(callBirthEmpAPI());
        dispatch(callTaskAPI());
        dispatch(callMsgAPI());
        dispatch(callNoticeAPI());
    }, [dispatch]);

    return (
        <>
            <Header />
            <div className="ly_body">
                <div className="ly_cont ly_flex">
                    <div className="ly_flex ly_fdirecCol hp_w400px ly_fshirnk">
                        <section className="bl_sect hp_padding30 el_shadowD4 hp_mb30  bl_mainProfile" style={{ width: '370px', height: '320px' }}>
                            <a className="bl_mainProfile__img hp_mb15" href=""></a>
                            <ul className="hp_alignC">
                                <li className="hp_fs20 hp_fw700">{employee?.emp_name}</li>
                                <li className="hp_mt20">
                                    <a className="hp_fs16" href="">쪽지함 <b className="bl_mainProfile__alarm">{msg.length}</b></a>
                                    <span className="hp_ml20 hp_mr20 hp_fw700 hp_7Color">|</span>
                                    <a className="hp_fs16" href="">내 업무 <b className="bl_mainProfile__alarm">{task.length}</b></a>
                                </li>
                            </ul>
                        </section>
                        <AttendanceSummary attendancesToday={attendancesToday} />
                        <section className="bl_sect hp_padding30 el_shadowD4" style={{width: '370px'}}>
                            <div className="hp_fw700">공지사항</div>
                            <div>

                            </div>
                        </section>
                    </div>
                    <div className="ly_fgrow1 hp_ml30" style={{width: '1100px'}}>
                        <PheedComponent/>
                    </div>
                    <div className="hp_ml30 ly_flex ly_fdirecCol hp_w300px ly_fshirnk" style={{ height: '800px' }}>
                        <section className="bl_sect el_shadowD4 hp_mb30 hp_h50" style={{padding: '20px'}}>
                            <div className="ly_spaceBetween ly_fitemC">
                                <h5 className="hp_fw700 hp_fs18 hp_mb15">부재자</h5>
                            </div>
                            <div style={{ maxHeight: '270px', overflowY: 'auto' }}>
                                <dl className="hp_bordTEB hp_pt10">
                                    {absentee && absentee.length > 0 ? (
                                        absentee.map((person, index) => (
                                            <dd key={index} className="ly_spaceBetween ly_fitemC hp_mt20">
                                                <div className="ly_flex ly_fitemC">
                                                    <div className="bl_miniProfile__img" style={{ width: '45px', height: '45px' }}></div>
                                                    <ul className="hp_ml10">
                                                        <li>{person.empName}</li>
                                                        <li className="hp_7Color hp_fs13">
                                                            {person.deptTitle || person.subTitle || person.parTitle || "-"}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className={`bl_miniLabel ${getLabelClassName(person.attendanceStatus)}`}>
                                                    {person.attendanceStatus ? person.attendanceStatus.atsName : "-"}
                                                </div>
                                            </dd>
                                        ))
                                    ) : (
                                        <dd>-</dd>
                                    )}
                                </dl>
                            </div>
                        </section>
                        <section className="bl_sect el_shadowD4 hp_mb30 hp_h50" style={{ padding: '20px' }}>
                            <div className="ly_spaceBetween ly_fitemC">
                                <h5 className="hp_fw700 hp_fs18 hp_mb10">이달의 생일자</h5>
                            </div>
                            <div style={{ maxHeight: '270px', overflowY: 'auto' }}>
                                <dl className="hp_bordTEB hp_pt10">
                                    {birthEmp && birthEmp.length > 0 ? (
                                        birthEmp.map((person, index) => (
                                            <dd key={index} className="ly_spaceBetween ly_fitemC hp_mt20">
                                                <div className="ly_flex ly_fitemC">
                                                    <div className="bl_miniProfile__img" style={{ width: '45px', height: '45px' }}></div>
                                                    <ul className="hp_ml10">
                                                        <li>{person.emp_name}</li>
                                                        <li className="hp_7Color hp_fs13">
                                                            {person.dept_title || "-"}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="bl_miniLabel bl_miniLabel__1 hp_mr10">
                                                    {person.social_security_no ? formatDate(person.social_security_no) : "-"}
                                                </div>
                                            </dd>
                                        ))
                                    ) : (
                                        <dd>-</dd>
                                    )}
                                </dl>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

const formatDate = (dateString) => {
    const parts = dateString.split('-');
    if (parts.length === 3) {
        const [, month, day] = parts;
        return `${month}월 ${day}일`;
    } else {
        return dateString;
    }
};

const getLabelClassName = (attendanceStatus) => {
    if (!attendanceStatus) return "";
    switch (attendanceStatus.atsName) {
        case "휴가":
            return "bl_miniLabel__1";
        case "교육":
        case "훈련":
            return "bl_miniLabel__2";
        default:
            return "bl_miniLabel__3";
    }
};

export default Main;
