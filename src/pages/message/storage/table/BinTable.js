import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callBinMsgListAPI } from "../../../../apis/MessageAPICalls";
import { useState } from "react";
import { Link } from "react-router-dom";

function BinTable() {

    const dispatch = useDispatch();
    const messages = useSelector(state => state.messageReducer.messages.message);
    const [sort, setSort] = useState("desc");   // 쪽지 정렬 상태
    const [selectMsg, setSelectMsg] = useState(new Set());
    const [selectAll, setSelectAll] = useState(false);  // 전체 선택

    /* 쪽지 배열 정렬 */
    const sortMsg = (messages, sort) => {

        if (!messages) {
            return [];
        }

        if (sort === "asc") {
            return messages.slice().sort((a, b) => new Date(a.sendDate) - new Date(b.sendDate));
        } else {
            return messages.slice().sort((a, b) => new Date(b.sendDate) - new Date(a.sendDate));
        }
    };


    const sortChangeHandler = (e) => {
        setSort(e.target.value);
    }

    const sortedMessages = sortMsg(messages, sort);

    useEffect(() => {
        console.log("API 작동");
        dispatch(callBinMsgListAPI());        
    }, [dispatch]);

    /* DELETE 로직 구현 */
    const selectMsgHandler = (msgCode) => {
        setSelectMsg(prev => {
            const newSelect = new Set(prev);

            if(newSelect.has(msgCode)) {
                newSelect.delete(msgCode);
            } else {
                newSelect.add(msgCode);
            }
            return newSelect;
        });
    };

    /* 체크박스 전체 선택 */
    const selectAllHandler = (e) => {

        setSelectAll(e.target.checked);

        if(e.target.checked) {
            const allMsgCode = new Set(sortedMessages.map(msg => msg.msgCode));
            setSelectMsg(allMsgCode);
        } else{
            setSelectMsg(new Set());
        }

    }

    const deleteMsgHandler = () =>{
        if(selectMsg.size === 0) {
            alert("삭제하실 쪽지를 선택해주세요.");
            return;
        }

        const deleteConfirm = window.confirm("쪽지를 삭제 하시겠습니까?");

        /* 완전삭제 취소 시 */
        if(!deleteConfirm) {
            return;
        }

        /* 삭제 로직 */
        selectMsg.forEach(msgCode => {
            fetch(`http://localhost:8080/emp/message/bin/${msgCode}`, {
                method: 'DELETE'
            })
                .then(res => {

                    if(res.ok) {
                        console.log('메세지 완전 삭제 : ', msgCode);
                        setSelectMsg(prev => {
                            const newSelect = new Set(prev);
                            newSelect.delete(msgCode);
                            return newSelect;
                        });

                        dispatch(callBinMsgListAPI());  // 쪽지 목록 재조회

                    } else {
                        console.log('메세지 삭제 실패 : ', msgCode);
                    }

                }).catch(error => console.log("error : ", error));
        });
    };

    return(
        <div>
            <div className="ly_spaceBetween">
                <div>
                    <button type="button" className="el_btnS el_btn8Back" onClick={deleteMsgHandler}>영구삭제</button>
                    <button type="button" className="el_btnS el_btn8Bord">복원</button>
                </div>
                <div>
                    <input type="text" placeholder="검색어를 입력해주세요" />
                    <input type="submit" className="el_btnS el_btnblueBord hp_ml5" value="검색" />
                </div>
            </div>
            <section className="bl_sect hp_mt10">
                <table className="bl_tb1">
                    <colgroup>
                        <col style={{ width: "90px" }} />
                        <col style={{ width: "150px" }} />
                        <col style={{ width: "120px" }} />
                        <col style={{ width: "120px" }} />
                        <col style={{ width: "*" }} />
                        <col style={{ width: "*" }} />
                        <col style={{ width: "120px" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col"><input type="checkbox" checked={selectAll} onChange={selectAllHandler} /></th>
                            <th scope="col">작성일</th>
                            <th scope="col">보낸사람</th>
                            <th scope="col">받은사람</th>
                            <th scope="col">제목</th>
                            <th scope="col">긴급</th>
                            <th scope="col">첨부파일 (임시 보관함 번호)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedMessages && sortedMessages.length > 0 ? (
                            sortedMessages.map(msg => (
                            <tr key={msg.msgCode}>
                                <td>
                                    <input type="checkbox" checked={selectMsg.has(msg.msgCode)} onChange={() => selectMsgHandler(msg.msgCode)}/>
                                </td>
                                <td>{msg.sendDate}</td>
                                {/* <td>{msg.sendName ?  `${msg.sendName} ${msg.sendPosition}` : `${msg.revName} ${msg.revPosition}`}</td> */}
                                <td>{msg.sendName} {msg.sendPosition}</td>
                                <td>{msg.revName} {msg.revPosition}</td>
                                <td className="hp_alighL">
                                    <Link to={`/message/storage/bin/detail/${msg.msgCode}`}>{msg.msgTitle}</Link>
                                </td>
                                <td>{msg.emerStatus}</td>
                                <td>{msg.storCode}</td>
                            </tr>
                            ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="hp_pt50 hp_pb50 hp_7Color">목록이 없습니다.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </section>
            <div className="ly_spaceBetween ly_fitemC hp_mt10">
                <div className="hp_ml10 hp_7Color">총 1 / <b className="hp_0Color hp_fw700">1</b> 페이지</div>
                <select value={sort} onChange={sortChangeHandler}>
                    <option value="desc">정렬방식</option>
                    <option value="asc">날짜 오름차순</option>
                </select>
            </div>
        </div>
    );
}

export default BinTable;