import React, { useEffect, useState } from 'react';
import TodayDateComponent from "../util/TodayDateComponent";
import PagingBar from "../../../components/commons/PagingBar";

const PreferencesAttendance = ({ todayData, isOpen, departmentsData, userRoleData, employee }) => {
    const [filteredData, setFilteredTodayData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 페이지당 결과 계산
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = filteredData.slice(indexOfFirstResult, indexOfLastResult);
    const totalPages = Math.ceil(filteredData.length / resultsPerPage);

    // 상태 설정 함수
    const [all, setAll] = useState(0);
    const [checkIn, setCheckIn] = useState(0);
    const [late, setLate] = useState(0);
    const [NoCheckIn, setNoCheckIn] = useState(0);
    const [dayOff, setDayOff] = useState(0);
    const [fieldWork, setFieldWork] = useState(0);
    const [business, setBusiness] = useState(0);

    useEffect(() => {
        const { empTitle, deptCode } = userRoleData;
        if (empTitle === 'T2' && deptCode === 'D2') {
            const myDept = departmentsData.find(dep => dep.name === '전략기획부');
            if (myDept) {
                // 내 하위부서 탐색
                const allSubDepts = myDept.subDepartments;

                const filteredData = todayData.filter(data => allSubDepts.some(subDept => subDept.name === data.subTitle));

                const sortedData = filteredData.sort((a, b) => {
                    const isDepartmentHeadA = a.empTitle === '부서장';
                    const isDepartmentHeadB = b.empTitle === '부서장';
                    if (isDepartmentHeadA && !isDepartmentHeadB) return -1;
                    if (!isDepartmentHeadA && isDepartmentHeadB) return 1;
                    const isTeamLeaderA = a.empTitle === '팀장';
                    const isTeamLeaderB = b.empTitle === '팀장';
                    if (isTeamLeaderA && !isTeamLeaderB) return -1;
                    if (!isTeamLeaderA && isTeamLeaderB) return 1;
                    if (a.deptTitle == null) return 1;
                    if (b.deptTitle == null) return -1;
                    return a.deptTitle.localeCompare(b.deptTitle);
                });
                setFilteredTodayData(sortedData);
                setCheckIn(sortedData.filter(data => data.attendanceStatus.atsName === '출근').length);
                const lateCount1 = sortedData.filter(data => data.attendanceStatus.atsName === '지각').length;
                const lateCount2 = sortedData.filter(data => data.attendanceStatus.atsName === '미출근').length;
                setLate(lateCount1 + lateCount2);
                setNoCheckIn(sortedData.filter(data => data.attendanceStatus.atsName === '결근').length);
                setDayOff(sortedData.filter(data => data.attendanceStatus.atsName === '휴가').length);
                setFieldWork(sortedData.filter(data => data.attendanceStatus.atsName === '외근').length);
                setBusiness(sortedData.filter(data => data.attendanceStatus.atsName === '출장').length);
                setAll(checkIn + lateCount1 + lateCount2 + NoCheckIn + dayOff + fieldWork + business);
            }
        } else if (empTitle === 'T2' && deptCode === 'D3') {
            const myDept = departmentsData.find(dep => dep.name === '경영지원부');
            if (myDept) {
                // 내 하위부서 탐색
                const allSubDepts = myDept.subDepartments;

                const filteredData = todayData.filter(data => allSubDepts.some(subDept => subDept.name === data.subTitle));

                const sortedData = filteredData.sort((a, b) => {
                    const isDepartmentHeadA = a.empTitle === '부서장';
                    const isDepartmentHeadB = b.empTitle === '부서장';
                    if (isDepartmentHeadA && !isDepartmentHeadB) return -1;
                    if (!isDepartmentHeadA && isDepartmentHeadB) return 1;
                    const isTeamLeaderA = a.empTitle === '팀장';
                    const isTeamLeaderB = b.empTitle === '팀장';
                    if (isTeamLeaderA && !isTeamLeaderB) return -1;
                    if (!isTeamLeaderA && isTeamLeaderB) return 1;
                    if (a.deptTitle == null) return 1;
                    if (b.deptTitle == null) return -1;
                    return a.deptTitle.localeCompare(b.deptTitle);
                });
                setFilteredTodayData(sortedData);
                setCheckIn(sortedData.filter(data => data.attendanceStatus.atsName === '출근').length);
                const lateCount1 = sortedData.filter(data => data.attendanceStatus.atsName === '지각').length;
                const lateCount2 = sortedData.filter(data => data.attendanceStatus.atsName === '미출근').length;
                setLate(lateCount1 + lateCount2);
                setNoCheckIn(sortedData.filter(data => data.attendanceStatus.atsName === '결근').length);
                setDayOff(sortedData.filter(data => data.attendanceStatus.atsName === '휴가').length);
                setFieldWork(sortedData.filter(data => data.attendanceStatus.atsName === '외근').length);
                setBusiness(sortedData.filter(data => data.attendanceStatus.atsName === '출장').length);
                setAll(checkIn + lateCount1 + lateCount2 + NoCheckIn + dayOff + fieldWork + business);
            }
        }
    }, [todayData, departmentsData, userRoleData]);

    return (
        <>
            <section
                className="bl_sect hp_padding40 el_shadowD4 hp_mb20"
                style={{position: 'relative', width: '900px', zIndex: '2'}}
            >
                <div className="hp_fw700 hp_fs22 ly_flexC hp_mb5">
                    {employee.emp_name} {employee.position_name}님,
                </div>
                <div className="hp_fs22 hp_mb40 ly_flexC" style={{ textAlign: 'center' }}>
                    지금np 팀원들의 근태 현황을 확인해보세요. 🕵️‍♀️
                </div>
                <div className="">
                    <div className="hp_mt30" style={{ width: '300px' }}>
                        <table className="ly_fitemC hp_ml40">
                        <colgroup>
                                <col style={{width: "20px"}}/>
                                <col style={{width: "20px"}}/>
                                <col style={{width: "20px"}}/>
                                <col style={{width: "20px"}}/>
                                <col style={{width: "20px"}}/>
                                <col style={{width: "20px"}}/>
                            </colgroup>
                            <thead className="">
                            <tr>
                                <th>
                                    <div className="bl_tna__label4 hp_lh2-5 hp_mr15 hp_mb15">
                                        <p style={{color: "white"}}>전체인원</p>
                                    </div>
                                </th>
                                <th>
                                    <div className="bl_tna__label3 hp_lh2-5 hp_mr15 hp_mb15">
                                        <p style={{color: "#006CD0FF"}}>출근인원</p>
                                    </div>
                                </th>
                                <th>
                                    <div className="bl_tna__label3 hp_lh2-5 hp_mr15 hp_mb15">
                                        <p style={{color: "#006CD0FF"}}>지각인원</p>
                                    </div>
                                </th>
                                <th>
                                    <div className="bl_tna__label3 hp_lh2-5 hp_mr15 hp_mb15">
                                        <p style={{color: "#006CD0FF"}}>결근인원</p>
                                    </div>
                                </th>
                                <th>
                                    <div className="bl_tna__label3 hp_lh2-5 hp_mr15 hp_mb15">
                                        <p style={{color: "#006CD0FF"}}>휴가인원</p>
                                    </div>
                                </th>
                                <th>
                                    <div className="bl_tna__label3 hp_lh2-5 hp_mr15 hp_mb15">
                                        <p style={{color: "#006CD0FF"}}>외근인원</p>
                                    </div>
                                </th>
                                <th>
                                    <div className="bl_tna__label3 hp_lh2-5 hp_mr15 hp_mb15">
                                        <p style={{color: "#006CD0FF"}}>출장인원</p>
                                    </div>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="">
                                <td>
                                    <div
                                        className="hp_fw700 hp_fs28 ly_flexC hp_mr15">{all}
                                    </div>
                                </td>
                                <td>
                                    <div
                                        className="hp_fw700 hp_fs28 ly_flexC hp_mr15">{checkIn}
                                    </div>
                                </td>
                                <td>
                                    <div
                                        className="hp_fw700 hp_fs28 ly_flexC hp_mr20">{late}
                                    </div>
                                </td>
                                <td>
                                    <div
                                        className="hp_fw700 hp_fs28 ly_flexC hp_mr20">{NoCheckIn}
                                    </div>
                                </td>
                                <td>
                                    <div className="hp_fw700 hp_fs28 ly_flexC hp_mr20">{dayOff}</div>
                                </td>
                                <td>
                                    <div className="hp_fw700 hp_fs28 ly_flexC hp_mr20">{fieldWork}</div>
                                </td>
                                <td>
                                    <div className="hp_fw700 hp_fs28 ly_flexC hp_mr20">{business}</div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <section className="bl_sect hp_mt10  hp_mb20 el_shadowD4" style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <table className="bl_tb1" style={{width: '900px'}}>
                    <colgroup>
                        <col style={{width: "100px"}}/>
                        <col style={{width: "50px"}}/>
                        <col style={{width: "70px"}}/>
                        <col style={{width: "85px"}}/>
                        <col style={{width: "85px"}}/>
                        <col style={{width: "90px"}}/>
                        <col style={{width: "80px"}}/>
                        <col style={{width: "80px"}}/>
                    </colgroup>
                    <thead>
                    <tr style={{height: '55px'}}>
                        <th scope="col">팀명</th>
                        <th scope="col">직책</th>
                        <th scope="col">사원명</th>
                        <th scope="col">근태현황</th>
                        <th scope="col">출근시간</th>
                        <th scope="col">퇴근시간</th>
                        <th scope="col">초과근무</th>
                        <th scope="col">비고</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentResults.length > 0 ? (
                        currentResults.map((employee, index) => (
                            <tr key={index} style={{height: '55px'}}>
                                <td>
                                    {employee.empTitle === '대표' || employee.empTitle === '책임자' ? (
                                        <span>{employee.parTitle}</span>
                                    ) : employee.empTitle === '부서장' ? (
                                        <span>{employee.subTitle}</span>
                                    ) : employee.empTitle === '팀장' || employee.empTitle === '팀원' ? (
                                        <span>{employee.deptTitle}</span>
                                    ) : "-"}
                                </td>
                                <td>{employee.empTitle}</td>
                                <td>{employee.empName}</td>
                                <td>{employee.attendanceStatus.atsName}</td>
                                <td>{employee.startTime ? employee.startTime : "-"}</td>
                                <td>{employee.endTime ? employee.endTime : "-"}</td>
                                <td>{employee.owStartTime ? employee.owStartTime : "-"}</td>
                                <td>{employee.owEndTime ? employee.owEndTime : "-"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" style={{textAlign: 'center'}}>데이터가 없습니다.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </section>
            <div className="ly_spaceBetween ly_fitemC hp_mt10">
                <div className="hp_ml10 hp_7Color">총 &nbsp;<b
                    className="hp_0Color hp_fw700">{currentPage}</b> / {totalPages} 페이지
                </div>
            </div>
            <PagingBar pageInfo={{currentPage, maxPage: totalPages}} setCurrentPage={handlePageChange}/>
        </>
    );
};

export default PreferencesAttendance;
