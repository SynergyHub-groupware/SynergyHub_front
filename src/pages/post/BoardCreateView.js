import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLowBoard } from './postApi/PostAPI';
import PostAddressDir from './postModal/PostAddressDir';

function BoardCreateView() {
    const dispatch = useDispatch();
    const AllLowState = useSelector(state => state.post.AllLowState);
    const [boards, setBoards] = useState({});

    useEffect(() => {
        dispatch(getAllLowBoard());
    }, [dispatch]);

    const [isReadModalOpen, setIsReadModalOpen] = useState(false);
    const [readModalLowBoardCode, setReadModalLowBoardCode] = useState(null);

    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
    const [writeModalLowBoardCode, setWriteModalLowBoardCode] = useState(null);

    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [adminModalLowBoardCode, setAdminModalLowBoardCode] = useState(null);

    const openModal = (lowBoardCode, modalType) => {
        switch (modalType) {
            case 'read':
                setReadModalLowBoardCode(lowBoardCode);
                setIsReadModalOpen(true);
                break;
            case 'write':
                setWriteModalLowBoardCode(lowBoardCode);
                setIsWriteModalOpen(true);
                break;
            case 'admin':
                setAdminModalLowBoardCode(lowBoardCode);
                setIsAdminModalOpen(true);
                break;
            default:
                break;
        }
    };

    const closeModal = (modalType) => {
        switch (modalType) {
            case 'read':
                setIsReadModalOpen(false);
                setReadModalLowBoardCode(null);
                break;
            case 'write':
                setIsWriteModalOpen(false);
                setWriteModalLowBoardCode(null);
                break;
            case 'admin':
                setIsAdminModalOpen(false);
                setAdminModalLowBoardCode(null);
                break;
            default:
                break;
        }
    };

    const [ReadselectEmps, setReadSelectEmps] = useState([]);
    const [WriteselectEmps, setWriteSelectEmps] = useState([]);
    const [AdminselectEmps, setAdminSelectEmps] = useState([]);
    const [newSubName, setNewSubName] = useState('');
    const [newSubBoardCode, setNewSubBoardCode] = useState('');
    const [oldBoardeCode, setOldBoardCode] = useState('');

    const [nowEmp, setNowEmp] = useState([]);

    const ReadConfirmHandler = (newSelectEmps) => {
        setReadSelectEmps(prev => {
            const existingReadEmps = prev.map(emp => emp.emp_code);
            const filteredNewSelectEmps = newSelectEmps.filter(emp => !existingReadEmps.includes(emp.emp_code));

            setNowEmp(prevNowEmp => {
                const updatedNowEmp = prevNowEmp.filter(([empCode, role]) => role !== 'Read').concat(filteredNewSelectEmps.map(emp => [emp.emp_code, 'Read']));
                console.log('nowEmp after Read selection:', updatedNowEmp); // 데이터 확인용 로그
                return updatedNowEmp;
            });

            console.log('Read select emps:', filteredNewSelectEmps); // 데이터 확인용 로그
            return filteredNewSelectEmps;
        });

        closeModal('read');
    };

    const WriteConfirmHandler = (newSelectEmps) => {
        setWriteSelectEmps(prev => {
            const existingWriteEmps = prev.map(emp => emp.emp_code);
            const filteredNewSelectEmps = newSelectEmps.filter(emp => !existingWriteEmps.includes(emp.emp_code));

            setNowEmp(prevNowEmp => {
                const updatedNowEmp = prevNowEmp.filter(([empCode, role]) => role !== 'Write').concat(filteredNewSelectEmps.map(emp => [emp.emp_code, 'Write']));
                console.log('nowEmp after Write selection:', updatedNowEmp); // 데이터 확인용 로그
                return updatedNowEmp;
            });

            console.log('Write select emps:', filteredNewSelectEmps); // 데이터 확인용 로그
            return filteredNewSelectEmps;
        });

        closeModal('write');
    };

    const AdminConfirmHandler = (newSelectEmps) => {
        setAdminSelectEmps(prev => {
            const existingWriteEmps = prev.filter(emp => emp.role === 'Write').map(emp => emp.emp_code);
            const existingReadEmps = prev.filter(emp => emp.role === 'Read').map(emp => emp.emp_code);
            const filteredNewSelectEmps = newSelectEmps.filter(emp => !(existingWriteEmps.includes(emp.emp_code) || existingReadEmps.includes(emp.emp_code)));

            setNowEmp(prevNowEmp => {
                const updatedNowEmp = prevNowEmp.filter(([empCode, role]) => role !== 'Admin')
                    .concat(filteredNewSelectEmps.map(emp => [emp.emp_code, 'Admin']));
                console.log('nowEmp after Admin selection:', updatedNowEmp); // 데이터 확인용 로그
                return updatedNowEmp;
            });

            console.log('Admin select emps:', filteredNewSelectEmps); // 데이터 확인용 로그
            return filteredNewSelectEmps;
        });

        closeModal('admin');
    };

    useEffect(() => {
        console.log("nowEmp", nowEmp);
    }, [nowEmp]);

    useEffect(() => {
        if (AllLowState.length > 0) {
            const groupedBoards = AllLowState.reduce((acc, lowBoard) => {
                const boardName = lowBoard.boardCode.boardName;
                if (!acc[boardName]) {
                    acc[boardName] = {
                        boardCode: lowBoard.boardCode,
                        lowBoards: []
                    };
                }
                acc[boardName].lowBoards.push(lowBoard);
                return acc;
            }, {});
            setBoards(groupedBoards);
        }
    }, [AllLowState]);

    const addNewRow = (boardName) => {
        const newLowBoard = {
            lowBoardCode: Date.now(),
            lowBoardName: '',
            boardCode: boards[boardName].boardCode,
            read: [],
            write: [],
            admin: []
        };
        setOldBoardCode(boards[boardName].boardCode);
        setBoards(prevBoards => ({
            ...prevBoards,
            [boardName]: {
                ...prevBoards[boardName],
                lowBoards: [...prevBoards[boardName].lowBoards, newLowBoard]
            }
        }));
    };

    const handleSubmit = async (event, boardName, lowBoard) => {
        event.preventDefault();
    
        const singleBoardRequest = {
            lowName: newSubName || lowBoard.lowBoardName, // 변경된 이름이 있으면 사용, 없으면 기존 이름 사용
            boardCode: oldBoardeCode.boardCode,
        };
    
        try {
            let boardCreateResponse;
    
            if (lowBoard.lowBoardCode === 0) {
                // lowBoardCode가 0인 경우 새로 생성
                boardCreateResponse = await fetch('http://localhost:8080/post/boardCreate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(singleBoardRequest),
                });
            } else {
                // lowBoardCode가 0이 아닌 경우 업데이트
                boardCreateResponse = await fetch(`http://localhost:8080/post/boardUpdate/${lowBoard.lowBoardCode}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(singleBoardRequest),
                });
            }
    
            if (!boardCreateResponse.ok) {
                throw new Error(`HTTP 오류! 상태: ${boardCreateResponse.status}`);
            }
    
            const boardCreateData = await boardCreateResponse.json();
            const newLowBoardCode = boardCreateData.lowBoardCode;
            setNewSubBoardCode(newLowBoardCode);
    
            // Call postRoleCreate here after setting newSubBoardCode
            await postRoleCreate();
    
        } catch (error) {
            console.error('양식 제출 중 오류 발생:', error);
            console.error("oldBoardeCode", oldBoardeCode.boardCode);
            console.error("singleBoardRequest", singleBoardRequest);
        }
    };
        
    // useEffect 밖으로 postRoleCreate 함수 빼기
    const postRoleCreate = async () => {
        try {
            // Write 권한을 가진 직원의 empCode 목록
            const writeEmps = nowEmp.filter(([empCode, role]) => role === 'Write').map(([empCode, role]) => empCode);
            // Admin 권한을 가진 직원의 empCode 목록
            const adminEmps = nowEmp.filter(([empCode, role]) => role === 'Admin').map(([empCode, role]) => empCode);
    
            // 중복 제거를 위해 Set 사용
            const uniqueWriteEmps = [...new Set(writeEmps)];
            const uniqueAdminEmps = [...new Set(adminEmps)];
    
            // 중복된 empCode를 처리하여 Y가 더 많은 경우만 선택
            const updatedRoles = nowEmp.reduce((acc, [empCode, role]) => {
                // 이미 배열에 있는 empCode인지 확인
                const existingRole = acc.find(item => item.empCode === empCode);
                if (!existingRole) {
                    // 배열에 없는 경우 추가
                    acc.push({
                        empCode: empCode,
                        prWriteRole: uniqueWriteEmps.includes(empCode) ? 'Y' : 'N',
                        prAdmin: uniqueAdminEmps.includes(empCode) ? 'Y' : 'N',
                        lowCode: newSubBoardCode
                    });
                } else {
                    // 배열에 이미 있는 경우, Y가 더 많은 경우로 업데이트
                    if (role === 'Write' && existingRole.prWriteRole === 'N') {
                        existingRole.prWriteRole = 'Y';
                    }
                    if (role === 'Admin' && existingRole.prAdmin === 'N') {
                        existingRole.prAdmin = 'Y';
                    }
                }
                return acc;
            }, []);
    
            console.log(updatedRoles);
    
            const postRoleResponse = await fetch('http://localhost:8080/post/PostRoleCreate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedRoles),
            });
    
            if (!postRoleResponse.ok) {
                throw new Error(`HTTP 오류! 상태: ${postRoleResponse.status}`);
            }
    
            const postRoleData = await postRoleResponse.json();
            console.log('게시글 역할 생성 응답:', postRoleData);
        } catch (error) {
            console.error('권한 생성 중 오류 발생:', error);
        }
    };
            
    const handleInputChange = (e, boardName, index) => {
        const { value } = e.target;
        const boardCode = boards[boardName].boardCode; // 대분류의 코드 가져오기
        setNewSubName(value);
        setNewSubBoardCode(boardCode.boardCode);

        setBoards(prevBoards => {
            const updatedBoards = { ...prevBoards };
            updatedBoards[boardName].lowBoards[index].lowBoardName = value;
            return updatedBoards;
        });
    };

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 2
            }}
        />
    );
    const handleDelete = async (boardName, lowBoardCode) => {
        try {
            const deleteResponse = await fetch(`http://localhost:8080/post/boardDelete/${lowBoardCode}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!deleteResponse.ok) {
                throw new Error(`HTTP 오류! 상태: ${deleteResponse.status}`);
            }

            // 성공적으로 삭제된 경우, 클라이언트 측에서 해당 항목을 제거
            setBoards(prevBoards => ({
                ...prevBoards,
                [boardName]: {
                    ...prevBoards[boardName],
                    lowBoards: prevBoards[boardName].lowBoards.filter(board => board.lowBoardCode !== lowBoardCode)
                }
            }));

        } catch (error) {
            console.error('게시판 삭제 중 오류 발생:', error);
        }
    };

    return (
        <>
            <div className="button-container">
                <h1>게시판 관리</h1>
                <table className="">
                    <thead>
                        <tr>
                            <th>분류</th>
                            <th>게시판</th>
                            <th>권한</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(boards).map(boardName => (
                            <React.Fragment key={boardName}>
                                <tr className="parent-board">
                                    <td className='tableHead'>
                                        {boardName}
                                        <button type="button" className='button' onClick={() => addNewRow(boardName)}>
                                            소분류 추가
                                        </button>
                                    </td>
                                    <td>
                                        {boards[boardName].lowBoards.map((lowBoard, index) => (
                                            <tr key={lowBoard.lowBoardCode} className="button-wrapper">
                                                <td>
                                                    <input
                                                        value={lowBoard.lowBoardName}
                                                        onChange={(e) => handleInputChange(e, boardName, index)}
                                                    />
                                                    <button type="button" onClick={(event) => handleSubmit(event, boardName, lowBoard)}>저장</button>
                                                    <button type="button" onClick={() => handleDelete(boardName, lowBoard.lowBoardCode)}>삭제</button>

                                                </td>
                                                <div className="button-group">
                                                    <h1>읽기: <button type="button" onClick={() => openModal(lowBoard.lowBoardCode, 'read')}>추가</button></h1>
                                                    <PostAddressDir
                                                        isOpen={isReadModalOpen && readModalLowBoardCode === lowBoard.lowBoardCode}
                                                        closeModal={() => closeModal('read')}
                                                        onConfirm={ReadConfirmHandler}
                                                        onClear={() => setReadSelectEmps([])}
                                                        defaultData={ReadselectEmps}
                                                    />
                                                    <h1>쓰기: <button type="button" onClick={() => openModal(lowBoard.lowBoardCode, 'write')}>추가</button></h1>
                                                    <PostAddressDir
                                                        key={JSON.stringify(WriteselectEmps)}
                                                        isOpen={isWriteModalOpen && writeModalLowBoardCode === lowBoard.lowBoardCode}
                                                        closeModal={() => closeModal('write')}
                                                        onConfirm={WriteConfirmHandler}
                                                        onClear={() => setWriteSelectEmps([])}
                                                        defaultData={WriteselectEmps}
                                                    />
                                                    <h1>관리자: <button type="button" onClick={() => openModal(lowBoard.lowBoardCode, 'admin')}>추가</button></h1>
                                                    <PostAddressDir
                                                        isOpen={isAdminModalOpen && adminModalLowBoardCode === lowBoard.lowBoardCode}
                                                        closeModal={() => closeModal('admin')}
                                                        onConfirm={AdminConfirmHandler}
                                                        onClear={() => setAdminSelectEmps([])}
                                                        defaultData={AdminselectEmps}
                                                    />
                                                </div>
                                                <ColoredLine color="black" />
                                            </tr>
                                        ))}
                                        <ColoredLine color="black" />
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default BoardCreateView;
