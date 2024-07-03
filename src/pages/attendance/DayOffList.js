import React, { useEffect, useState } from 'react';
import AttendanceSummary from "./component/AttendanceSummary";
import {useDispatch, useSelector} from "react-redux";
import DefaultSchedule from "./component/DefaultSchedule";
import {callAttendanceTodayAPI, callMyAttendanceForWeekAPI, callMyInfoAPI} from "../../apis/AttendancelAPICalls";
import WorkStatus from "./component/WorkStatus";

function DayOffList() {
    const dispatch = useDispatch();
    const attendancesToday = useSelector((state) => state.attendanceReducer.attendanceToday);
    const employee = useSelector((state) => state.attendanceReducer.employee);

    useEffect(() => {
        dispatch(callMyInfoAPI());
        dispatch(callMyAttendanceForWeekAPI());
        dispatch(callAttendanceTodayAPI());
    }, [dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        // Handle search logic here
        console.log('Search button clicked');
    };

    return (
        <>
            <div className="ly_cont ly_flex">
                <div className="hp_mr50">
                    <div style={{ position: "sticky" }}>
                        <AttendanceSummary attendancesToday={attendancesToday} />
                        <DefaultSchedule employee={employee}/>
                        <WorkStatus/>
                    </div>
                </div>
                <div className="">
                    <div className="" style={{ width: '900px' }}>
                        <div className="ly_spaceBetween ly_fitemEnd hp_mb30">
                            <h4 className="el_lv1Head" style={{ paddingLeft: '10px' }}>상세 휴가 현황</h4>
                        </div>
                        <div className="ly_spaceBetween hp_mt20"
                             style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <select className="hp_mr5" defaultValue="">
                                    <option value="">2024년</option>
                                </select>
                                <select className="hp_mr5" defaultValue="">
                                    <option value="">6월</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <select className="hp_mr5" defaultValue="">
                                    <option value="">상위부서명</option>
                                </select>
                                <select className="hp_mr5" defaultValue="">
                                    <option value="">하위부서명</option>
                                </select>
                                <select className="hp_mr10" defaultValue="">
                                    <option value="">세부팀명</option>
                                </select>
                                <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="text" className="hp_mr5" id="" name="" defaultValue=""
                                           placeholder="검색어를 입력해주세요"/>
                                    <button type="submit" className="el_btnS el_btnblueBord" id="" name="">
                                        검색
                                    </button>
                                </form>
                            </div>
                        </div>
                        <section className="bl_sect hp_mt10" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            <table className="bl_tb1" style={{ width: '100%' }}>
                                <colgroup>
                                    <col style={{ width: "50px" }}/>
                                    <col style={{ width: "120px" }}/>
                                    <col style={{ width: "120px" }}/>
                                    <col style={{ width: "120px" }}/>
                                    <col style={{ width: "120px" }}/>
                                    <col style={{ width: "120px" }}/>
                                </colgroup>
                                <thead>
                                <tr>
                                    <th scope="col"><input type="checkbox" className="" id="" name=""
                                                           value="checkAll"/></th>
                                    <th scope="col">발령일</th>
                                    <th scope="col">이름</th>
                                    <th scope="col">발령종류</th>
                                    <th scope="col">발령 전</th>
                                    <th scope="col">발령 후</th>
                                </tr>
                                </thead>
                                {/* <!-- 5개씩 나열 --> */}
                                <tbody>
                                <tr>
                                    <th scope="row"><input type="checkbox" className="" id="" name=""
                                                           value="checkOne"/></th>
                                    <td>2024-12-34</td>
                                    <td className="" style={{ textAlign: 'center' }}>홍길동</td>
                                    <td>이동</td>
                                    <td>영업팀</td>
                                    <td>고객관리팀</td>
                                </tr>
                                <tr>
                                    <th scope="row"><input type="checkbox" className="" id="" name=""
                                                           value="checkOne"/></th>
                                    <td>2024-12-34</td>
                                    <td className="" style={{ textAlign: 'center' }}>홍길동</td>
                                    <td>이동</td>
                                    <td>영업팀</td>
                                    <td>고객관리팀</td>
                                </tr>
                                <tr>
                                    <th scope="row"><input type="checkbox" className="" id="" name=""
                                                           value="checkOne"/></th>
                                    <td>2024-12-34</td>
                                    <td className="" style={{ textAlign: 'center' }}>홍길동</td>
                                    <td>이동</td>
                                    <td>영업팀</td>
                                    <td>고객관리팀</td>
                                </tr>
                                <tr>
                                    <th scope="row"><input type="checkbox" className="" id="" name=""
                                                           value="checkOne"/></th>
                                    <td>2024-12-34</td>
                                    <td className="" style={{ textAlign: 'center' }}>홍길동</td>
                                    <td>이동</td>
                                    <td>영업팀</td>
                                    <td>고객관리팀</td>
                                </tr>
                                <tr>
                                    <th scope="row"><input type="checkbox" className="" id="" name=""
                                                           value="checkOne"/></th>
                                    <td>2024-12-34</td>
                                    <td className="" style={{ textAlign: 'center' }}>홍길동</td>
                                    <td>이동</td>
                                    <td>영업팀</td>
                                    <td>고객관리팀</td>
                                </tr>
                                </tbody>
                            </table>
                        </section>
                        <div className="ly_spaceBetween ly_fitemC hp_mt10">
                            <div className="hp_ml10 hp_7Color">총 1 / <b className="hp_0Color hp_fw700">1</b> 페이지
                            </div>
                        </div>
                        <section className="bl_sect hp_mt10 hp_padding5" style={{ textAlign: 'center' }}>
                            <div className="bl_paging">
                                <a className="bl_paging__btn bl_paging__first" href="" title="첫 페이지로 이동"></a>
                                <a className="bl_paging__btn bl_paging__prev" href="" title="이전 페이지로 이동"></a>
                                <a className="bl_paging__btn bl_paging__num" href="">1</a>
                                <a className="bl_paging__btn bl_paging__next" href="" title="다음 페이지로 이동"></a>
                                <a className="bl_paging__btn bl_paging__last" href="" title="마지막 페이지로 이동"></a>
                            </div>
                        </section>
                    </div>
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

export default DayOffList;
