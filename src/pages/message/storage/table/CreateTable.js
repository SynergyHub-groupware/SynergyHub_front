import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CreateTable({msgCode}) {

    const [options, setOptions] = useState([]);
    const [selectEmpRev, setSelectEmpRev] = useState('');
    const [msgTitle, setMsgTitle] = useState('');
    const [msgCon, setMsgCon] = useState('');
    const [emerStatus, setEmerStatus] = useState('N');
    const [empSend, setEmpSend] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        if(location.state && location.state.msgTitle) {
            setMsgTitle(location.state.msgTitle);
        }

        if(location.state && location.state.msgCon) {
            setMsgCon(location.state.msgCon);
        }

        /* 회원 주소록 조회 */
        fetch('http://localhost:8080/address/select')
            .then(res => res.json())
            .then(data => {
                setOptions(data)

                if(location.state && location.state.empRev) {
                    const selectedOption = data.find(option => option.emp_name === location.state.empRev);

                    if(selectedOption) {
                        setSelectEmpRev(selectedOption.emp_code);
                    }
                }
            })
            .catch(error => console.log('error : ', error));

        /* 로그인한 사용자의 정보 추출 */
        fetch('http://localhost:8080/employee/myInfo',{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
            }
        })
            .then(res => res.json())
            .then(data => setEmpSend(data.emp_code))
            .catch(error => console.log("error : ", error));

        /* 임시저장된 쪽지 데이터 불러오기 */
        if (msgCode) {
            fetch(`http://localhost:8080/emp/message/send/${msgCode}`)
                .then(res => res.json())
                .then(data => {
                    setMsgTitle(data.msgTitle);
                    setMsgCon(data.msgCon);
                    if(data.empRev && data.empRev.emp_code) {
                        setSelectEmpRev(data.empRev.emp_code);
                    }
                    setEmerStatus(data.emerStatus);
                })
                .catch(error => console.log("error : ", error));
        }
    }, [location.state, msgCode]);

    /* 확인 버튼 처리 */
    const submitHandler = () => {

        /* 입력 예외처리 */
        if (!selectEmpRev || !msgTitle || !msgCon) {
            alert("받는 사람, 제목, 내용을 모두 입력해주세요.");
            return;
        }

        const confirmSend = window.confirm("쪽지를 보내시겠습니까?");
        if(!confirmSend) {
            return;
        }

        /* JSON 형식으로 INSERT */
        const data = {
            msgTitle,
            msgCon,
            msgStatus: 'N',
            emerStatus,
            empRev: { emp_code: selectEmpRev },
            empSend: { emp_code: empSend },
            revStor: { storCode: 1 },
            sendStor: { storCode: 1}
        };

        fetch('http://localhost:8080/emp/message/send', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log('data create success : ', data);
            alert("쪽지를 성공적으로 보냈습니다.");

            if (msgCode) {
                // 임시 저장된 쪽지는 삭제
                fetch(`http://localhost:8080/emp/message/bin/${msgCode}`, {
                    method: 'DELETE'
                })
                    .then(() => {
                        console.log('임시 저장 쪽지 삭제 성공 :', msgCode);
                    })
                    .catch(error => {
                        console.log("error : ", error);
                        console.log("임시 저장된 쪽지 삭제 실패");
                    });
            }

            navigate('/message/storage/receive');
        })
        .catch(error => {
            console.log("error : : ", error);
            alert("쪽지 전송에 실패하였습니다.");
        });
    };

    const cancelHandler = ( ) => { 
        const cancelConfirm = window.confirm("쪽지 쓰기를 취소하시겠습니까?");
        
        /* 취소한 경우 */
        if ( !cancelConfirm ) {
            return;
        }
    
        /* 취소 안한 경우 */
        if( selectEmpRev !== '' || msgTitle !== '' || msgCon !== '') {
    
            const tempConfirm = window.confirm("임시저장 하시겠습니까?");
            
            if (!tempConfirm) {
                navigate("/message/storage/receive");

            } else {

                /* 임시저장 하는 API fetch로 작성 */
                const data = {
                    msgTitle,
                    msgCon,
                    msgStatus: 'N',
                    emerStatus,
                    empRev: {emp_code: selectEmpRev },
                    empSend: {emp_code: empSend },
                    revStor: { storCode: 4},
                    sendStor: { storCode: 4}
                };

                fetch('http://localhost:8080/emp/message/create/temp', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => {
                    console.log('data temp success : ', data);
                    alert("임시저장이 완료되었습니다.");
                    navigate("/message/storage/temp");
                })
                .catch(error => {
                    console.log("error : : ", error);
                });
                console.log("임시저장 API 작동");
            }
            
        } else {
            navigate("/message/storage/receive");
        }
    }

    return (
        <div>
            <table className="bl_tb3">
                <colgroup>
                    <col style={{ width: "120px" }} />
                    <col style={{ width: "*" }} />
                </colgroup>
                <tbody>
                    <tr>
                        <th scope="col">받는사람</th>
                        <td>
                            <div className="ly_spaceBetween ly_fshirnk">
                                <select 
                                    style={{ width: "90%" }}
                                    value={selectEmpRev}
                                    onChange={(e) => setSelectEmpRev(e.target.value)}
                                >
                                    <option>인원 선택</option>
                                    {options.length > 0 && options.map((option, index) => (
                                        <option key={index} value={option.emp_code}>
                                            {option.emp_name} &lt;{option.dept_title} {option.position_name}&gt;  ({option.email})
                                        </option>
                                    ))}
                                </select>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        value="urgent" 
                                        style={{ minHeight: "inherit" }}
                                        onChange={(e) => setEmerStatus(e.target.checked ? 'Y' : 'N')} 
                                    /> 긴급
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="col">첨부파일</th>
                        <td></td>
                    </tr>
                    <tr style={{ height: "70px" }}>
                        <th scope="col">제목</th>
                        <td>
                            <input 
                                type="text" 
                                style={{ height: "70px" }} 
                                className="hp_w100" 
                                placeholder="100자 이내로 입력해주세요."
                                value={msgTitle}
                                onChange={(e) => setMsgTitle(e.target.value)} 
                            />
                        </td>
                    </tr>
                    <tr style={{ height: "500px" }}>
                        <th scope="col">내용</th>
                        <td>
                            <textarea 
                                className="hp_w100"
                                style={{ height: "500px" }} 
                                placeholder="1000자 이내로 입력해주세요."
                                value={msgCon}
                                onChange={(e) => setMsgCon(e.target.value)}
                        ></textarea></td>
                    </tr>
                </tbody>
            </table>
            <div className="hp_alignR hp_mt10">
                <button type="button" className="el_btnS el_btn8Back" onClick={cancelHandler}>취소</button>
                <button type="button" className="el_btnS el_btnblueBack hp_ml5" onClick={submitHandler}>보내기</button>
            </div>
        </div>
    );
}

export default CreateTable;