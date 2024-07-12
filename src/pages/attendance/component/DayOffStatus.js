import React, {useState} from 'react';
import DayOffModal from "../util/DayOffModal";

function DayOffStatus({ promotion }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const total = 49;

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveModal = (formData) => {
        console.log('Saved Data:', formData);
        setIsModalOpen(false);
    };

    return (
        <section className="bl_sect hp_padding30 el_shadowD4 hp_mb30 section1">
            <div className="ly_spaceBetween">
                <div className="hp_fw700">연차 소진 현황 (현월 기준)</div>
            </div>
            <div className="ly_fitemC">
                <ul className="hp_mt30 ly_spaceBetween">
                    <li className="">
                        <b className="hp_mr15 hp_fw700 hp_fs20" >모든 연차 소진자</b>
                        <div className="hp_floatR hp_mr20 hp_mt10">
                            <a className="hp_fs28 hp_fw700">{promotion.length}</a>&nbsp;/ <a
                            className="hp_7Color">&nbsp;{total}&nbsp;명</a>
                        </div>
                    </li>
                    <li className="">
                        <b className="hp_ml10 hp_fw700 hp_fs20">연차 촉진 대상자</b>
                        <div className="hp_floatR hp_mr20 hp_mt10">
                            <a className="hp_fs28 hp_fw700" onClick={handleOpenModal}>{result(promotion)}&nbsp;</a> / &nbsp;{total} 명
                        </div>
                    </li>
                </ul>
            </div>
            {isModalOpen && (
                <DayOffModal
                    show={isModalOpen}
                    handleClose={handleCloseModal}
                    handleSave={handleSaveModal}
                />
            )}
        </section>
    );
}

const result = (promotion) => {

    const total = 49;
    let num = promotion.length;

    return total - num;
}

export default DayOffStatus;