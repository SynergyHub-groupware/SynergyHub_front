import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {callEmployeeInfoAPI, callPromotionAPI} from '../../../apis/AttendancelAPICalls';

function DayOffModal({ show, handleClose, handleSave }) {
  const dispatch = useDispatch();
  const promotion = useSelector((state) => state.attendanceReducer.promotion);

  useEffect(() => {
    dispatch(callPromotionAPI());
  }, [dispatch]);

  return (
      <div className="bl_popBack active">
        <div className="bl_popup">
          <div className="bl_popWrap hp_w500px">
            <div className="bl_popHead ly_spaceBetween ly_fitemC">
              <div className="hp_fs18">일정</div>
              <button type="button" className="bl_popup__closeBtn" onClick={handleClose}></button>
            </div>
            <div className="hp_padding10">
              <table className="bl_tb1" style={{width: '100%'}}>
                <colgroup>
                  <col style={{width: "35px"}}/>
                  <col style={{width: "75px"}}/>
                  <col style={{width: "70px"}}/>
                  <col style={{width: "85px"}}/>
                  <col style={{width: "85px"}}/>
                </colgroup>
                <thead>
                <tr>
                  <th scope="col"><input type="checkbox" className="" id="" name=""
                                         value="checkAll"/></th>
                  <th scope="col">신청일자</th>
                  <th scope="col">사원번호</th>
                  <th scope="col">상위부서명</th>
                  <th scope="col">하위부서명</th>
                </tr>
                </thead>
                <tbody>
                {promotion.length > 0 ? (
                    promotion.map((promotion, index) => (
                        <tr key={index}>
                          <td><input type="checkbox" className="" id="" name=""
                                     value="checkOne"/></td>
                          <td>{promotion.empName}</td>
                          <td className="" style={{textAlign: 'center'}}>{promotion.empCode}</td>
                          <td>{promotion.parTitle}</td>
                          <td>{promotion.subTitle}</td>
                          <td>{promotion.deptTitle}</td>
                          <td>{promotion.empName}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                      <td colSpan="13" style={{textAlign: 'center'}}>데이터가 없습니다.</td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>
            <div className="hp_alignC hp_mb20 hp_mt10">
              <button type="button" className="el_btnS el_btnblueBack">
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default DayOffModal;
