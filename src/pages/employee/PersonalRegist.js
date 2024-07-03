// import '../../css/personal.css';

import { useDispatch, useSelector } from "react-redux";
import { callDepartmentsAPI, callRegistEmployeesAPI } from "../../apis/EmployeeAPICalls";
import { useEffect, useState } from "react";

function PersonalRegist() {

    const [formData, setFormData] = useState({
        detailErdNum: generatePersonnelNumber(),
        detailErdTitle: ''
    });

    const [employeeData, setEmployeeData] = useState({
        hire_date: '',
        emp_name: '',
        social_security_no: '',
        dept_code: '',
        position_code: '',
        title_code: '',
    });

    const positions = [
        { position_code: 'P1', position_name: '대표' },
        { position_code: 'P2', position_name: '이사' },
        { position_code: 'P3', position_name: '부장' },
        { position_code: 'P4', position_name: '과장' },
        { position_code: 'P5', position_name: '대리' },
        { position_code: 'P6', position_name: '사원' },
    ];

    const titles = [
        { title_code: 'T1', title_name: '대표' },
        { title_code: 'T2', title_name: '책임자' },
        { title_code: 'T4', title_name: '부서장' },
        { title_code: 'T5', title_name: '팀장' },
        { title_code: 'T6', title_name: '팀원' },
    ];

    const [employees, setEmployees] = useState([]);

    // 인사번호 생성 함수
    function generatePersonnelNumber() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
        const serialNumber = 1; // 원하는 일련번호의 시작 값 001부터 시작
        const formattedSerialNumber = String(serialNumber).padStart(3, '0'); // 일련번호를 세 자리 숫자로 포맷

        return `PER-${year}-${month}-${formattedSerialNumber}`;
    }

    const dispatch = useDispatch();

    const departments = useSelector(state => state.employeeReducer.departments);

    useEffect(() => {
        dispatch(callDepartmentsAPI());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({
            ...employeeData,
            [name]: value
        });
    };
    
    const handleFormDataChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    // const newEmployee = { ...employeeData , emp_code: '', emp_pass: '', emp_status: 'Y', detailEmpCode: '' };
    // 추가 버튼 클릭 핸들러
    const handleAddEmployee = () => {
        // 폼 데이터를 employees 배열에 추가
        const newEmployee = { ...employeeData };
        setEmployees([...employees, newEmployee]);
        // 입력 폼 초기화
        setEmployeeData({
            hire_date: '',
            emp_name: '',
            social_security_no: '',
            dept_code: '',
            position_code: '',
            title_code: ''
        });
        // setFormData({
        //     detailErdNum: generatePersonnelNumber(),
        //     detailErdTitle: ''
        // });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // 서버로 데이터 전송
            await dispatch(callRegistEmployeesAPI({ ...formData, employees }));
          
            alert('사원이 성공적으로 등록되었습니다.');

            setEmployees([]);
            // 등록 후 폼 초기화 및 상태 업데이트
            setFormData({
                detailErdNum: generatePersonnelNumber(),
                detailErdTitle: '',
            });
            setEmployeeData({
                hire_date: '',
                emp_name: '',
                social_security_no: '',
                dept_code: '',
                position_code: '',
                title_code: ''
            });
        } catch (error) {
            console.error('사원 등록 실패:', error);
            alert('사원 등록 중 오류가 발생하였습니다.');
        }
    };

    const getDepartmentName = (code) => {
        const department = departments.find(dept => dept.dept_code === code);
        return department ? department.dept_title : '';
    };

    const getPositionName = (code) => {
        const position = positions.find(pos => pos.position_code === code);
        return position ? position.position_name : '';
    };

    const getTitleName = (code) => {
        const title = titles.find(tit => tit.title_code === code);
        return title ? title.title_name : '';
    };

    return (
        <div className="ly_cont">
            <div className="ly_spaceBetween ly_fitemEnd hp_mb30">
                <h4 className="el_lv1Head">인사등록</h4>
                <div>
                    <button type="button" className="el_btnS el_btn0Back hp_mr5" onClick={handleSubmit}>등록</button>
                    <button type="button" className="el_btnS el_btnblueBack">일괄등록 & 파일업로드</button>
                </div>
            </div>
            <section className="bl_sect hp_padding15">
                <table className="bl_tb3">
                    <colgroup>
                        <col style={{ width: "120px" }} />
                        <col style={{ width: "*" }} />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">인사번호</th>
                            <td ><input type="text" className="hp_w100" name="detailErdNum" value={formData.detailErdNum} onChange={handleFormDataChange} /></td>
                        </tr>
                        <tr>
                            <th scope="row">제목</th>
                            <td><input type="text" className="hp_w100" name="detailErdTitle" value={formData.detailErdTitle} onChange={handleFormDataChange} /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="ly_spaceBetween hp_mt20">
                    <h5 className="hp_fw700 hp_fs18">개별등록</h5>
                    <div>
                        <button type="button" className="el_btnS el_btn8Back hp_mr5" onClick={() => 
                        setEmployeeData({
                            hire_date: '',
                            emp_name: '',
                            social_security_no: '',
                            dept_code: '',
                            position_code: '',
                            title_code: ''
                        })}>비우기</button>
                        <button type="button" className="el_btnS el_btn0Back" onClick={handleAddEmployee} >추가</button>
                    </div>
                </div>
                <table className="bl_tb3 hp_mt10">
                    <colgroup>
                        <col style={{ width: "120px" }} />
                        <col style={{ width: "*" }} />
                        <col style={{ width: "120px" }} />
                        <col style={{ width: "*" }} />
                        <col style={{ width: "120px" }} />
                        <col style={{ width: "*" }} />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">입사일</th>
                            <td><input type="date" className="hp_w100" name="hire_date" value={formData.hire_date} onChange={handleChange} /></td>
                            <th scope="row">이름</th>
                            <td><input type="text" className="hp_w100" name="emp_name" value={formData.emp_name} onChange={handleChange} /></td>
                            <th scope="row">주민등록번호</th>
                            <td><input type="text" className="hp_w100" name="social_security_no" value={formData.social_security_no} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <th scope="row">부서</th>
                            <td>
                                <select type="text" className="hp_w100" name="dept_code" value={formData.dept_code} onChange={handleChange}>
                                    <option value="">선택</option>
                                    {departments.map(department => (
                                        <option key={department.dept_code} value={department.dept_code}>{department.dept_title}</option>
                                    ))}
                                </select>
                            </td>
                            <th scope="row">직급</th>
                            <td>
                                <select type="text" className="hp_w100" name="position_code" value={formData.position_code} onChange={handleChange} >
                                    <option value="">선택</option>
                                    {positions.map(position => (
                                        <option key={position.position_code} value={position.position_code}>{position.position_name}</option>
                                    ))}
                                </select>
                            </td>
                            <th scope="row">직책</th>
                            <td>
                                <select type="text" className="hp_w100" name="title_code" value={formData.title_code} onChange={handleChange}>
                                    <option value="">선택</option>
                                    {titles.map(title => (
                                        <option key={title.title_code} value={title.title_code}>{title.title_name}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <div className="ly_spaceBetween hp_mt70">
                <button type="button" className="el_btnS el_btn8Back">삭제</button>
                <form action="" method="">
                    <input type="text" className="" id="" name="" value="" placeholder="검색어를 입력해주세요" />
                    <input type="submit" className="el_btnS el_btnblueBord hp_ml5" id="" name="" value="검색" />
                </form>
            </div>
            <section className="bl_sect hp_mt10">
                <table className="bl_tb1">
                    <colgroup>
                        <col style={{ width: "50px" }} />
                        <col style={{ width: "120px" }} />
                        <col style={{ width: "120px" }} />
                        <col style={{ width: "120px" }} />
                        <col style={{ width: "120px" }} />
                        <col style={{ width: "120px" }} />
                        <col style={{ width: "120px" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col"><input type="checkbox" className="" id="" name="" value="checkAll" /></th>
                            <th scope="col">입사일</th>
                            <th scope="col">이름</th>
                            <th scope="col">주민등록번호</th>
                            <th scope="col">부서</th>
                            <th scope="col">직급</th>
                            <th scope="col">직책</th>
                        </tr>
                    </thead>
                    {/* <!-- 5개씩 나열 --> */}
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={index}>
                                <td><input type="checkbox" name="" value="checkOne" /></td>
                                <td>{employee.hire_date}</td>
                                <td>{employee.emp_name}</td>
                                <td>{employee.social_security_no}</td>
                                <td>{getDepartmentName(employee.dept_code)}</td>
                                <td>{getPositionName(employee.position_code)}</td>
                                <td>{getTitleName(employee.title_code)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <div className="ly_spaceBetween ly_fitemC hp_mt10">
                <div className="hp_ml10 hp_7Color">총 1 / <b className="hp_0Color hp_fw700">1</b> 페이지</div>
                <select className="">
                    <option value="">정렬방식</option>
                </select>
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
    )
}
export default PersonalRegist;