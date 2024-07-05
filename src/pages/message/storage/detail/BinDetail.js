import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { callSendDetailAPI } from "../../../../apis/MessageAPICalls";

function BinDetail() {

    const { msgCode } = useParams();    // URL에서 msgCode 추출
    const dispatch = useDispatch();     
    const msgDetail = useSelector(state => state.messageReducer.messageDetail);
    const navigate = useNavigate();

    useEffect(() => {
        
        const sendMsgDetail = async () => {
            try {
                console.log("API 시작");
                await dispatch(callSendDetailAPI(msgCode));
                console.log("msgCode : ", msgCode);
            } catch (error) {
                console.log("error : ", error);
            }
        };
        
        console.log("msgDetail : ", msgDetail);
        sendMsgDetail();

    }, [dispatch, msgCode]);

    const DeleteHandler = async () => {
        
        try {
            const result = await fetch(`http://localhost:8080/emp/message/bin/${msgCode}`, {
                method: 'DELETE'
            });
            
            if (!result.ok) {
                throw new Error("완전 삭제 실패");
            } 
            
            alert("쪽지를 삭제하였습니다.");
            navigate('/message/storage/bin');
        } catch (error) {
            console.log('error : ', error);
            alert("쪽지 삭제에 실패하였습니다.");
        }
    };

    if (!msgDetail) {
        console.log("msgDetail : ", msgDetail);
        return <div>로딩중..</div>;
    }

    return (
        <div className="ly_cont">
            <h4 className="el_lv1Head hp_mb30">휴지통</h4>
            <section className="bl_sect hp_padding15">
                <table className="bl_tb3">
                    <colgroup>
                        <col style={{width: "120px"}} />
                        <col style={{width:"*"}} />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="col">받은사람</th>
                            <td className="hp_alignL">{msgDetail.messageDetail && msgDetail.messageDetail.revName} {msgDetail.messageDetail && msgDetail.messageDetail.revPosition}</td>
                        </tr>
                        <tr>
                            <th scope="col">보낸날짜</th>
                            <td className="hp_alignL">{msgDetail.messageDetail && msgDetail.messageDetail.sendDate}</td>
                        </tr>
                        <tr>
                            <th scope="col">첨부파일</th>
                            <td className="hp_alignL">{msgDetail.messageDetail && msgDetail.messageDetail.storCode}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="hp_alignL">{msgDetail.messageDetail && msgDetail.messageDetail.msgTitle}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="hp_alignL">{msgDetail.messageDetail && msgDetail.messageDetail.msgCon}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="ly_spaceBetween hp_mt10">
                    <button type="button" className="el_btnS el_btn0Back">읽지않음 처리</button>
                    <div className="">
                        <button type="button" className="el_btnS el_btn8Back" onClick={DeleteHandler}>영구삭제</button>
                        <button type="button" className="el_btnS el_btn8Bord hp_ml5">복원</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default BinDetail;