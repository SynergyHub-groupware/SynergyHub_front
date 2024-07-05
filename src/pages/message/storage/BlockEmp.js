import { useEffect, useState } from "react";

function BlockEmp() {
    const [blockedEmp, setBlockedEmp] = useState([]);
    const [empSend, setEmpSend] = useState(null);
    const [options, setOptions] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    // 로그인한 사용자의 정보 추출
    useEffect(() => {
        fetch('http://localhost:8080/employee/myInfo', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                setEmpSend(data.emp_code);
            })
            .catch(error => console.log("error : ", error));
    }, []);


    // 로그인한 사용자별 차단 목록 조회
    useEffect(() => {
        if (empSend) {
            const savedEmps = localStorage.getItem(`blockedEmp_${empSend}`);
            setBlockedEmp(savedEmps ? JSON.parse(savedEmps) : []);
        }
    }, [empSend]);

    // 차단 목록 저장
    useEffect(() => {
        if (empSend) {
            localStorage.setItem(`blockedEmp_${empSend}`, JSON.stringify(blockedEmp));
        }
    }, [blockedEmp, empSend]);

    // 회원 주소록 조회
    useEffect(() => {
        fetch('http://localhost:8080/address/select')
            .then(res => res.json())
            .then(data => {
                setOptions(data);
            })
            .catch(error => console.log('error : ', error));
    }, []);

    // 행 추가
    const addRow = () => {
        setBlockedEmp([...blockedEmp, { member: '', date: '', blockDate: '' }]);
        setSelectedOptions([...selectedOptions, false]); // 새로 추가된 행의 선택 여부를 기본값(false)으로 설정
    };

    // 행 삭제
    const deleteRow = (index) => {
        const newBlockEmp = blockedEmp.filter((_, i) => i !== index);
        setBlockedEmp(newBlockEmp);
        const newSelectedOptions = selectedOptions.filter((_, i) => i !== index);
        setSelectedOptions(newSelectedOptions);
    };

    // 차단 회원 등록
    const blockEmp = (blkId, blkName, index) => {
        const currentDate = new Date().toISOString().slice(0, 10);

        const data = {
            blkCode: 1,
            blkDate: currentDate,
            blkId: { emp_code: blkId },
            blkName: { emp_code: blkName }
        };

        console.log(data);

        fetch('http://localhost:8080/emp/message/block', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network res was not ok');
                }

                alert("회원 차단 성공!");

                // 해당 행의 blockDate 업데이트
                const newBlockedEmp = [...blockedEmp];
                newBlockedEmp[index].blockDate = currentDate;
                setBlockedEmp(newBlockedEmp);
            })
            .catch(error => console.log("error : ", error));
    };

    // 차단 회원 선택 시 변경
    const empChangeHandler = (index, value) => {
        updateRow(index, 'member', value);
        setCurrentDate(new Date());
        blockEmp(empSend, value, index);
    };

    // 행의 선택 여부 업데이트
    const updateRow = (index, field, value) => {
        const newBlockEmp = [...blockedEmp];
        newBlockEmp[index][field] = value;
        setBlockedEmp(newBlockEmp);

        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = true; // 선택된 상태로 변경
        setSelectedOptions(newSelectedOptions);
    };

    return (
        <div className="ly_cont">
            <h4 className="el_lv1Head hp_mb30">차단 관리</h4>
            <section className="bl_sect">
                <table className="bl_tb2">
                    <colgroup>
                        <col style={{ width: "200px" }} />
                        <col style={{ width: "*" }} />
                        <col style={{ width: "*" }} />
                        <col style={{ width: "*" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="row">분류</th>
                            <th scope="row">차단 회원</th>
                            <th scope="row">차단 일자</th>
                            <th scope="row">관리</th>
                        </tr>
                    </thead>
                    <tbody className="hp_alignC">
                        <tr>
                            <th scope="row" rowSpan={10}>차단 회원 관리<br />
                                <button type="button" className="el_btnS el_btn8Bord hp_mt5" onClick={addRow}>+ 추가</button>
                            </th>
                        </tr>
                        {blockedEmp && blockedEmp.map((row, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="ly_flex">
                                        <select
                                            style={{ width: "90%" }}
                                            value={row.member}
                                            onChange={(e) => empChangeHandler(index, e.target.value)}
                                            disabled={selectedOptions[index] || row.member !== ''} // 선택된 경우 비활성화
                                        >
                                            <option>차단 회원 선택</option>
                                            {options.length > 0 && options.map((option) => (
                                                <option key={option.emp_code} value={option.emp_code}>
                                                    {option.emp_name} &lt;{option.dept_title} {option.position_name}&gt;  ({option.email})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <div className="ly_flex">
                                        <input
                                            type="text"
                                            className="hp_w100"
                                            value={row.blockDate} // 각 행의 blockDate를 표시
                                            readOnly
                                        />
                                    </div>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="el_btnS el_btn8Back hp_ml5"
                                        onClick={() => deleteRow(index)}
                                    >
                                        차단 해제
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
// commit
export default BlockEmp;