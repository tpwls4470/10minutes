import React, { useState, useEffect } from 'react';

export default function App() {
  const [tab, setTab] = useState('request'); // 'request' | 'helper' | 'history'
  const [inSession, setInSession] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10분
  const [category, setCategory] = useState('smart');
  const [detail, setDetail] = useState('');
  const [micOn, setMicOn] = useState(true);

  // 10분 타이머
  useEffect(() => {
    let timer;
    if (inSession && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      alert('10분 상담이 완료되었습니다.');
      setInSession(false);
      setTimeLeft(600);
    }
    return () => clearInterval(timer);
  }, [inSession, timeLeft]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const categories = [
    { id: 'smart', icon: '📱', title: '스마트폰 기본 설정', desc: '글씨 크기, 소리/진동, 화면 꺼짐 시간' },
    { id: 'bank', icon: '💳', title: '은행 / 간편 송금', desc: '계좌이체, 카카오페이, 공인인증서' },
    { id: 'ticket', icon: '🚄', title: '기차표 / 버스 예매', desc: 'KTX 코레일, 시외버스, 병원 예약' },
    { id: 'kiosk', icon: '🍔', title: '키오스크 주문하기', desc: '패스트푸드, 무인 계산대 이용법' },
    { id: 'talk', icon: '💬', title: '카카오톡 사용법', desc: '사진 묶어보내기, 단톡방 알림 끄기' },
    { id: 'etc', icon: '❓', title: '기타 디지털 질문', desc: '정부24, 주민등록등본, 앱 다운로드' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#e2e8f0', padding: '16px 0' }}>
      {/* 스마트폰 목업 프레임 */}
      <div style={{ width: '100%', maxWidth: '420px', minHeight: '840px', backgroundColor: '#ffffff', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        
        {/* 상단 앱 헤더 */}
        <div style={{ padding: '24px 20px 16px', background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>⚡</span>
              <span style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' }}>10분만</span>
            </div>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
              실시간 해결사 18명 대기 중
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '13px', opacity: 0.85 }}>
            디지털이 어려울 때, 10분 동안 화면을 보며 짚어드립니다.
          </p>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          {inSession ? (
            /* 10분 통화 세션 화면 */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#0f172a', borderRadius: '24px', padding: '24px 20px', textAlign: 'center', color: 'white', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}>남은 상담 시간</span>
                <div style={{ fontSize: '54px', fontWeight: '900', color: timeLeft < 120 ? '#f43f5e' : '#38bdf8', letterSpacing: '2px', margin: '4px 0' }}>
                  {formatTime(timeLeft)}
                </div>
                <div style={{ height: '6px', backgroundColor: '#334155', borderRadius: '3px', overflow: 'hidden', margin: '12px 20px' }}>
                  <div style={{ height: '100%', width: `${(timeLeft / 600) * 100}%`, backgroundColor: timeLeft < 120 ? '#f43f5e' : '#38bdf8', transition: 'width 1s linear' }} />
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#cbd5e1' }}>
                  👨‍🏫 <strong>김민우 서포터즈</strong> 님이 연결되었습니다
                </p>
              </div>

              {/* 가상 화면공유 뷰 */}
              <div style={{ backgroundColor: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '24px', padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '220px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '30px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '12px' }}>
                  📲
                </div>
                <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>스마트폰 화면 공유 중</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>도우미가 화면에 빨간색 펜으로 위치를 짚어줍니다</p>
                <div style={{ marginTop: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#fee2e2', color: '#dc2626', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '4px', backgroundColor: '#dc2626' }}></span>
                  실시간 화면 전송 중
                </div>
              </div>

              {/* 컨트롤 버튼 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  onClick={() => setMicOn(!micOn)}
                  style={{ padding: '14px', borderRadius: '16px', border: '1px solid #cbd5e1', backgroundColor: micOn ? '#f1f5f9' : '#fee2e2', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
                >
                  {micOn ? '🎙️ 마이크 켜짐' : '🔇 마이크 꺼짐'}
                </button>
                <button
                  onClick={() => {
                    alert('문제가 깔끔하게 해결되었습니다! 상담을 종료합니다.');
                    setInSession(false);
                    setTimeLeft(600);
                  }}
                  style={{ padding: '14px', borderRadius: '16px', border: 'none', backgroundColor: '#10b981', color: 'white', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
                >
                  ✨ 해결 완료 (종료)
                </button>
              </div>
            </div>
          ) : tab === 'request' ? (
            /* 도움 요청 화면 */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ backgroundColor: '#eff6ff', borderRadius: '20px', padding: '18px 20px', border: '1px solid #bfdbfe' }}>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#1d4ed8', marginBottom: '4px' }}>어떤 작업이 막히셨나요?</div>
                <div style={{ fontSize: '13px', color: '#3b82f6' }}>가장 가까운 질문을 누르시면 전문 도우미와 즉시 연결됩니다.</div>
              </div>

              <div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#475569', marginBottom: '10px' }}>카테고리 선택</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {categories.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setCategory(c.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '14px 16px',
                        borderRadius: '16px',
                        border: category === c.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        backgroundColor: category === c.id ? '#f0fdf4' : '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span style={{ fontSize: '26px' }}>{c.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '700', fontSize: '15px', color: '#1e293b' }}>{c.title}</div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{c.desc}</div>
                      </div>
                      <span style={{ color: category === c.id ? '#2563eb' : '#cbd5e1', fontWeight: 'bold' }}>✓</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>추가 설명 (선택)</div>
                <textarea
                  rows="2"
                  placeholder="예: 글씨를 제일 크게 바꾸고 싶은데 어디 있는지 모르겠어요."
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '14px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', resize: 'none' }}
                />
              </div>

              <button
                onClick={() => setInSession(true)}
                style={{
                  width: '100%',
                  padding: '18px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '18px',
                  fontSize: '18px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  boxShadow: '0 10px 20px -5px rgba(37,99,235,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>⚡</span>
                <span>지금 10분 도움 요청하기</span>
              </button>
            </div>
          ) : (
            /* 도우미 목록 화면 */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '800', fontSize: '16px' }}>도움 요청 피드</span>
                <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '700' }}>● 실시간 갱신 중</span>
              </div>
              {[
                { name: '이*순 (73세)', topic: '스마트폰 글씨 키우기', time: '방금 전', reward: '3,000원' },
                { name: '박*철 (68세)', topic: 'KTX 기차표 예매 결제 오류', time: '2분 전', reward: '3,000원' },
                { name: '최*숙 (64세)', topic: '병원 예약 문자 링크 열기', time: '5분 전', reward: '3,000원' },
              ].map((item, idx) => (
                <div key={idx} style={{ padding: '16px', borderRadius: '18px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '700', fontSize: '15px' }}>{item.name}</span>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>{item.time}</span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#334155', marginBottom: '12px' }}>{item.topic}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#2563eb' }}>사례금: {item.reward}</span>
                    <button
                      onClick={() => setInSession(true)}
                      style={{ padding: '8px 16px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      상담 수락 ➔
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 하단 내비게이션 바 */}
        {!inSession && (
          <div style={{ display: 'flex', borderTop: '1px solid #f1f5f9', padding: '12px 20px', backgroundColor: '#ffffff', justifyContent: 'space-around' }}>
            <button
              onClick={() => setTab('request')}
              style={{ border: 'none', background: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: tab === 'request' ? '#2563eb' : '#94a3b8', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
            >
              <span style={{ fontSize: '20px' }}>🙋‍♂️</span>
              도움 받기
            </button>
            <button
              onClick={() => setTab('helper')}
              style={{ border: 'none', background: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: tab === 'helper' ? '#2563eb' : '#94a3b8', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
            >
              <span style={{ fontSize: '20px' }}>👨‍🏫</span>
              도와주기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}