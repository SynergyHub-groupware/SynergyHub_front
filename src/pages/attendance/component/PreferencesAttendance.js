import React, { useEffect, useState } from 'react';
import TodayDateComponent from "../util/TodayDateComponent";
import PagingBar from "../../../components/commons/PagingBar";

const PreferencesAttendance = ({ todayData, isOpen, departmentsData, userRoleData, employee }) => {
    const [filteredData, setFilteredTodayData] = useState([]);
    const [all, setAll] = useState(0); // 전체 인원 수
    const [checkIn, setCheckIn] = useState(0); // 출근 인원 수
    const [late, setLate] = useState(0); // 지각 인원 수
    const [NoCheckIn, setNoCheckIn] = useState(0); // 결근 인원 수
    const [dayOff, setDayOff] = useState(0); // 휴가 인원 수
    const [fieldWork, setFieldWork] = useState(0); // 외근 인원 수
    const [business, setBusiness] = useState(0); // 출장 인원 수

    // 페이징
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;

    // 현재 페이지의 결과 계산
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = filteredData.slice(indexOfFirstResult, indexOfLastResult);
    const totalPages = Math.ceil(filteredData.length / resultsPerPage);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        // 사용자의 직책과 부서코드에 따라 필요한 부서 및 팀 옵션 설정
        const { empTitle, deptCode } = userRoleData;

        if (empTitle === 'T2' && deptCode === 'D2') {
            // T2, D2에 대한 설정
            const myDept = departmentsData.find(dep => dep.name === '전략기획부');
            if (myDept) {
                // 전략기획부의 subDepartments 선언 (영업부 하위, 마케팅부 하위)
                const allSubDepts = myDept.subDepartments;

                // todayData 의 subTitle 이 "영업부" 와 "마케팅부"이면서 직책이 팀장인 근태 기록
                const filteredData = todayData.filter(data =>
                    (allSubDepts.some(subDept => subDept.name === data.subTitle))
                );

                const sortedData = filteredData.sort((a, b) => {
                    // 부서장 여부 확인
                    const isDepartmentHeadA = a.empTitle === '부서장';
                    const isDepartmentHeadB = b.empTitle === '부서장';

                    // 부서장이면 팀명 ㄱㄴㄷ 순으로 정렬
                    if (isDepartmentHeadA && !isDepartmentHeadB) return -1;
                    if (!isDepartmentHeadA && isDepartmentHeadB) return 1;

                    // 팀장 여부 확인
                    const isTeamLeaderA = a.empTitle === '팀장';
                    const isTeamLeaderB = b.empTitle === '팀장';

                    // 팀장이면 팀명 ㄱㄴㄷ 순으로 정렬
                    if (isTeamLeaderA && !isTeamLeaderB) return -1;
                    if (!isTeamLeaderA && isTeamLeaderB) return 1;

                    // 모두 부서장 또는 팀장이 아닌 경우에는 팀명 ㄱㄴㄷ 순으로 정렬
                    if (a.deptTitle == null) return 1;
                    if (b.deptTitle == null) return -1;

                    return a.deptTitle.localeCompare(b.deptTitle); // 팀명 가나다 순으로 정렬
                });

                setFilteredTodayData(sortedData);

                // 출근 인원 수 계산
                const checkInCount = filteredData.filter(data => data.attendanceStatus.atsName === '출근').length;
                setCheckIn(checkInCount);

                // 지각 인원 수 계산 (지각 + 미출근)
                const lateCount1 = filteredData.filter(data => data.attendanceStatus.atsName === '지각').length;
                const lateCount2 = filteredData.filter(data => data.attendanceStatus.atsName === '미출근').length;
                setLate(lateCount1 + lateCount2);

                // 결근 인원 수 계산
                const NoCheckInCount = filteredData.filter(data => data.attendanceStatus.atsName === '결근').length;
                setNoCheckIn(NoCheckInCount);

                // 휴가 인원 수 계산
                const DayOffCount = filteredData.filter(data => data.attendanceStatus.atsName === '휴가').length;
                setDayOff(DayOffCount);

                // 외근 인원 수 계산
                const fieldWorkCount = filteredData.filter(data => data.attendanceStatus.atsName === '외근').length;
                setFieldWork(fieldWorkCount);

                // 출장 인원 수 계산
                const businessCount = filteredData.filter(data => data.attendanceStatus.atsName === '출장').length;
                setBusiness(businessCount);

                // 전체 인원 수 계산 (휴직 제외)
                setAll(checkIn + late + NoCheckIn + dayOff + fieldWork + business);
            }
        }
    }, [todayData, departmentsData, userRoleData]);

    return (
        <>
            <section
                className="bl_sect hp_padding40 el_shadowD4 hp_mb20"
                style={{position: 'relative', width: '900px', zIndex: '2'}}
            >
                <div className="hp_fw700 hp_fs22">
                    {employee.emp_name} {employee.position_name}님,
                </div>
                <div className="hp_fs22 hp_mb40">
                    우리 팀원들의 근태 현황을 확인해보세요. 🕵️‍♀️
                </div>
                <div className="" style={{display: "flex"}}>
                    <div className="hp_mt40" style={{width: '300px'}}>
                        <table className="ly_fitemC">
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
                                <td>{employee.deptTitle}</td>
                                <td>{employee.empTitle}</td>
                                <td>{employee.empName}</td>
                                <td>{employee.attendanceStatus.atsName}</td>
                                <td>{employee.startTime}</td>
                                <td>{employee.endTime}</td>
                                <td>{employee.owStartTime}</td>
                                <td>{employee.owEndTime}</td>
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
