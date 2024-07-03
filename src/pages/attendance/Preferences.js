import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callDepartmentsAPI } from '../../apis/EmployeeAPICalls';
import DepartmentTree from '../employee/DepartmentTree';


function Preferences(){

    const dispatch = useDispatch();
    const departments = useSelector(state => state.employeeReducer.employee.departments);

    useEffect(() => {
        dispatch(callDepartmentsAPI());
    }, [dispatch]);

    return(
        <div className="ly_cont">
            <h4 className="el_lv1Head hp_mb30 hp_ml20">근무시간 관리</h4>
            <section className="bl_sect ly_flex" style={{height: "calc(100% - 30px - 42px)"}} >
                <div className="ly_body hp_bordDE hp_w30 hp_margin15 ly_flexC hp_f9Back ly_fdirecCol ly_fitemC" style={{height: "calc(100% - 20px)"}}>
                    <div className="hp_w90 hp_mt30" style={{height: "20%", textAlign: 'center' }}>
                        <select className="hp_w100">
                            <option value="">선택</option>
                        </select>
                        <div className="hp_w100 ly_flex" style={{height: "30px"}}>
                           <input type="text" className="hp_mt15 hp_floatL" style={{width: "100%"}} id="" name="" value="" placeholder="검색" />
                           <input type="submit" className="el_btnS el_btnblueBord hp_ml5 hp_mt15 hp_floatR" id="" name="" value="검색" />
                        </div>
                    </div>
                    <div className="hp_w90 hp_mt10 hp_mb30 hp_bordDE hp_br5 hp_fBack" style={{ textAlign: 'left', height: "100%" }}>
                        {/* <DepartmentTree departments={departments} /> */}
                    </div>
                </div>
                <div className="ly_body hp_bordDE hp_w70 hp_margin15 hp_f9Back ly_flexC hp_f9Back ly_fdirecCol ly_fitemC" style={{height: "calc(100% - 20px)"}}>
                    <div className="hp_w95 hp_h100 hp_bordDE hp_br5 hp_fBack hp_mt30 hp_mb30" style={{ textAlign: 'center' }}>
                        <h5 className="hp_fw700 hp_fs18 hp_mt15 hp_mb30 hp_floatL hp_ml5 hp_ml20">지정 출/퇴근시간 정보</h5>

                        <table className="bl_tb3">
                            <colgroup>
                                <col style={{width: "120px"}} />
                                <col style={{width: "*"}} />
                            </colgroup>
                            <tbody>
                            <tr>
                                <th scope="row">근무코드</th>
                                <td><input type="text" className="hp_w100"/></td>
                            </tr>
                            <tr>
                                <th scope="row">상위부서</th>
                                <td><input type="text" className="hp_w100"/></td>
                            </tr>
                            <tr>
                                <th scope="row">하위부서</th>
                                <td><input type="text" className="hp_w100"/></td>
                            </tr>
                            <tr>
                                <th scope="row">팀명</th>
                                <td><input type="text" className="hp_w100"/></td>
                            </tr>
                            <tr>
                                <th scope="row">사원명</th>
                                <td><input type="text" className="hp_w100"/></td>
                            </tr>
                            <tr>
                                <th scope="row">생성일</th>
                                <td><input type="text" className="hp_w100"/></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Preferences;