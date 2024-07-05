import BinTable from "./table/BinTable";

function Bin() {
    return (
        <div className="ly_cont">
            <h4 className="el_lv1Head hp_mb30">휴지통</h4>
            <BinTable/>
            <section className="bl_sect hp_mt10 hp_padding5 hp_alignC">
                <div className="bl_paging">
                    {/* <a className="bl_paging__btn bl_paging__first" href="" title="첫 페이지로 이동"></a> */}
                    {/* <a className="bl_paging__btn bl_paging__prev" href="" title="이전 페이지로 이동"></a> */}
                    {/* <a className="bl_paging__btn bl_paging__num" href="">1</a> */}
                    {/* <a className="bl_paging__btn bl_paging__next" href="" title="다음 페이지로 이동"></a> */}
                    {/* <a className="bl_paging__btn bl_paging__last" href="" title="마지막 페이지로 이동"></a> */}
                </div>
            </section>
        </div>
        // 커밋용
    );
}

export default Bin;