import React, { useState } from 'react';

function EventModal({ show, handleClose, handleSave }) {
  const [formData, setFormData] = useState({
    title: '',
    endDate: '',
    startDate: '',
    eventGuests: '',
    allDay: false,
    eventCon: '', // 추가된 필드
    empCode: 1, // Default value
    labelCode: 1 // Default value
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = () => {
    const formatDateTime = (date) => {
      if (!date) return '';
      const [datePart, timePart] = date.split('T');
      const timeWithSeconds = timePart ? `${timePart}:00` : '00:00:00';
      return `${datePart}T${timeWithSeconds}`;
    };

    const formattedData = {
      ...formData,
      startDate: formatDateTime(formData.startDate),
      endDate: formatDateTime(formData.endDate)
    };

    handleSave(formattedData);
    handleClose();
  };

  if (!show) {
    return null;
  }

  return (
      <div className="bl_popBack">
        <div className="bl_popup">
          <div className="bl_popWrap hp_w500px">
            <div className="bl_popHead ly_spaceBetween ly_fitemC">
              <div className="hp_fs18">일정</div>
              <button type="button" className="bl_popup__closeBtn" onClick={handleClose}></button>
            </div>
            <div className="hp_padding10">
              <table className="bl_tb3">
                <colgroup>
                  <col style={{ width: '100px' }} />
                  <col style={{ width: '*' }} />
                </colgroup>
                <tbody>
                <tr>
                  <th scope="row">상위부서명</th>
                  <td>
                    <select className="hp_w100" name="labelCode" value={formData.labelCode} onChange={handleChange}>
                      <option value="1">전체</option>
                      <option value="2">부서</option>
                      <option value="3">팀</option>
                      <option value="4">개인</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">하위부서명</th>
                  <td>
                    <select className="hp_w100" name="labelCode" value={formData.labelCode} onChange={handleChange}>
                      <option value="1">전체</option>
                      <option value="2">부서</option>
                      <option value="3">팀</option>
                      <option value="4">개인</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">팀명</th>
                  <td>
                    <select className="hp_w100" name="labelCode" value={formData.labelCode} onChange={handleChange}>
                      <option value="1">전체</option>
                      <option value="2">부서</option>
                      <option value="3">팀</option>
                      <option value="4">개인</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">사원명</th>
                  <td>
                    <select className="hp_w100" name="labelCode" value={formData.labelCode} onChange={handleChange}>
                      <option value="1">전체</option>
                      <option value="2">부서</option>
                      <option value="3">팀</option>
                      <option value="4">개인</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">시작 시간</th>
                  <td>
                    <div className="ly_flex">
                      <input type="datetime-local" className="hp_w100" name="startDate" value={formData.startDate}
                             onChange={handleChange}/>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">종료 시간</th>
                  <td>
                    <div className="ly_flex">
                      <input type="datetime-local" className="hp_w100" name="endDate" value={formData.endDate}
                             onChange={handleChange}/>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className="hp_alignC hp_mb20 hp_mt10">
              <button type="button" className="el_btnS el_btnblueBack" onClick={handleSubmit}>저장</button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default EventModal;
