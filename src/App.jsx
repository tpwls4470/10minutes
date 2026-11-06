import React, { useState, useEffect } from 'react';

export default function App() {
  const [role, setRole] = useState('senior'); // 'senior' (어르신) | 'helper' (도우미)
  const [inSession, setInSession] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10분 = 600초
  const [selectedCat, setSelectedCat] = useState('phone');
  const [voiceText, setVoiceText] = useState('');
  const [isListening, setIsListening] = useState(false);

  // 10분 카운트다운 타이머
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

  // 음성 인식 시뮬레이션
  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setVoiceText('음성을 듣고 있습니다... 편하게 말씀하세요.');
      setTimeout(() => {
        setVoiceText('“글자가 너무 작아서 크게 키우는 법을 알고 싶어요”');
        setIsListening(false);
      }, 2000);
    }
  };

  const categories = [
    { id: 'phone', icon: '📱', name: '스마트폰 글씨·소리', desc: '글자 크게, 벨소리 키우기, 화면 켜짐' },
    { id: 'talk', icon: '💬', name: '카카오톡 이용법', desc: '사진 보내기, 단체방 소리 끄기, 친구 찾기' },
    { id: 'bank', icon: '💳', name: '은행 송금·돈 보내기', desc: '자녀 용돈 보내기, 계좌 확인, 인증서' },
    { id: 'train', icon: '🚄', name: '기차표·병원 예약', desc: 'KTX 코레일, 시외버스, 동네 병원 예약' },
    { id: 'kiosk', icon: '🍔', name: '식당·가게 무인주문기', desc: '키오스크 터치 주문, 카드 결제' },
    { id: 'etc', icon: '❓', name: '기타 모든 디지털 고민', desc: '무엇이든 친절하게 짚어드립니다' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#e2e8f0', padding: '12px 0' }}>
      
      {/* 스마트폰 규격 프레임 */}
      <div style={{ width: '100%', maxWidth: '440px', minHeight: '880px', backgroundColor: '#f8fafc', borderRadius: '36px', boxShadow: '0 20px 40px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        
        {/* 상단 헤더 영역 */}
        <header style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '22px 20px 18px', borderBottom: '4px solid #f59e0b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '26px' }}>⏱️</span>
              <span style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '-0.5px' }}>10분만</span>
            </div>
            
            {/* 모드 전환 버튼 */}
            {!inSession && (
              <button
                onClick={() => setRole(role === 'senior' ? 'helper' : 'senior')}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.18)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {role === 'senior' ? '청년 도우미 화면 ➔' : '어르신 큰화면 ➔'}
              </button>
            )}
          </div>
          <p style={{ margin: 0, fontSize: '15px', color: '#bfdbfe', fontWeight: '600' }}>
            {role === 'senior' ? '어려운 디지털, 10분 동안 천천히 알려드려요' : '실시간 어르신 디지털 상담 센터'}
          </p>
        </header>

        {/* 안심 보안 배너 (어르신 모드 전용) */}
        {role === 'senior' && !inSession && (
          <div style={{ backgroundColor: '#fef3c7', borderBottom: '1px solid #fde68a', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '22px' }}>🔒</span>
            <div style={{ fontSize: '13px', color: '#92400e', lineHeight: 1.4 }}>
              <strong>안심 안내:</strong> 비밀번호나 개인 금융 정보는 <strong>절대 묻지 않으니</strong> 안심하고 이용하세요.
            </div>
          </div>
        )}

        {/* 본문 콘텐츠 */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          
          {inSession ? (
            /* 10분 상담 진행 화면 */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* 대형 타이머 카드 */}
              <div style={{ backgroundColor: '#0f172a', borderRadius: '26px', padding: '26px 20px', textAlign: 'center', color: 'white', boxShadow: '0 10px 25px rgba(15,23,42,0.2)' }}>
                <div style={{ fontSize: '15px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>남은 상담 시간</div>
                <div style={{ fontSize: '60px', fontWeight: '900', color: timeLeft < 120 ? '#ef4444' : '#38bdf8', letterSpacing: '2px', lineHeight: 1 }}>
                  {formatTime(timeLeft)}
                </div>
                
                {/* 진행 바 */}
                <div style={{ height: '8px', backgroundColor: '#334155', borderRadius: '4px', overflow: 'hidden', margin: '18px 24px 14px' }}>
                  <div style={{ height: '100%', width: `${(timeLeft / 600) * 100}%`, backgroundColor: timeLeft < 120 ? '#ef4444' : '#38bdf8', transition: 'width 1s linear' }} />
                </div>
                
                <div style={{ fontSize: '16px', color: '#e2e8f0', fontWeight: '700' }}>
                  👨‍🏫 친절한 도우미 <span style={{ color: '#fbbf24' }}>박준혁 청년</span>과 연결됨
                </div>
              </div>

              {/* 실시간 화면 공유 안내 박스 */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '24px', border: '3px solid #cbd5e1', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '220px' }}>
                <div style={{ width: '68px', height: '68px', borderRadius: '34px', backgroundColor: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '34px', marginBottom: '12px' }}>
                  👆
                </div>
                <div style={{ fontSize: '19px', fontWeight: '800', color: '#1e293b', marginBottom: '6px' }}>
                  화면을 보며 빨간 펜으로 짚어드려요
                </div>
                <div style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.4 }}>
                  "어르신, 화면 가운데 노란색 버튼을 한번 눌러보세요."
                </div>
                <div style={{ marginTop: '14px', backgroundColor: '#dcfce7', color: '#166534', padding: '6px 14px', borderRadius: '14px', fontSize: '13px', fontWeight: '800' }}>
                  ● 음성 통화 및 화면 공유 작동 중
                </div>
              </div>

              {/* 해결 완료 버튼 */}
              <button
                onClick={() => {
                  alert('상담이 완료되었습니다! 언제든 또 찾아주세요.');
                  setInSession(false);
                  setTimeLeft(600);
                  setVoiceText('');
                }}
                style={{
                  width: '100%',
                  padding: '20px',
                  backgroundColor: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '22px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(5,150,105,0.3)'
                }}
              >
                ✅ 문제 해결 끝! (상담 종료)
              </button>
            </div>
          ) : role === 'senior' ? (
            /* 어르신 전용 도움 신청 화면 */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              
              {/* 안내 문구 */}
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: '0 0 6px' }}>
                  어떤 게 잘 안 되시나요?
                </h2>
                <p style={{ margin: 0, fontSize: '16px', color: '#475569' }}>
                  아래에서 가장 비슷한 것을 하나 눌러주세요.
                </p>
              </div>

              {/* 큼직한 카테고리 카드 목록 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {categories.map((c) => {
                  const isSelected = selectedCat === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCat(c.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '18px 20px',
                        borderRadius: '22px',
                        border: isSelected ? '3px solid #1e40af' : '2px solid #e2e8f0',
                        backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: isSelected ? '0 6px 14px rgba(30,64,175,0.15)' : '0 2px 4px rgba(0,0,0,0.03)'
                      }}
                    >
                      <span style={{ fontSize: '36px', minWidth: '44px', textAlign: 'center' }}>{c.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '19px', fontWeight: '900', color: isSelected ? '#1e40af' : '#1e293b' }}>
                          {c.name}
                        </div>
                        <div style={{ fontSize: '14px', color: '#64748b', marginTop: '3px' }}>
                          {c.desc}
                        </div>
                      </div>
                      <span style={{ fontSize: '22px', color: isSelected ? '#1e40af' : '#cbd5e1', fontWeight: '900' }}>
                        {isSelected ? '●' : '○'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 말로 편하게 설명하기 (음성 버튼) */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '22px', padding: '18px', border: '2px solid #e2e8f0' }}>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
                  글쓰기가 힘드시면 말로 말씀하세요
                </div>
                
                <button
                  onClick={handleVoiceInput}
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: isListening ? '#ef4444' : '#f1f5f9',
                    color: isListening ? 'white' : '#1e293b',
                    border: '2px dashed ' + (isListening ? '#dc2626' : '#94a3b8'),
                    borderRadius: '16px',
                    fontSize: '16px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                >
                  <span style={{ fontSize: '22px' }}>{isListening ? '⏹️' : '🎙️'}</span>
                  <span>{isListening ? '듣고 있는 중입니다... (터치하면 중지)' : '눌러서 말로 질문하기'}</span>
                </button>

                {voiceText && (
                  <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#fef3c7', borderRadius: '12px', fontSize: '15px', color: '#92400e', fontWeight: '700' }}>
                    {voiceText}
                  </div>
                )}
              </div>

              {/* 10분 도움 요청 대형 버튼 */}
              <button
                onClick={() => setInSession(true)}
                style={{
                  width: '100%',
                  padding: '22px',
                  backgroundColor: '#1e40af',
                  color: 'white',
                  border: 'none',
                  borderRadius: '24px',
                  fontSize: '22px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  boxShadow: '0 12px 28px rgba(30,64,175,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}
              >
                <span style={{ fontSize: '26px' }}>⚡</span>
                <span>지금 10분 도우미 연결하기</span>
              </button>
            </div>
          ) : (
            /* 청년 도우미(해결사) 관제 화면 */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: '900' }}>실시간 어르신 요청 대기열</span>
                <span style={{ fontSize: '13px', color: '#059669', fontWeight: '800' }}>● 3명 대기 중</span>
              </div>

              {[
                { name: '이옥순 어르신 (74세)', topic: '스마트폰 글씨 키우기', time: '방금 전', note: '손주 사진 볼 때 글씨가 너무 작다고 하심' },
                { name: '박영철 어르신 (69세)', topic: 'KTX 기차표 예매 결제', time: '1분 전', note: '카드 비밀번호 누르는 화면에서 멈춤' },
                { name: '정해숙 어르신 (66세)', topic: '카톡 사진 묶어보내기', time: '4분 전', note: '동창회 사진 10장 한 번에 보내고 싶어하심' },
              ].map((item, idx) => (
                <div key={idx} style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '18px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a' }}>{item.name}</span>
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>{item.time}</span>
                  </div>
                  <div style={{ display: 'inline-block', backgroundColor: '#eff6ff', color: '#1e40af', padding: '4px 10px', borderRadius: '8px', fontSize: '13px', fontWeight: '800', marginBottom: '8px' }}>
                    {item.topic}
                  </div>
                  <p style={{ margin: '0 0 14px', fontSize: '14px', color: '#475569', lineHeight: 1.4 }}>{item.note}</p>
                  <button
                    onClick={() => setInSession(true)}
                    style={{ width: '100%', padding: '14px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '800', cursor: 'pointer' }}
                  >
                    10분 화면 연결하기 ➔
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}