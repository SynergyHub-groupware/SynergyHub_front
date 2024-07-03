import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { callSendDetailAPI, callDelMsgAPI, callGetAttachListAPI } from "../../../../apis/MessageAPICalls";

function WorkDetail() {

    const { msgCode } = useParams();    // URL에서 msgCode 추출
    const dispatch = useDispatch();     // commit
    const msgDetail = useSelector(state => state.messageReducer.messageDetail);
    const navigate = useNavigate();
    const attachmentList = useSelector(state => state.messageReducer.attachments);

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
        
        const attachList = async () => {
            try {
                console.log("API 시작");
                await dispatch(callGetAttachListAPI(msgCode));
                console.log("msgCode attach : ", msgCode);
            } catch (error) {
                console.log("attach error : ", error);
            }
        };

        sendMsgDetail();
        attachList();

    }, [dispatch, msgCode]);

    if (!msgDetail) {
        console.log("msgDetail : ", msgDetail);
        return <div>로딩중..</div>;
    }

    /* 답장 핸들러 */
    const replyHandler = () => {
        navigate('/message/storage/deliver', {
            state: {
                empRev: msgDetail.messageDetail.revName,
                msgTitle: `RE: ${msgDetail.messageDetail.msgTitle}`
            }
        });
    };
    
    /* 전달 핸들러 */
    const transHandler = () => {
        navigate('/message/storage/deliver', {
            state: {
                msgTitle: `FW: ${msgDetail.messageDetail.msgTitle}`,
                msgCon: `${msgDetail.messageDetail.msgCon}`
            }
        })
    }

    /* 삭제 핸들러 */
    const deleteHandler = async () => {

        try {
            console.log(msgCode);
            await dispatch(callDelMsgAPI(msgCode));
            alert("쪽지를 삭제했습니다.");
            navigate("/message/storage/send");
        } catch (error) {
            console.log("삭제 중 오류 : ", error);
            alert("쪽지 삭제에 실패했습니다.");
        }
    };   
    
    // 파일 다운로드
    const downloadAttach = async (attachOriginal, attachSave) => {
        
        try {
            const url = `http://localhost:8080/emp/message/download?attachOriginal=${encodeURIComponent(attachOriginal)}&attachSave=${encodeURIComponent(attachSave)}`;

            const response = await fetch(url);

            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const blob = await response.blob();

            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;

            link.setAttribute('download', attachOriginal);
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(blobUrl);
        } catch(error) {
            console.log("파일 다운로드 error : ", error);
        }
    }

    return (
        <div className="ly_cont">
            <h4 className="el_lv1Head hp_mb30">업무 보관함</h4>
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
                            <td className="hp_alignL">
                                {attachmentList.msgCode && attachmentList.msgCode.length > 0 ? (
                                    <ul>
                                        {attachmentList.msgCode.map(attach => (
                                            <li key={attach.attachSave} onClick={() => downloadAttach(attach.attachOriginal, attach.attachSave)}>{attach.attachOriginal}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div>첨부된 파일 없음</div>
                                )}
                            </td>
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
                        <button type="button" className="el_btnS el_btn8Back" onClick={deleteHandler}>삭제</button>
                        <button type="button" className="el_btnS el_btn8Bord hp_ml5">이동</button>
                        <button type="button" className="el_btnS el_btnblueBord hp_ml5" onClick={transHandler}>전달</button>
                        <button type="button" className="el_btnS el_btnblueBack hp_ml5" onClick={replyHandler}>답장</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default WorkDetail;