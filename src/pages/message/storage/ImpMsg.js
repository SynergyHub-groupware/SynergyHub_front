import ImpTable from "./table/ImpTable";
import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { callDelMsgAPI } from "../../../apis/MessageAPICalls";

function ImpMsg() {

    const dispatch = useDispatch();
    const [selectMsgCode, setSelectMsgCode] = useState([]);
    const [search, setSearch] = useState("");   // 검색어 상태
    const searchRef = useRef(null); // 검색 입력 필드

    const delMsgHandler = () => {

        if (selectMsgCode.length === 0) {
            alert("삭제하실 쪽지를 선택해주세요.");
            return;
        }
        
        if ( window.confirm("메세지를 삭제하시겠습니까?")) {

            selectMsgCode.forEach(msgCode => {
                dispatch(callDelMsgAPI(msgCode));
            });
            
            alert("쪽지를 삭제하였습니다.");
            window.location.reload();   
        }
    };

    const searchHandler = (e) => {

        e.preventDefault();

        if (searchRef.current) {
            const searchTerm = searchRef.current.value;
            setSearch(searchTerm); 
        } else {
            console.log("searchRef가 정의되지 않음");
        }
    };

    return (
        <div className="ly_body" style={{ width: "100%" }}>
            <div className="ly_cont">
                <h4 className="el_lv1Head hp_mb30">중요 보관함</h4>
                <div className="ly_spaceBetween">
                    <div>
                        <button type="button" className="el_btnS el_btn8Back" onClick={delMsgHandler}>삭제</button>
                        <button type="button" className="el_btnS el_btn8Bord">이동</button>
                    </div>
                    <div>
                        <form onSubmit={searchHandler}>
                            <input type="text" ref={searchRef} placeholder="검색어를 입력해주세요" />
                            <input type="submit" className="el_btnS el_btnblueBord hp_ml5" value="검색"/>
                        </form>
                    </div>
                </div>
                <ImpTable selectMsgCode={selectMsgCode} setSelectMsgCode={setSelectMsgCode} search={search} />
                <section className="bl_sect hp_mt10 hp_padding5 hp_alignC">
                    <div className="bl_paging">
                        {/* <a href="#" className="bl_paging__btn bl_paging__first" title="첫 페이지로 이동"></a> */}
                        {/* <a href="#" className="bl_paging__btn bl_paging__prev" title="이전 페이지로 이동"></a> */}
                        {/* <a href="#" className="bl_paging__btn bl_paging__num">1</a> */}
                        {/* <a href="#" className="bl_paging__btn bl_paging__next" title="다음 페이지로 이동"></a> */}
                        {/* <a href="#" className="bl_paging__btn bl_paging__last" title="마지막 페이지로 이동"></a> */}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ImpMsg;