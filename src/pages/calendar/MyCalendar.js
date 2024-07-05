import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callEventsAPI } from '../../apis/CalendarAPICalls';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko'; // 한국어 로케일 추가
import EventInfo from './EventInfo';
import EventModal from './EventModal'; // EventModal import
import { request } from '../../apis/api'; // request 함수 import

const MyCalendar = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => ({
    events: state.calendarReducer.events,
  }));

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventInfo, setShowEventInfo] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    dispatch(callEventsAPI());
  }, [dispatch]);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setShowEventInfo(true);
  };

  const handleDayClick = (selectedDate) => {
    setSelectedDate(selectedDate);
    setShowEventModal(true);
  };

  const handleClose = () => {
    setShowEventInfo(false);
    setShowEventModal(false);
    setSelectedEvent(null);
    setSelectedDate(null);
  };

  const formatDateTime = (date) => {
    if (!date) return '';
    const [datePart, timePart] = date.split('T');
    return `${datePart}T${timePart.slice(0, 8)}`; // 초를 제외한 시간 형식으로 변경
  };

  const handleSave = async (formData) => {
    try {
      const formattedData = {
        ...formData,
        startDate: formData.startDate ? formatDateTime(formData.startDate) : null,
        endDate: formData.endDate ? formatDateTime(formData.endDate) : null,
      };
      await request('POST', '/calendar/event/regist', { 'Content-Type': 'application/json' }, formattedData);
      dispatch(callEventsAPI());
      handleClose();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      const formattedData = {
        ...formData,
        startDate: formData.startDate ? formatDateTime(formData.startDate) : null,
        endDate: formData.endDate ? formatDateTime(formData.endDate) : null,
      };
      await request('PUT', `/calendar/event/${id}`, { 'Content-Type': 'application/json' }, formattedData);
      dispatch(callEventsAPI());
      handleClose();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await request('DELETE', `/calendar/event/${id}`);
      dispatch(callEventsAPI());
      handleClose();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const formattedEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    start: event.startDate,
    end: event.endDate,
    allDay: event.allDay,
  }));

  return (
    <div className="ly_cont">
      <h4 className="el_lv1Head hp_mb30">캘린더</h4>
      <section className="bl_sect" style={{ height: 'calc(100% - 30px - 42px)' }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={koLocale}
          events={formattedEvents} // API로 가져온 이벤트 데이터 설정
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay',
          }}
          editable={true}
          selectable={true}
          eventClick={handleEventClick} // 이벤트 클릭 핸들러
          dateClick={(info) => handleDayClick(info.dateStr)} // 날짜 클릭 핸들러
        />
      </section>
      {showEventInfo && (
        <EventInfo
          show={showEventInfo}
          event={selectedEvent}
          handleClose={handleClose}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      )}
      {showEventModal && (
        <EventModal
          show={showEventModal}
          selectedDate={selectedDate}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      )}
    </div>
  );
};

export default MyCalendar;
