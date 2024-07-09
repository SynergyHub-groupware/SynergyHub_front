import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { EventSourcePolyfill } from 'event-source-polyfill';

const PheedComponent = () => {
    const [pheeds, setPheeds] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('access-token'));
    const [sseEventSource, setSseEventSource] = useState(null);
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태
    const [responseMessage, setResponseMessage] = useState('');
    const sseURL = "http://localhost:8080/api/pheed/subscribe";

    useEffect(() => {
        let eventSource = null;

        const connectSSE = () => {
            if (eventSource) {
                eventSource.removeEventListener('newPheed', handleNewPheed);
                eventSource.close();
            }

            eventSource = new EventSourcePolyfill(sseURL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            eventSource.addEventListener('newPheed', handleNewPheed);

            eventSource.onerror = (err) => {
                console.error("EventSource failed:", err);
                eventSource.close();

                // 오류 발생 시 재연결 시도
                setTimeout(connectSSE, 5000); // 5초 후 재연결 시도
            };

            setSseEventSource(eventSource);
        };

        connectSSE();

        // 컴포넌트 언마운트 시 SSE 연결 해제
        return () => {
            if (eventSource) {
                eventSource.removeEventListener('newPheed', handleNewPheed);
                eventSource.close();
            }
        };
    }, [token]);

    const fetchPheeds = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/pheed/list", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const pheedList = response.data.results.pheeds || [];

            // 데이터가 제대로 로드되었는지 콘솔에 출력
            console.log("Fetched pheeds:", pheedList);

            // 데이터 초기화 후 새로운 데이터로 설정
            setPheeds(pheedList);
            setLoading(false); // 데이터 로딩 완료
        } catch (error) {
            console.error("Error fetching pheeds:", error);
            setLoading(false); // 데이터 로딩 실패
        }
    }, [token]);

    const handleNewPheed = (event) => {
        const newPheed = JSON.parse(event.data);

        // 데이터 초기화 후 다시 불러오기
        fetchPheeds();
    };

    useEffect(() => {
        // 초기 피드 목록 불러오기
        fetchPheeds();
    }, []); // 처음 마운트될 때 한 번만 호출

    // 읽음 상태로 바꾸기
    const handleDetailClick = async (url, pheedCode, e) => {
        e.preventDefault(); // 기본 동작 방지
        console.log('상세보기 클릭됨', url);

        try {
            if (url) {
                const response = await axios.put(`http://localhost:8080/api/pheed/update-readStatus/${pheedCode}`);
                setResponseMessage(response.data.message); // 서버에서 반환한 메시지 설정
                window.location.href = url; // 해당 URL로 페이지 이동
            } else {
                console.error('URL이 없습니다.');
                // 필요 시 오류 처리 로직을 추가할 수 있습니다.
            }
        } catch (error) {
            console.error('Error updating read status:', error);
            setResponseMessage('읽음 처리 실패');
        }
    };

    // 삭제 상태로 바꾸기
    const handleDeleteClick = async (pheedCode) => {
        // 삭제 전 확인 얼럿 띄우기
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                const response = await axios.put(`http://localhost:8080/api/pheed/update-deStatus/${pheedCode}`);
                setResponseMessage(response.data.message); // 서버에서 반환한 메시지 설정
                // 삭제 후 다시 피드 목록 불러오기
                await fetchPheeds();
                window.alert('삭제 완료'); // 삭제 완료 알림
            } catch (error) {
                console.error('Error deleting pheed:', error);
                setResponseMessage('삭제 실패');
            }
        } else {
            console.log('삭제 취소됨');
        }
    };


    return (
        <div className="bl_mainBoard">
            {loading ? (
                <div>Loading...</div> // 데이터 로딩 중
            ) : (
                <>
                    {pheeds.map(pheed => (
                        <section key={pheed.pheedCode} className={`bl_sect el_shadowD4 ly_spaceBetween ly_fitemC hp_p20-30 hp_mt15 ${pheed.readStatus === 'Y' ? 'bl_mainBoard__read' : ''}`}>
                            <div className="ly_flex ly_fitemC">
                                <div className="bl_miniProfile__img"></div>
                                <ul className="hp_ml20">
                                    <li className="hp_fs16 hp_fw400">
                                        <b className="hp_fw700">{pheed.empName || 'Unknown'}</b>님이 상신한 <b className="hp_fw700">{pheed.pheedCon}</b>
                                    </li>
                                    <li className="hp_7Color hp_fs13 hp_mt5">{pheed.pheedSort} <span className="hp_ml10 hp_mr10">/</span>2024.12.23</li>
                                </ul>
                            </div>
                            <div className="ly_flex ly_fitemC">
                                <a className="el_btnS el_btn8Back hp_ml30" href={pheed.url}
                                   onClick={(e) => handleDetailClick(pheed.url, pheed.pheedCode, e)}>
                                    상세보기
                                </a>
                                <button
                                    type="button"
                                    className="bl_mainBoard__delete hp_ml20"
                                    onClick={() => handleDeleteClick(pheed.pheedCode)} // 삭제 버튼 클릭 시 처리 함수 호출
                                ></button>
                            </div>
                        </section>
                    ))}
                </>
            )}
        </div>
    );
};

export default PheedComponent;
