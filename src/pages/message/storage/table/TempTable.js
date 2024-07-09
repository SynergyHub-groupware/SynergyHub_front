import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { callTempMsgListAPI } from "../../../../apis/MessageAPICalls";

function TempTable({ selectMsgCode, setSelectMsgCode, search, currentPage, setCurrentPage }) {

    const dispatch = useDispatch();
    const [allCheck, setAllCheck] = useState(false);
    const messages = useSelector(state => state.messageReducer.messages.message);
    const [sort, setSort] = useState("desc");   // 쪽지 정렬 상태
    const itemsPerPage = 10; // 페이지당 항목 수 10개로 설정

    /* 날짜 포맷 함수 */
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        
        return date.toISOString().split('T')[0];
    }

    /* 쪽지 배열 정렬 */
    const sortMsg = (messages, sort) => {
    
        if(!messages) {
            return [];
        }

        if(sort === "asc") {
            return messages.slice().sort((a, b) => new Date(a.sendDate) - new Date(b.sendDate));
        } else {
            return messages.slice().sort((a, b) => new Date(b.sendDate) - new Date(a.sendDate));
        }
    };

    
    const sortChangeHandler = (e) => {
        setSort(e.target.value);
    }

    /* 검색어 필터링 */
    const filterMsg = (messages, search) => {
        
        if(!messages) {
            return [];
        }

        if (!search) {
            return messages;
        }

        const lowerfilter = search.toLowerCase();
        return messages.filter(msg =>
            msg.msgTitle.toLowerCase().includes(lowerfilter) ||
            msg.revName.toLowerCase().includes(lowerfilter) ||
            msg.revPosition.toLowerCase().includes(lowerfilter)
        );
    };

    const sortedMessages = sortMsg(filterMsg(messages, search), sort);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentMessages = sortedMessages.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        console.log("api 작동");
        dispatch(callTempMsgListAPI());
    }, [dispatch]);

    /* 체크박스 선택 */
    const checkboxChange = (msgCode) => {
        if (selectMsgCode.includes(msgCode)) {
            setSelectMsgCode(selectMsgCode.filter(code => code !== msgCode));
        } else {
            setSelectMsgCode([...selectMsgCode, msgCode]);
        }
    };

    /* 전체 체크박스 선택 */
    const allCheckChange = () => {
        setAllCheck(prev => !prev);

        if (allCheck) {
            setSelectMsgCode([]);
        } else {
            const allMsg = messages.map(msg => msg.msgCode);
            setSelectMsgCode(allMsg);
        }
        
        setAllCheck(!allCheck);
    }

    return (
        <div>
            <section className="bl_sect hp_mt10">
                <table className="bl_tb1">
                    <colgroup>
                        <col style={{ width: "90px" }} />
                        <col style={{ width: "120px" }} />
                        <col style={{ width: "120px" }} />
                        <col style={{ width: "*" }} />
                        <col style={{ width: "*" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col"><input type="checkbox" value="checkAll" checked={allCheck} onChange={allCheckChange} /></th>
                            <th scope="col">작성일</th>
                            <th scope="col">받은사람</th>
                            <th scope="col">제목</th>
                            <th scope="col">긴급</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentMessages && currentMessages.length > 0 ? (currentMessages.map(msg => (
                            <tr key={msg.msgCode}>
                                <td><input type="checkbox" onChange={() => checkboxChange(msg.msgCode)} checked={selectMsgCode.includes(msg.msgCode)} /></td>
                                <td>{formatDate(msg.sendDate)}</td>
                                <td>{msg.revName} {msg.revPosition}</td>
                                <td className="hp_alighL">
                                    <Link to={`/message/storage/create/temp/${msg.msgCode}`}>{msg.msgTitle}</Link>
                                </td>
                                <td>
                                        {msg.emerStatus === 'Y' ? (
                                            <div>🚨</div>
                                        ) : (
                                            <div></div>
                                        )}</td>
                            </tr>
                        ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="hp_pt50 hp_pb50 hp_7Color">목록이 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
            <div className="ly_spaceBetween ly_fitemC hp_mt10">
                <div className="hp_ml10 hp_7Color">총 {currentMessages.length} / <b className="hp_0Color hp_fw700">1</b> 페이지</div>
                <select value={sort} onChange={sortChangeHandler}>
                    <option value="desc">정렬방식</option>
                    <option value="asc">날짜 오름차순</option>
                </select>
            </div>
        </div>
    );
}

export default TempTable;