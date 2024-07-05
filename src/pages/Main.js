import React from 'react';
import '../css/main.css';
import Header from "../components/commons/Header";

function Main() {
    return (
        <>
            <Header />
            <div className="ly_body">
                <div className="ly_cont ly_flex" style={{height: 'calc(100vh - 65px)'}}>
                    <div className="ly_flex ly_fdirecCol hp_w400px ly_fshirnk">
                        <section className="bl_sect hp_padding30 el_shadowD4 hp_mb30 ly_fgrow1 bl_mainProfile">
                            <a className="bl_mainProfile__img hp_mb15"
                               style={{}} href=""></a>
                            <ul className="hp_alignC">
                                <li className="hp_fs20 hp_fw700">홍길동</li>
                                <li className="hp_mt20">
                                    <a className="hp_fs16" href="">쪽지함 <b className="bl_mainProfile__alarm">0</b></a>
                                    <span className="hp_ml20 hp_mr20 hp_fw700 hp_7Color">|</span>
                                    <a className="hp_fs16" href="">새업무 <b className="bl_mainProfile__alarm">10</b></a>
                                </li>
                            </ul>
                        </section>
                        <section className="bl_sect hp_padding30 el_shadowD4 hp_mb30">
                            <div className="hp_fw700">2024년 01월 23일</div>
                            <div className="ly_spaceBetween ly_fitemC hp_mt5">
                                <div className="hp_fw700 hp_fs28">PM 12:34:56</div>
                                <ul className="hp_alignR">
                                    <li className=""><b className="hp_fw700 hp_mr15">출근 시간</b> 00:00:00</li>
                                    <li className=""><b className="hp_fw700 hp_mr15">퇴근 시간</b> 00:00:00</li>
                                </ul>
                            </div>
                            <button type="button" className="el_btn0Back el_btnF hp_mt20 hp_fs16">출근하기</button>
                        </section>
                        <section className="bl_sect hp_padding30 el_shadowD4">
                            <div className="hp_fw700">연차 사용 현황</div>
                            <div className="hp_fw700 hp_fs28 hp_mt5">1 / 15 <span className="hp_fs16">일</span></div>
                            <div className="hp_mt15">막대그래프 자리</div>
                            <ul className="hp_mt15">
                                <li className=""><b className="hp_fw700 hp_mr15">총 부여 연차</b> 15일</li>
                                <li className=""><b className="hp_fw700 hp_mr15">총 잔여 연차</b> 13일</li>
                            </ul>
                        </section>
                    </div>
                    <div className="ly_fgrow1 hp_ml30" style={{width: '1100px'}}>
                        <h4 className="el_lv1Head hp_mb10">알림 <b className="bl_mainBoard__alarm hp_ml10">10</b></h4>
                        <div className="bl_mainBoard">
                            <section
                                className="bl_sect el_shadowD4 ly_spaceBetween ly_fitemC hp_p20-30 hp_mt15 bl_mainBoard__read">
                                <div className="ly_flex ly_fitemC">
                                    <div className="bl_miniProfile__img"
                                         style={{}}></div>
                                    <ul className="hp_ml20">
                                        <li className="hp_fs16 hp_fw400"><b className="hp_fw700">홍길동</b>님이 상신한 <b
                                            className="hp_fw700">휴가신청서_홍길동</b> 결재가 <b className="hp_fw700">시작</b>되었습니다.
                                        </li>
                                        <li className="hp_7Color hp_fs13 hp_mt5">결재 <span
                                            className="hp_ml10 hp_mr10">/</span>2024.12.23
                                        </li>
                                    </ul>
                                </div>
                                <div className="ly_flex ly_fitemC">
                                    <button type="button" className="el_btnS el_btn8Back hp_ml30">상세보기</button>
                                    <button type="button" className="bl_mainBoard__delete hp_ml20"></button>
                                </div>
                            </section>
                            <section className="bl_sect el_shadowD4 ly_spaceBetween ly_fitemC hp_p20-30 hp_mt15">
                                <div className="ly_flex ly_fitemC">
                                    <div className="bl_miniProfile__img"
                                         style={{}}></div>
                                    <ul className="hp_ml20">
                                        <li className="hp_fs16 hp_fw400"><b className="hp_fw700">홍길동</b>님이 상신한 <b
                                            className="hp_fw700">휴가신청서_홍길동</b> 결재가 <b className="hp_fw700">완료</b>되었습니다.
                                        </li>
                                        <li className="hp_7Color hp_fs13 hp_mt5">결재 <span
                                            className="hp_ml10 hp_mr10">/</span>2024.12.23
                                        </li>
                                    </ul>
                                </div>
                                <div className="ly_flex ly_fitemC">
                                    <button type="button" className="el_btnS el_btn8Back hp_ml30">상세보기</button>
                                    <button type="button" className="bl_mainBoard__delete hp_ml20"></button>
                                </div>
                            </section>
                            <section className="bl_sect el_shadowD4 ly_spaceBetween ly_fitemC hp_p20-30 hp_mt15">
                                <div className="ly_flex ly_fitemC">
                                    <div className="bl_miniProfile__img"
                                         style={{}}></div>
                                    <ul className="hp_ml20">
                                        <li className="hp_fs16 hp_fw400"><b className="hp_fw700">홍길동</b>님이 상신한 <b
                                            className="hp_fw700">휴가신청서_홍길동</b> 결재가 <b className="hp_fw700">완료</b>되었습니다.
                                        </li>
                                        <li className="hp_7Color hp_fs13 hp_mt5">결재 <span
                                            className="hp_ml10 hp_mr10">/</span>2024.12.23
                                        </li>
                                    </ul>
                                </div>
                                <div className="ly_flex ly_fitemC">
                                    <button type="button" className="el_btnS el_btn8Back hp_ml30">상세보기</button>
                                    <button type="button" className="bl_mainBoard__delete hp_ml20"></button>
                                </div>
                            </section>
                            <section className="bl_sect el_shadowD4 ly_spaceBetween ly_fitemC hp_p20-30 hp_mt15">
                                <div className="ly_flex ly_fitemC">
                                    <div className="bl_miniProfile__img"
                                         style={{}}></div>
                                    <ul className="hp_ml20">
                                        <li className="hp_fs16 hp_fw400"><b className="hp_fw700">홍길동</b>님이 상신한 <b
                                            className="hp_fw700">휴가신청서_홍길동</b> 결재가 <b className="hp_fw700">완료</b>되었습니다.
                                        </li>
                                        <li className="hp_7Color hp_fs13 hp_mt5">결재 <span
                                            className="hp_ml10 hp_mr10">/</span>2024.12.23
                                        </li>
                                    </ul>
                                </div>
                                <div className="ly_flex ly_fitemC">
                                    <button type="button" className="el_btnS el_btn8Back hp_ml30">상세보기</button>
                                    <button type="button" className="bl_mainBoard__delete hp_ml20"></button>
                                </div>
                            </section>
                            <section className="bl_sect el_shadowD4 ly_spaceBetween ly_fitemC hp_p20-30 hp_mt15">
                                <div className="ly_flex ly_fitemC">
                                    <div className="bl_miniProfile__img"
                                         style={{}}></div>
                                    <ul className="hp_ml20">
                                        <li className="hp_fs16 hp_fw400"><b className="hp_fw700">홍길동</b>님이 상신한 <b
                                            className="hp_fw700">휴가신청서_홍길동</b> 결재가 <b className="hp_fw700">완료</b>되었습니다.
                                        </li>
                                        <li className="hp_7Color hp_fs13 hp_mt5">결재 <span
                                            className="hp_ml10 hp_mr10">/</span>2024.12.23
                                        </li>
                                    </ul>
                                </div>
                                <div className="ly_flex ly_fitemC">
                                    <button type="button" className="el_btnS el_btn8Back hp_ml30">상세보기</button>
                                    <button type="button" className="bl_mainBoard__delete hp_ml20"></button>
                                </div>
                            </section>
                            <section className="bl_sect el_shadowD4 ly_spaceBetween ly_fitemC hp_p20-30 hp_mt15">
                                <div className="ly_flex ly_fitemC">
                                    <div className="bl_miniProfile__img"
                                         style={{}}></div>
                                    <ul className="hp_ml20">
                                        <li className="hp_fs16 hp_fw400"><b className="hp_fw700">홍길동</b>님이 상신한 <b
                                            className="hp_fw700">휴가신청서_홍길동</b> 결재가 <b className="hp_fw700">완료</b>되었습니다.
                                        </li>
                                        <li className="hp_7Color hp_fs13 hp_mt5">결재 <span
                                            className="hp_ml10 hp_mr10">/</span>2024.12.23
                                        </li>
                                    </ul>
                                </div>
                                <div className="ly_flex ly_fitemC">
                                    <button type="button" className="el_btnS el_btn8Back hp_ml30">상세보기</button>
                                    <button type="button" className="bl_mainBoard__delete hp_ml20"></button>
                                </div>
                            </section>
                            <section className="bl_sect el_shadowD4 ly_spaceBetween ly_fitemC hp_p20-30 hp_mt15">
                                <div className="ly_flex ly_fitemC">
                                    <div className="bl_miniProfile__img"
                                         style={{}}></div>
                                    <ul className="hp_ml20">
                                        <li className="hp_fs16 hp_fw400"><b className="hp_fw700">홍길동</b>님이 상신한 <b
                                            className="hp_fw700">휴가신청서_홍길동</b> 결재가 <b className="hp_fw700">완료</b>되었습니다.
                                        </li>
                                        <li className="hp_7Color hp_fs13 hp_mt5">결재 <span
                                            className="hp_ml10 hp_mr10">/</span>2024.12.23
                                        </li>
                                    </ul>
                                </div>
                                <div className="ly_flex ly_fitemC">
                                    <button type="button" className="el_btnS el_btn8Back hp_ml30">상세보기</button>
                                    <button type="button" className="bl_mainBoard__delete hp_ml20"></button>
                                </div>
                            </section>
                            <section className="bl_sect el_shadowD4 ly_spaceBetween ly_fitemC hp_p20-30 hp_mt15">
                                <div className="ly_flex ly_fitemC">
                                    <div className="bl_miniProfile__img"
                                         style={{}}></div>
                                    <ul className="hp_ml20">
                                        <li className="hp_fs16 hp_fw400"><b className="hp_fw700">홍길동</b>님이 상신한 <b
                                            className="hp_fw700">휴가신청서_홍길동</b> 결재가 <b className="hp_fw700">완료</b>되었습니다.
                                        </li>
                                        <li className="hp_7Color hp_fs13 hp_mt5">결재 <span
                                            className="hp_ml10 hp_mr10">/</span>2024.12.23
                                        </li>
                                    </ul>
                                </div>
                                <div className="ly_flex ly_fitemC">
                                    <button type="button" className="el_btnS el_btn8Back hp_ml30">상세보기</button>
                                    <button type="button" className="bl_mainBoard__delete hp_ml20"></button>
                                </div>
                            </section>
                            <section className="bl_sect el_shadowD4 ly_spaceBetween ly_fitemC hp_p20-30 hp_mt15">
                                <div className="ly_flex ly_fitemC">
                                    <div className="bl_miniProfile__img"
                                         style={{}}></div>
                                    <ul className="hp_ml20">
                                        <li className="hp_fs16 hp_fw400"><b className="hp_fw700">홍길동</b>님이 상신한 <b
                                            className="hp_fw700">휴가신청서_홍길동</b> 결재가 <b className="hp_fw700">완료</b>되었습니다.
                                        </li>
                                        <li className="hp_7Color hp_fs13 hp_mt5">결재 <span
                                            className="hp_ml10 hp_mr10">/</span>2024.12.23
                                        </li>
                                    </ul>
                                </div>
                                <div className="ly_flex ly_fitemC">
                                    <button type="button" className="el_btnS el_btn8Back hp_ml30">상세보기</button>
                                    <button type="button" className="bl_mainBoard__delete hp_ml20"></button>
                                </div>
                            </section>
                            <section className="bl_sect el_shadowD4 ly_spaceBetween ly_fitemC hp_p20-30 hp_mt15">
                                <div className="ly_flex ly_fitemC">
                                    <div className="bl_miniProfile__img"
                                         style={{}}></div>
                                    <ul className="hp_ml20">
                                        <li className="hp_fs16 hp_fw400"><b className="hp_fw700">홍길동</b>님이 상신한 <b
                                            className="hp_fw700">휴가신청서_홍길동</b> 결재가 <b className="hp_fw700">완료</b>되었습니다.
                                        </li>
                                        <li className="hp_7Color hp_fs13 hp_mt5">결재 <span
                                            className="hp_ml10 hp_mr10">/</span>2024.12.23
                                        </li>
                                    </ul>
                                </div>
                                <div className="ly_flex ly_fitemC">
                                    <button type="button" className="el_btnS el_btn8Back hp_ml30">상세보기</button>
                                    <button type="button" className="bl_mainBoard__delete hp_ml20"></button>
                                </div>
                            </section>
                            <section className="bl_sect el_shadowD4 ly_spaceBetween ly_fitemC hp_p20-30 hp_mt15">
                                <div className="ly_flex ly_fitemC">
                                    <div className="bl_miniProfile__img"
                                         style={{}}></div>
                                    <ul className="hp_ml20">
                                        <li className="hp_fs16 hp_fw400"><b className="hp_fw700">홍길동</b>님이 상신한 <b
                                            className="hp_fw700">휴가신청서_홍길동</b> 결재가 <b className="hp_fw700">완료</b>되었습니다.
                                        </li>
                                        <li className="hp_7Color hp_fs13 hp_mt5">결재 <span
                                            className="hp_ml10 hp_mr10">/</span>2024.12.23
                                        </li>
                                    </ul>
                                </div>
                                <div className="ly_flex ly_fitemC">
                                    <button type="button" className="el_btnS el_btn8Back hp_ml30">상세보기</button>
                                    <button type="button" className="bl_mainBoard__delete hp_ml20"></button>
                                </div>
                            </section>
                            <section className="bl_sect el_shadowD4 ly_spaceBetween ly_fitemC hp_p20-30 hp_mt15">
                                <div className="ly_flex ly_fitemC">
                                    <div className="bl_miniProfile__img"
                                         style={{}}></div>
                                    <ul className="hp_ml20">
                                        <li className="hp_fs16 hp_fw400"><b className="hp_fw700">홍길동</b>님이 상신한 <b
                                            className="hp_fw700">휴가신청서_홍길동</b> 결재가 <b className="hp_fw700">완료</b>되었습니다.
                                        </li>
                                        <li className="hp_7Color hp_fs13 hp_mt5">결재 <span
                                            className="hp_ml10 hp_mr10">/</span>2024.12.23
                                        </li>
                                    </ul>
                                </div>
                                <div className="ly_flex ly_fitemC">
                                    <button type="button" className="el_btnS el_btn8Back hp_ml30">상세보기</button>
                                    <button type="button" className="bl_mainBoard__delete hp_ml20"></button>
                                </div>
                            </section>
                            <section className="bl_sect el_shadowD4 ly_spaceBetween ly_fitemC hp_p20-30 hp_mt15">
                                <div className="ly_flex ly_fitemC">
                                    <div className="bl_miniProfile__img"
                                         style={{}}></div>
                                    <ul className="hp_ml20">
                                        <li className="hp_fs16 hp_fw400"><b className="hp_fw700">홍길동</b>님이 상신한 <b
                                            className="hp_fw700">휴가신청서_홍길동</b> 결재가 <b className="hp_fw700">완료</b>되었습니다.
                                        </li>
                                        <li className="hp_7Color hp_fs13 hp_mt5">결재 <span
                                            className="hp_ml10 hp_mr10">/</span>2024.12.23
                                        </li>
                                    </ul>
                                </div>
                                <div className="ly_flex ly_fitemC">
                                    <button type="button" className="el_btnS el_btn8Back hp_ml30">상세보기</button>
                                    <button type="button" className="bl_mainBoard__delete hp_ml20"></button>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="hp_ml30 ly_flex ly_fdirecCol hp_w300px ly_fshirnk">
                        <section className="bl_sect hp_padding30 el_shadowD4 hp_mb30 hp_h50">
                            <div className="ly_spaceBetween ly_fitemC">
                                <h5 className="hp_fw700 hp_fs18 hp_mb10">부재자</h5>
                                <button type="button" className="hp_7Color hp_fs13">+ 더보기</button>
                            </div>
                            <dl className="hp_bordTEB hp_pt10">
                                <dt className="hp_7Color">2024.05.22 (수)</dt>
                                <dd className="ly_spaceBetween ly_fitemC hp_mt10">
                                    <div className="ly_flex ly_fitemC">
                                        <div className="bl_miniProfile__img"
                                             style={{}}></div>
                                        <ul className="hp_ml10">
                                            <li className="">홍길동</li>
                                            <li className="hp_7Color hp_fs13">시스템팀</li>
                                        </ul>
                                    </div>
                                    <div className="bl_miniLabel bl_miniLabel__1">연차</div>
                                </dd>
                                <dd className="ly_spaceBetween ly_fitemC hp_mt10">
                                    <div className="ly_flex ly_fitemC">
                                        <div className="bl_miniProfile__img"
                                             style={{}}></div>
                                        <ul className="hp_ml10">
                                            <li className="">홍길동</li>
                                            <li className="hp_7Color hp_fs13">시스템팀</li>
                                        </ul>
                                    </div>
                                    <div className="bl_miniLabel bl_miniLabel__1">오전반차</div>
                                </dd>
                                <dd className="ly_spaceBetween ly_fitemC hp_mt10">
                                    <div className="ly_flex ly_fitemC">
                                        <div className="bl_miniProfile__img"
                                             style={{}}></div>
                                        <ul className="hp_ml10">
                                            <li className="">홍길동</li>
                                            <li className="hp_7Color hp_fs13">시스템팀</li>
                                        </ul>
                                    </div>
                                    <div className="bl_miniLabel bl_miniLabel__1">오후반차</div>
                                </dd>
                                <dd className="ly_spaceBetween ly_fitemC hp_mt10">
                                    <div className="ly_flex ly_fitemC">
                                        <div className="bl_miniProfile__img"
                                             style={{}}></div>
                                        <ul className="hp_ml10">
                                            <li className="">홍길동</li>
                                            <li className="hp_7Color hp_fs13">시스템팀</li>
                                        </ul>
                                    </div>
                                    <div className="bl_miniLabel bl_miniLabel__2">예비군훈련</div>
                                </dd>
                            </dl>
                        </section>
                        <section className="bl_sect hp_padding30 el_shadowD4 hp_h50">
                            <div className="ly_spaceBetween ly_fitemC">
                                <h5 className="hp_fw700 hp_fs18 hp_mb10">이달의 생일자</h5>
                                <button type="button" className="hp_7Color hp_fs13">+ 더보기</button>
                            </div>
                            <dl className="hp_bordTEB hp_pt10">
                                <dd className="ly_spaceBetween ly_fitemC hp_mt10">
                                    <div className="ly_flex ly_fitemC">
                                        <div className="bl_miniProfile__img"
                                             style={{}}></div>
                                        <ul className="hp_ml10">
                                            <li className="">홍길동</li>
                                            <li className="hp_7Color hp_fs13">시스템팀</li>
                                        </ul>
                                    </div>
                                    <div className="bl_miniLabel bl_miniLabel__3">5월 10일</div>
                                </dd>
                                <dd className="ly_spaceBetween ly_fitemC hp_mt10">
                                    <div className="ly_flex ly_fitemC">
                                        <div className="bl_miniProfile__img"
                                             style={{}}></div>
                                        <ul className="hp_ml10">
                                            <li className="">홍길동</li>
                                            <li className="hp_7Color hp_fs13">시스템팀</li>
                                        </ul>
                                    </div>
                                    <div className="bl_miniLabel bl_miniLabel__3">5월 15일</div>
                                </dd>
                                <dd className="ly_spaceBetween ly_fitemC hp_mt10">
                                    <div className="ly_flex ly_fitemC">
                                        <div className="bl_miniProfile__img"
                                             style={{}}></div>
                                        <ul className="hp_ml10">
                                            <li className="">홍길동</li>
                                            <li className="hp_7Color hp_fs13">시스템팀</li>
                                        </ul>
                                    </div>
                                    <div className="bl_miniLabel bl_miniLabel__3">5월 20일</div>
                                </dd>
                                <dd className="ly_spaceBetween ly_fitemC hp_mt10">
                                    <div className="ly_flex ly_fitemC">
                                        <div className="bl_miniProfile__img"
                                             style={{}}></div>
                                        <ul className="hp_ml10">
                                            <li className="">홍길동</li>
                                            <li className="hp_7Color hp_fs13">시스템팀</li>
                                        </ul>
                                    </div>
                                    <div className="bl_miniLabel bl_miniLabel__3">5월 30일</div>
                                </dd>
                            </dl>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;
