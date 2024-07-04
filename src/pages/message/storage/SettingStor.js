import RevSetting from "./setting/RevSetting";
import SendSetting from "./setting/SendSetting";

function SettingStor() {

    return (
        <div className="ly_cont">
            <h4 className="el_lv1Head hp_mb30">보관함 관리</h4>
            <section className="bl_sect">
                <table className="bl_tb2">
                    <colgroup>
                        <col style={{width: "200px"}} />
                        <col style={{width:"*"}} />
                        <col style={{width:"200px"}} />
                        <col style={{width:"*"}} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="row">분류</th>
                            <th scope="row">쪽지함</th>
                            <th scope="row">상태 (안읽음/전체)</th>
                            <th scope="row">관리</th>
                        </tr>
                    </thead>
                    <tbody className="hp_alignC">
                        <RevSetting/>
                        <SendSetting/>
                        <tr>
                            <th scope="row" rowspan="3">개인 보관함<br />
                            </th>
                            <td>중요 보관함</td>
                            <td>5/10</td>
                            <td>
                                <button type="button" className="el_btnS el_btn8Back hp_ml5">비우기</button>
                            </td>
                        </tr>
                        <tr>
                            <td>업무 보관함</td>
                            <td>1/5</td>
                            <td>
                                <button type="button" className="el_btnS el_btn8Back hp_ml5">비우기</button>
                            </td>
                        </tr>
                        <tr>
                        </tr>
                        <tr>
                            <th scope="row" rowspan="3">휴지통</th>
                            <td>휴지통</td>
                            <td>5/1000</td>
                            <td>
                                <button type="button" className="el_btnS el_btn8Back hp_ml5">비우기</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default SettingStor;