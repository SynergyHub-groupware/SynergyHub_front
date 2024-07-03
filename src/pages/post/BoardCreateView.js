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

    // 각각의 모달 상태 관리
    const [isReadModalOpen, setIsReadModalOpen] = useState(false);
    const [readModalLowBoardCode, setReadModalLowBoardCode] = useState(null);

    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
    const [writeModalLowBoardCode, setWriteModalLowBoardCode] = useState(null);

    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [adminModalLowBoardCode, setAdminModalLowBoardCode] = useState(null);

    // 공통 모달 데이터 상태
    const [modalData, setModalData] = useState({});

    // 모달창 오픈
    const openModal = (lowBoardCode, modalType, defaultData = { write: [] }) => {
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
        // setModalDefaultData(defaultData);
        // // 읽기 모달 데이터를 쓰기 모달에도 적용
        // if (modalData[lowBoardCode]) {
        //     setModalDefaultData(modalData[lowBoardCode]);
        // }
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

    // 모달창에서 가져온 인원 배열
    const [selectEmps, setSelectEmps] = useState([]);
    const [ReadselectEmps, setReadSelectEmps] = useState([]);
    const [WriteselectEmps, setWriteSelectEmps] = useState([]);
    const [AdminselectEmps, setAdminSelectEmps] = useState([]);

    const [modalDefaultData, setModalDefaultData] = useState({ write: [] });

    // const confirmHandler = (newSelectEmps, type) => {
    //     const currentLowBoardCode = getCurrentLowBoardCode(type);
    //     setModalData(prevModalData => ({
    //         ...prevModalData,
    //         [currentLowBoardCode]: {
    //             ...prevModalData[currentLowBoardCode],
    //             [type]: newSelectEmps
    //         }
    //     }));
    //     closeModal(type);
    // };

    const ReadConfirmHandler = (newSelectEmps) => {
        setReadSelectEmps(prev => {
            const existingEmpCodes = prev.map(emp => emp.emp_code);
            const filteredNewSelectEmps = newSelectEmps.filter(emp => !existingEmpCodes.includes(emp.emp_code));
            return [...prev, ...filteredNewSelectEmps];
        });
        closeModal();
    }
    const WriteConfirmHandler = (newSelectEmps) => {
        setWriteSelectEmps(prev => {
            const existingEmpCodes = prev.map(emp => emp.emp_code);
            const filteredNewSelectEmps = newSelectEmps.filter(emp => !existingEmpCodes.includes(emp.emp_code));
            return [...prev, ...filteredNewSelectEmps];
        });
        closeModal();
    }
    const AdminConfirmHandler = (newSelectEmps) => {
        setAdminSelectEmps(prev => {
            const existingEmpCodes = prev.map(emp => emp.emp_code);
            const filteredNewSelectEmps = newSelectEmps.filter(emp => !existingEmpCodes.includes(emp.emp_code));
            return [...prev, ...filteredNewSelectEmps];
        });
        closeModal();
    }

useEffect(()=>{
    setWriteSelectEmps(ReadselectEmps);
},[setReadSelectEmps])

    const clearReceiver = (type) => {
        const currentLowBoardCode = getCurrentLowBoardCode(type);
        setModalData(prevModalData => ({
            ...prevModalData,
            [currentLowBoardCode]: {
                ...prevModalData[currentLowBoardCode],
                [type]: []
            }
        }));
        closeModal(type);
    };

    const getCurrentLowBoardCode = (type) => {
        switch (type) {
            case 'read':
                return readModalLowBoardCode;
            case 'write':
                return writeModalLowBoardCode;
            case 'admin':
                return adminModalLowBoardCode;
            default:
                return null;
        }
    };

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
            lowBoardCode: Date.now(),  // 임시 고유 ID
            lowBoardName: '',
            boardCode: boards[boardName].boardCode,
            read: [],
            write: [],
            admin: []
        };
        setBoards(prevBoards => ({
            ...prevBoards,
            [boardName]: {
                ...prevBoards[boardName],
                lowBoards: [...prevBoards[boardName].lowBoards, newLowBoard]
            }
        }));
    };

    const handleInputChange = (e, boardName, index) => {
        const { value } = e.target;
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
                                        <button className='button' onClick={() => addNewRow(boardName)}>
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
                                                    {lowBoard.lowBoardName === '' && (
                                                        <button>저장</button>
                                                    )}
                                                </td>
                                                <div className="button-group">
                                                    <h1>읽기: <button onClick={() => openModal(lowBoard.lowBoardCode, 'read')}>추가</button></h1>
                                                    <PostAddressDir
                                                        isOpen={isReadModalOpen && readModalLowBoardCode === lowBoard.lowBoardCode}
                                                        closeModal={() => closeModal('read')}
                                                        onConfirm={ReadConfirmHandler}
                                                        onClear={() => clearReceiver('read')}
                                                    />
                                                    <h1>쓰기: <button onClick={() => openModal(lowBoard.lowBoardCode, 'write')}>추가</button></h1>
                                                    <PostAddressDir
                                                        isOpen={isWriteModalOpen && writeModalLowBoardCode === lowBoard.lowBoardCode}
                                                        closeModal={() => closeModal('write')}
                                                        onConfirm={WriteConfirmHandler}
                                                        onClear={() => clearReceiver('write')}
                                                        defaultData={WriteselectEmps} // 기본 데이터 설정
                                                    />
                                                    <h1>관리자: <button onClick={() => openModal(lowBoard.lowBoardCode, 'admin')}>추가</button></h1>
                                                    <PostAddressDir
                                                        isOpen={isAdminModalOpen && adminModalLowBoardCode === lowBoard.lowBoardCode}
                                                        closeModal={() => closeModal('admin')}
                                                        onConfirm={AdminConfirmHandler}
                                                        onClear={() => clearReceiver('admin')}
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
