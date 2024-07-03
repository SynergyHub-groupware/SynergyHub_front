import React, { useState, useEffect } from 'react';

const formatDateTime = (date) => {
  if (!date) return '';
  const [datePart, timePart] = date.split('T');
  return `${datePart}T${timePart.slice(0, 8)}`; // 초를 제외한 시간 형식으로 변경
};

function EventInfo({ show, event, handleClose, handleUpdate, handleDelete }) {
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    allDay: false,
    eventGuests: '',
    eventCon: '',
    empCode: 1, // Default value
    labelCode: 1 // Default value
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        startDate: event.start ? formatDateTime(new Date(event.start).toISOString()) : '',
        endDate: event.end ? formatDateTime(new Date(event.end).toISOString()) : '',
        allDay: event.allDay || false,
        eventGuests: event.extendedProps?.eventGuests || '',
        eventCon: event.extendedProps?.eventCon || '',
        empCode: event.extendedProps?.empCode || 1,
        labelCode: event.extendedProps?.labelCode || 1
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleUpdateClick = async () => {
    const formattedData = {
      ...formData,
      startDate: formData.startDate ? formatDateTime(formData.startDate) : null,
      endDate: formData.endDate ? formatDateTime(formData.endDate) : null
    };
    await handleUpdate(event.id, formattedData);
  };

  const handleDeleteClick = async () => {
    await handleDelete(event.id);
  };

  if (!show || !event) {
    return null;
  }

  return (
    <div className="bl_popBack">
      <div className="bl_popup">
        <div className="bl_popWrap hp_w500px">
          <div className="bl_popHead ly_spaceBetween ly_fitemC">
            <div className="hp_fs18">일정 상세</div>
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
                  <th scope="row">제목</th>
                  <td><input type="text" className="hp_w100" name="title" value={formData.title || ''} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <th scope="row">시작 시간</th>
                  <td>
                    <div className="ly_flex">
                      <input type="datetime-local" className="hp_w100" name="startDate" value={formData.startDate || ''} onChange={handleChange} />
                      <label className="hp_w120px"><input type="checkbox" name="allDay" checked={formData.allDay} onChange={handleChange} />종일</label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">종료 시간</th>
                  <td>
                    <div className="ly_flex">
                      <input type="datetime-local" className="hp_w100" name="endDate" value={formData.endDate || ''} onChange={handleChange} />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">라벨 분류</th>
                  <td>
                    <select className="hp_w100" name="labelCode" value={formData.labelCode || 1} onChange={handleChange}>
                      <option value="1">전체</option>
                      <option value="2">부서</option>
                      <option value="3">팀</option>
                      <option value="4">개인</option>
                    </select>
                  </td>
                </tr>
                <tr>
                    <th scope="row">내용</th>
                    <td><textarea className="hp_w100" placeholder="내용을 입력해주세요" name='eventCon' value={formData.eventCon || ''} onChange={handleChange}></textarea></td>
                </tr>
                <tr>
                  <th scope="row">참석자</th>
                  <td><input type="text" className="hp_w100" name="eventGuests" value={formData.eventGuests || ''} onChange={handleChange} /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="hp_alignC hp_mb20 hp_mt10">
            <button type="button" className="el_btnS el_btnblueBack" onClick={handleUpdateClick}>수정</button>
            <button type="button" className="el_btnS el_btnredBack" onClick={handleDeleteClick}>삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventInfo;
