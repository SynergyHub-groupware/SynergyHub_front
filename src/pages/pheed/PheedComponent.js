import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { EventSourcePolyfill } from 'event-source-polyfill';

const PheedComponent = () => {
    const [pheeds, setPheeds] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('access-token'));
    const [sseEventSource, setSseEventSource] = useState(null);
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태

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

    const handleDetailClick = (url, e) => {
        e.preventDefault(); // 기본 동작 방지
        console.log('상세보기 클릭됨', url);
        if (url) {
            window.location.href = url; // 해당 URL로 페이지 이동
        } else {
            console.error('URL이 없습니다.');
            // 필요 시 오류 처리 로직을 추가할 수 있습니다.
        }
    };

    return (
        <div className="bl_mainBoard">
            {loading ? (
                <div>Loading...</div> // 데이터 로딩 중
            ) : (
                <>
                    {pheeds.map(pheed => (
                        <section key={pheed.pheedCode} className="bl_sect el_shadowD4 ly_spaceBetween ly_fitemC hp_p20-30 hp_mt15">
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
                                   onClick={(e) => handleDetailClick(pheed.url, e)}>
                                    상세보기
                                </a>
                                <button type="button" className="bl_mainBoard__delete hp_ml20"></button>
                            </div>
                        </section>
                    ))}
                </>
            )}
        </div>
    );
};

export default PheedComponent;
