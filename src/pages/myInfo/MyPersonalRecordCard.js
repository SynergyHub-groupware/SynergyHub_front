// import '../../css/personal.css';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callRecordCardAPI, callRegistRecordCardAPI, callUpdateRecordCardAPI } from '../../apis/EmployeeAPICalls';

function MyPersonalRecordCard() {

    const dispatch = useDispatch();

    const recordCard = useSelector(state => state.employeeReducer.recordCard);
    const registRecordCard = useSelector(state => state.employeeReducer.registRecordCard);
    const updateRecordCard = useSelector(state => state.employeeReducer.updateRecordCard);

    // console.log('recordCard in component: ', recordCard);

    useEffect(() => {
        dispatch(callRecordCardAPI());
    }, [dispatch]);

    const [schoolInfos, setSchoolInfos] = useState(recordCard.schoolInfos || []);
    const [certificates, setCertificates] = useState(recordCard.certificates || []);
    const [registStatus, setRegistStatus] = useState(null);



    const handleAddSchoolInfo = () => {
        const newSchoolInfo = {
            sch_name: '',
            grad_status: '',
            enrole_date: '',
            grad_date: '',
            major: '',
            day_n_night: '',
            location: ''
        };
        setSchoolInfos([...schoolInfos, newSchoolInfo]);
    }

    const handleAddCertificate = () => {
        const newCertificate = {
            cer_name: '',
            cer_score: '',
            cer_date: '',
            cer_num: '',
            iss_organ: ''
        }
        setCertificates([...certificates, newCertificate]);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const newRecordCard = {
                schoolInfos: [...recordCard.schoolInfos, ...schoolInfos],
                certificates: [...recordCard.certificates, ...certificates]
            };

            if (recordCard && recordCard.id) {

                await dispatch(callRegistRecordCardAPI(newRecordCard));
            }

            setRegistStatus('success');
            alert('저장이 완료 되었습니다.');
        } catch (error) {
            setRegistStatus('fail');
            alert('저장에 실패하였습니다.');
        }
    };


    const handleSchoolInfoChange = (index, field, value) => {
        const updatedSchoolInfos = [...schoolInfos];
        updatedSchoolInfos[index][field] = value;
        setSchoolInfos(updatedSchoolInfos);
    };

    const handleCertificateChange = (index, field, value) => {
        const updatedCertificates = [...certificates];
        updatedCertificates[index][field] = value;
        setCertificates(updatedCertificates);
    };

    return (
        <div class="ly_cont">
            <div class="ly_spaceBetween ly_fitemEnd hp_mb30">
                <h4 class="el_lv1Head">인사기록카드</h4>
                <div>
                    <button type="button" class="el_btnS el_btnblueBack" onClick={handleSubmit}>저장</button>
                    <button type="button" class="el_btnS el_btn0Bord">출력하기</button>
                </div>
            </div>
            <section class="bl_sect hp_padding15">
                <h5 class="hp_fw700 hp_fs18 hp_mb10">기본정보</h5>
                <table class="bl_tb3">
                    <colgroup>
                        <col style={{ width: "150px" }} />
                        <col style={{ width: "150px" }} />
                        <col style={{ width: "*" }} />
                        <col style={{ width: "150px" }} />
                        <col style={{ width: "*" }} />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th rowspan="3">사진</th>
                            <th scope="row">이름</th>
                            <td>{recordCard.emp_name}</td>
                            <th scope="row">주민등록번호</th>
                            <td>{recordCard.social_security_no}</td>
                        </tr>
                        <tr>
                            <th scope="row">휴대폰</th>
                            <td>{recordCard.phone}</td>
                            <th scope="row">이메일</th>
                            <td>{recordCard.email}</td>
                        </tr>
                        <tr>
                            <th scope="row">주소</th>
                            <td colspan="3">{recordCard.address}</td>
                        </tr>
                    </tbody>
                </table>
                <h5 class="hp_fw700 hp_fs18 hp_mb10 hp_mt30">발령내역</h5>
                <table class="bl_tb3">
                    <colgroup>
                        <col style={{ width: "calc(100% / 7)" }} />
                        <col style={{ width: "calc(100% / 7)" }} />
                        <col style={{ width: "calc(100% / 7)" }} />
                        <col style={{ width: "calc(100% / 7)" }} />
                        <col style={{ width: "calc(100% / 7)" }} />
                        <col style={{ width: "calc(100% / 7)" }} />
                        <col style={{ width: "calc(100% / 7)" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">발령일</th>
                            <th scope="col">발령유형</th>
                            <th scope="col">발령명</th>
                            <th scope="col">소속</th>
                            <th scope="col">직급</th>
                            <th scope="col">고용구분</th>
                            <th scope="col">근무지</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'center' }}></td>
                            <td style={{ textAlign: 'center' }}></td>
                            <td style={{ textAlign: 'center' }}></td>
                            <td style={{ textAlign: 'center' }}></td>
                            <td style={{ textAlign: 'center' }}></td>
                            <td style={{ textAlign: 'center' }}></td>
                            <td style={{ textAlign: 'center' }}></td>
                        </tr>
                    </tbody>
                </table>
                <h5 class="hp_fw700 hp_fs18 hp_mb10 hp_mt30">경력사항</h5>
                <table class="bl_tb3">
                    <colgroup>
                        <col style={{ width: "calc(100% / 7)" }} />
                        <col style={{ width: "calc(100% / 7)" }} />
                        <col style={{ width: "calc(100% / 7)" }} />
                        <col style={{ width: "calc(100% / 7)" }} />
                        <col style={{ width: "calc(100% / 7)" }} />
                        <col style={{ width: "calc(100% / 7)" }} />
                        <col style={{ width: "calc(100% / 7)" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">입사일</th>
                            <th scope="col">퇴사일</th>
                            <th scope="col">직장명</th>
                            <th scope="col">담당업무</th>
                            <th scope="col">직급</th>
                            <th scope="col" colspan="2">퇴사사유</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input style={{ textAlign: 'center' }} /></td>
                            <td><input style={{ textAlign: 'center' }} /></td>
                            <td><input style={{ textAlign: 'center' }} /></td>
                            <td><input style={{ textAlign: 'center' }} /></td>
                            <td><input style={{ textAlign: 'center' }} /></td>
                            <td colspan="2"><input style={{ textAlign: 'center', width: "416px" }} /></td>
                        </tr>
                    </tbody>
                </table>
                <div class="ly_spaceBetween ly_fitemC hp_mt30 hp_mb10">
                    <h5 class="hp_fw700 hp_fs18 hp_mb10 hp_mt30">학력사항</h5>
                    <div class="">
                        <button type="button" class="el_btnS el_btn8Bord" onClick={handleAddSchoolInfo}>추가</button>
                    </div>
                </div>
                <table class="bl_tb3">
                    <colgroup>
                        <col style={{ width: "calc(100% / 7)" }} />
                        <col style={{ width: "calc(100% / 7)" }} />
                        <col style={{ width: "calc(100% / 7)" }} />
                        <col style={{ width: "calc(100% / 7)" }} />
                        <col style={{ width: "calc(100% / 7)" }} />
                        <col style={{ width: "calc(100% / 7)" }} />
                        <col style={{ width: "calc(100% / 7)" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">학교명</th>
                            <th scope="col">졸업여부</th>
                            <th scope="col">입학일</th>
                            <th scope="col">졸업일</th>
                            <th scope="col">전공</th>
                            <th scope="col">주야</th>
                            <th scope="col">소재지</th>
                        </tr>
                    </thead>
                    <tbody>
                    {recordCard.schoolInfos?.map((schoolInfo, index) => (
                            <tr key={index}>
                                <td><input type="text" style={{ textAlign: 'center' }} defaultValue={schoolInfo.sch_name} /></td>
                                <td><input type="text" style={{ textAlign: 'center' }} defaultValue={schoolInfo.grad_status}  /></td>
                                <td><input type="text" style={{ textAlign: 'center' }} defaultValue={schoolInfo.enrole_date}  /></td>
                                <td><input type="text" style={{ textAlign: 'center' }} defaultValue={schoolInfo.grad_date}  /></td>
                                <td><input type="text" style={{ textAlign: 'center' }} defaultValue={schoolInfo.major}  /></td>
                                <td><input type="text" style={{ textAlign: 'center' }} defaultValue={schoolInfo.day_n_night}  /></td>
                                <td><input type="text" style={{ textAlign: 'center' }} defaultValue={schoolInfo.location}  /></td>
                            </tr>
                        ))}
                        {schoolInfos.map((school, index) => (
                            <tr key={index}>
                                <td><input style={{ textAlign: 'center' }} value={school.sch_name} onChange={(e) => handleSchoolInfoChange(index, 'sch_name', e.target.value)} /></td>
                                <td><input style={{ textAlign: 'center' }} value={school.grad_status} onChange={(e) => handleSchoolInfoChange(index, 'grad_status', e.target.value)} /></td>
                                <td><input style={{ textAlign: 'center' }} value={school.enrole_date} onChange={(e) => handleSchoolInfoChange(index, 'enrole_date', e.target.value)} /></td>
                                <td><input style={{ textAlign: 'center' }} value={school.grad_date} onChange={(e) => handleSchoolInfoChange(index, 'grad_date', e.target.value)} /></td>
                                <td><input style={{ textAlign: 'center' }} value={school.major} onChange={(e) => handleSchoolInfoChange(index, 'major', e.target.value)} /></td>
                                <td><input style={{ textAlign: 'center' }} value={school.day_n_night} onChange={(e) => handleSchoolInfoChange(index, 'day_n_night', e.target.value)} /></td>
                                <td><input style={{ textAlign: 'center' }} value={school.location} onChange={(e) => handleSchoolInfoChange(index, 'location', e.target.value)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div class="ly_spaceBetween ly_fitemC hp_mt30 hp_mb10">
                    <h5 class="hp_fw700 hp_fs18">자격증</h5>
                    <div class="">
                        <button type="button" class="el_btnS el_btn8Bord" onClick={handleAddCertificate}>추가</button>
                    </div>
                </div>
                <table class="bl_tb3">
                    <colgroup>
                        <col style={{ width: "calc(100% / 5)" }} />
                        <col style={{ width: "calc(100% / 5)" }} />
                        <col style={{ width: "calc(100% / 5)" }} />
                        <col style={{ width: "calc(100% / 5)" }} />
                        <col style={{ width: "calc(100% / 5)" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">자격증 명</th>
                            <th scope="col">급수(점수)</th>
                            <th scope="col">취득일</th>
                            <th scope="col">자격증 번호</th>
                            <th scope="col">발행기관</th>
                        </tr>
                    </thead>
                    <tbody>
                    {recordCard.certificates?.map((certificate, index) => (
                            <tr key={index}>
                                <td><input type="text" style={{ textAlign: 'center' }} defaultValue={certificate.cer_name}  /></td>
                                <td><input type="text" style={{ textAlign: 'center' }} defaultValue={certificate.cer_score}  /></td>
                                <td><input type="text" style={{ textAlign: 'center' }} defaultValue={certificate.cer_date}  /></td>
                                <td><input type="text" style={{ textAlign: 'center' }} defaultValue={certificate.cer_num}  /></td>
                                <td><input type="text" style={{ textAlign: 'center' }} defaultValue={certificate.iss_organ}  /></td>
                            </tr>
                        ))}
                        {certificates.map((cer, index) => (
                            <tr key={index}>
                                <td><input style={{ textAlign: 'center' }} type="text" class="hp_w100" value={cer.cer_name} onChange={(e) => handleCertificateChange(index, 'cer_name', e.target.value)} /></td>
                                <td><input style={{ textAlign: 'center' }} type="number" class="hp_w100" value={cer.cer_score} onChange={(e) => handleCertificateChange(index, 'cer_score', e.target.value)} /></td>
                                <td><input style={{ textAlign: 'center' }} type="date" class="hp_w100" value={cer.cer_date} onChange={(e) => handleCertificateChange(index, 'cer_date', e.target.value)} /></td>
                                <td><input style={{ textAlign: 'center' }} type="text" class="hp_w100" value={cer.cer_num} onChange={(e) => handleCertificateChange(index, 'cer_num', e.target.value)} /></td>
                                <td><input style={{ textAlign: 'center' }} type="text" class="hp_w100" value={cer.iss_organ} onChange={(e) => handleCertificateChange(index, 'iss_organ', e.target.value)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    )
}
export default MyPersonalRecordCard;