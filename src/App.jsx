import React, { useState, useEffect } from 'react';

export default function App() {
  const [view, setView] = useState('home'); // 'home' | 'request' | 'helpers' | 'payment' | 'live' | 'mypage'
  const [showNoti, setShowNoti] = useState(false);
  const [hasUnreadNoti, setHasUnreadNoti] = useState(true);

  const [category, setCategory] = useState('스마트폰 기본 설정');
  const [device, setDevice] = useState('삼성 갤럭시');
  const [details, setDetails] = useState('');
  const [selectedHelper, setSelectedHelper] = useState({ id: 1, name: '박준혁 고수', tag: '삼성전자 출신 · 해결률 99%', rating: 4.99, reviews: 184 });
  const [payMethod, setPayMethod] = useState('kakaopay');

  const [timeLeft, setTimeLeft] = useState(600);
  const [micOn, setMicOn] = useState(true);
  const [finishedModal, setFinishedModal] = useState(false);

  useEffect(() => {
    let timer;
    if (view === 'live' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && view === 'live') {
      setFinishedModal(true);
    }
    return () => clearInterval(timer);
  }, [view, timeLeft]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const helpersList = [
    { id: 1, name: '박준혁 고수', spec: '스마트폰 화면 설정 및 카톡 전문', tag: '삼성 서비스센터 5년 근무', rating: 4.99, reviews: 184 },
    { id: 2, name: '이지은 고수', spec: 'KTX 코레일 기차표 및 버스 예매 전문', tag: '어르신 배움터 전문 강사', rating: 4.98, reviews: 142 },
  ];

  // 정적 카드 (호버 효과 없음)
  const clayCardStatic = {
    backgroundColor: '#ffffff',
    border: '1.5px solid rgba(255, 255, 255, 0.95)',
    boxShadow: '0 10px 20px -4px rgba(0, 0, 0, 0.04), inset 0 2px 4px rgba(255, 255, 255, 0.95)',
    borderRadius: '26px',
  };

  // 상호작용 카드 (클릭 이동용 호버 효과)
  const clayCardInteractive = {
    backgroundColor: '#ffffff',
    border: '1.5px solid rgba(255, 255, 255, 0.95)',
    boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.04), inset 0 2px 4px rgba(255, 255, 255, 0.95)',
    borderRadius: '22px',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const clayBtnMint = {
    background: 'linear-gradient(180deg, #bbf7d0 0%, #86efac 100%)',
    color: '#064e3b',
    border: '1px solid rgba(255, 255, 255, 0.9)',
    boxShadow: '0 6px 14px -2px rgba(34, 197, 94, 0.28), inset 0 2px 3px rgba(255, 255, 255, 0.85)',
    cursor: 'pointer',
    fontWeight: '900',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const clayBtnDark = {
    background: 'linear-gradient(180deg, #27272a 0%, #18181b 100%)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 6px 14px -2px rgba(0, 0, 0, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
    cursor: 'pointer',
    fontWeight: '900',
    transition: 'all 0.2s ease',
  };

  const clayInset = {
    backgroundColor: '#f0f0eb',
    border: '1.5px solid #e2e2dc',
    boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.05)',
    borderRadius: '18px',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#ebebe6', padding: '12px 0', fontFamily: 'Pretendard, -apple-system, sans-serif', color: '#18181b' }}>
      
      {/* 뷰포트 컨테이너 */}
      <div style={{ width: '100%', maxWidth: '440px', minHeight: '890px', backgroundColor: '#f5f5f1', borderRadius: '42px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '4px solid #ffffff', position: 'relative' }}>
        
        {/* 상단 헤더: 신규 로고 & 알림 아이콘 */}
        <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'rgba(245,245,241,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e5e5df', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* 신규 리디자인 로고 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setView('home')}>
            <div style={{ width: '38px', height: '38px', borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: '1px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 10px rgba(16,185,129,0.25)' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" d="M12 7v5l3 2" />
              </svg>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-0.5px' }}>10분만</span>
                <span style={{ width: '6px', height: '6px', borderRadius: '3px', backgroundColor: '#10b981' }} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: '900', color: '#a1a1aa', letterSpacing: '0.5px' }}>원격 디지털 짚어주기</span>
            </div>
          </div>

          {/* 우측 알림 버튼 & 마이 버튼 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => { setShowNoti(!showNoti); setHasUnreadNoti(false); }}
              style={{ width: '40px', height: '40px', borderRadius: '14px', backgroundColor: '#ffffff', border: '1.5px solid #e5e5df', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3f3f46', cursor: 'pointer', position: 'relative' }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {hasUnreadNoti && (
                <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '9px', height: '9px', borderRadius: '5px', backgroundColor: '#ef4444', border: '2px solid white' }} />
              )}
            </button>
          </div>
        </header>

        {/* 알림 팝오버 */}
        {showNoti && (
          <div style={{ position: 'absolute', top: '65px', right: '16px', zIndex: 50, width: '280px', ...clayCardStatic, padding: '16px', border: '1px solid #e2e8f0', boxShadow: '0 15px 30px rgba(0,0,0,0.12)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid #f1f1ed', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: '900' }}>새로운 알림 (2)</span>
              <button onClick={() => setShowNoti(false)} style={{ border: 'none', background: 'none', fontSize: '12px', fontWeight: '700', color: '#a1a1aa', cursor: 'pointer' }}>닫기</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: '#f0fdf4', border: '1px solid #dcfce7' }}>
                <div style={{ fontWeight: '900', color: '#166534' }}>🎉 첫 이용 무료 쿠폰 지급!</div>
                <div style={{ color: '#52525b', marginTop: '2px' }}>첫 10분 상담 4,900원 전액 할인 쿠폰이 발급되었습니다.</div>
              </div>
              <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: '900', color: '#0f172a' }}>🛡️ 안심 보증 안내</div>
                <div style={{ color: '#52525b', marginTop: '2px' }}>도우미는 고객님의 금융 비밀번호를 절대 묻지 않습니다.</div>
              </div>
            </div>
          </div>
        )}

        {/* 메인 본문 스크롤 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', paddingBottom: '90px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* ================= 1. 고객 홈 뷰 ================= */}
          {view === 'home' && (
            <>
              {/* 히어로 배너 (배너 자체는 호버 없음, 버튼만 호버!) */}
              <div style={{ ...clayCardStatic, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '900', backgroundColor: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '14px', border: '1px solid #bbf7d0', width: 'fit-content' }}>
                  ● 평균 38초 내 즉시 연결
                </span>
                <h2 style={{ fontSize: '24px', fontWeight: '900', lineHeight: 1.35, margin: 0 }}>
                  어려운 스마트폰 · 디지털<br />
                  <span style={{ color: '#047857', borderBottom: '3px solid #86efac' }}>10분 만에 바로</span> 해결하세요
                </h2>
                <p style={{ margin: 0, fontSize: '13px', color: '#52525b', fontWeight: '600' }}>
                  답답한 설명 대신, 화면을 함께 보며 빨간 펜으로 짚어드립니다.
                </p>
                
                {/* 버튼에만 호버 이펙트 집중! */}
                <button
                  onClick={() => setView('request')}
                  style={{ ...clayBtnMint, width: '100%', padding: '16px', borderRadius: '18px', fontSize: '16px', marginTop: '4px' }}
                >
                  ⚡ 지금 10분 빠른 도움 신청하기
                </button>
              </div>

              {/* 시니어 6대 필수 작업 목록 (1줄 완벽 보장) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '900', margin: 0 }}>어떤 작업이 막히셨나요?</h3>
                {[
                  { icon: '📱', name: '스마트폰 글씨 · 소리 설정', sub: '글자크기 확대 · 벨소리 · 화면 꺼짐 시간' },
                  { icon: '💬', name: '카카오톡 사진 · 문자 보내기', sub: '손주 사진 묶어보내기 · 단체방 알림 끄기' },
                  { icon: '📄', name: '정부24 · 서류 발급 민원', sub: '주민등록등본 · 가족관계증명서 · 인증서' },
                  { icon: '🔑', name: '회원가입 · 휴대폰 본인인증', sub: 'PASS 인증번호 입력 · 아이디 비밀번호 찾기' },
                  { icon: '💳', name: '은행 송금 · 계좌이체', sub: '용돈 보내기 · 카카오페이 · 잔액 조회' },
                  { icon: '🚄', name: '기차표 예매 · 병원 접수', sub: 'KTX 코레일톡 예매 · 고속버스 · 병원 예약' },
                ].map((c, i) => (
                  <button
                    key={i}
                    onClick={() => { setCategory(c.name); setView('request'); }}
                    style={{ ...clayCardInteractive, padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left', border: '1px solid rgba(255,255,255,0.95)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                      <span style={{ fontSize: '24px', padding: '8px', borderRadius: '14px', backgroundColor: '#ecfdf5', flexShrink: 0 }}>{c.icon}</span>
                      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <div style={{ fontSize: '16px', fontWeight: '900', color: '#18181b' }}>{c.name}</div>
                        <div style={{ fontSize: '12px', color: '#71717a', fontWeight: '700', marginTop: '2px' }}>{c.sub}</div>
                      </div>
                    </div>
                    <span style={{ color: '#047857', fontWeight: '900', fontSize: '16px', flexShrink: 0, paddingLeft: '8px' }}>➔</span>
                  </button>
                ))}
              </div>

              {/* 검증된 친절 고수 카드 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '900', margin: 0 }}>검증된 친절 고수</h3>
                  <button onClick={() => setView('helpers')} style={{ border: 'none', background: 'none', color: '#047857', fontSize: '12px', fontWeight: '900', cursor: 'pointer' }}>전체보기 ➔</button>
                </div>

                <div
                  onClick={() => { setSelectedHelper(helpersList[0]); setView('payment'); }}
                  style={{ ...clayCardInteractive, padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: '#e6f4ea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
                      👨‍💻
                    </div>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontWeight: '900', fontSize: '15px' }}>박준혁 고수</span>
                        <span style={{ fontSize: '11px', fontWeight: '900', color: '#d97706' }}>★ 4.99</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#71717a', fontWeight: '700', marginTop: '2px' }}>삼성전자 출신 · 누적 312건 해결</div>
                    </div>
                  </div>
                  <span style={{ ...clayBtnDark, padding: '10px 16px', borderRadius: '14px', fontSize: '12px', flexShrink: 0, marginLeft: '8px' }}>
                    의뢰하기
                  </span>
                </div>
              </div>

              {/* 안심 보증 배너 (정적 카드: 호버 없음, 완벽한 1줄!) */}
              <div style={{ ...clayCardStatic, padding: '14px 18px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '22px', flexShrink: 0 }}>🛡️</span>
                <div style={{ fontSize: '12px', color: '#166534', fontWeight: '800', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <strong>안심 보증:</strong> 금융 비밀번호는 <strong>절대 묻지 않아요.</strong>
                </div>
              </div>
            </>
          )}

          {/* ================= 2. 신청서 작성 뷰 ================= */}
          {view === 'request' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '900', color: '#047857', backgroundColor: '#dcfce7', padding: '3px 8px', borderRadius: '6px' }}>STEP 1</span>
                <h2 style={{ fontSize: '22px', fontWeight: '900', margin: '4px 0 2px' }}>어떤 도움이 필요하신가요?</h2>
                <p style={{ margin: 0, fontSize: '13px', color: '#71717a', fontWeight: '600' }}>내용을 적어주시면 딱 맞는 도우미를 찾아드립니다.</p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', marginBottom: '6px' }}>1. 해결 분야</label>
                <div style={{ ...clayInset, padding: '12px' }}>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '14px', fontWeight: '900', color: '#18181b', outline: 'none' }}
                  >
                    <option value="스마트폰 기본 설정">📱 스마트폰 기본 설정 (글자크기, 벨소리, 화면)</option>
                    <option value="카카오톡 사용법">💬 카카오톡 사진 보내기, 단체방 소리 끄기</option>
                    <option value="정부24·민원서류">📄 정부24 주민등록등본 민원 서류 발급</option>
                    <option value="회원가입·본인인증">🔑 회원가입 및 휴대폰 PASS 본인인증</option>
                    <option value="은행 송금 및 결제">💳 은행 계좌이체, 카카오페이, 간편결제</option>
                    <option value="기차표·교통 예매">🚄 KTX 기차표 예매, 고속버스, 병원 접수</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', marginBottom: '6px' }}>2. 사용 중인 기기</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {['삼성 갤럭시', '애플 아이폰', 'PC / 키오스크'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDevice(d)}
                      style={{ padding: '12px 6px', borderRadius: '16px', border: device === d ? '2px solid #10b981' : '1px solid #e4e4df', backgroundColor: device === d ? '#ffffff' : '#f5f5f1', color: device === d ? '#064e3b' : '#71717a', fontSize: '12px', fontWeight: '900', cursor: 'pointer' }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '900' }}>3. 겪고 계신 문제</label>
                  <button
                    type="button"
                    onClick={() => setDetails('“정부24에서 주민등록등본을 떼려는데 인증서 창에서 멈춰요”')}
                    style={{ border: 'none', background: 'none', color: '#047857', fontSize: '12px', fontWeight: '900', cursor: 'pointer' }}
                  >
                    🎙️ 말로 입력하기
                  </button>
                </div>
                <div style={{ ...clayInset, padding: '14px' }}>
                  <textarea
                    rows="3"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="예: 정부24에서 등본을 떼려는데 인증서 창에서 자꾸 멈춥니다."
                    style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '14px', outline: 'none', resize: 'none', fontWeight: '600' }}
                  />
                </div>
              </div>

              <button
                onClick={() => setView('helpers')}
                style={{ ...clayBtnMint, width: '100%', padding: '18px', borderRadius: '20px', fontSize: '16px' }}
              >
                도우미(고수) 선택하기 ➔
              </button>
            </div>
          )}

          {/* ================= 3. 도우미 선택 뷰 ================= */}
          {view === 'helpers' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '900', color: '#047857', backgroundColor: '#dcfce7', padding: '3px 8px', borderRadius: '6px' }}>STEP 2</span>
                <h2 style={{ fontSize: '22px', fontWeight: '900', margin: '4px 0 2px' }}>도우미를 선택해 주세요</h2>
                <p style={{ margin: 0, fontSize: '13px', color: '#71717a', fontWeight: '600' }}>실시간 대기 중인 인증 도우미입니다.</p>
              </div>

              <div style={{ ...clayCardStatic, padding: '16px', background: 'linear-gradient(135deg, #dcfce7 0%, #ccfbf1 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '900', color: '#064e3b' }}>⚡ 가장 빠른 고수 자동 배정</div>
                  <div style={{ fontSize: '11px', color: '#047857', fontWeight: '700', marginTop: '2px' }}>30초 내 즉시 연결 · 최고 평점 우선</div>
                </div>
                <button
                  onClick={() => { setSelectedHelper(helpersList[0]); setView('payment'); }}
                  style={{ ...clayBtnDark, padding: '10px 16px', borderRadius: '14px', fontSize: '12px' }}
                >
                  즉시 연결
                </button>
              </div>

              {helpersList.map((h) => {
                const isSel = selectedHelper.id === h.id;
                return (
                  <div
                    key={h.id}
                    onClick={() => setSelectedHelper(h)}
                    style={{ ...clayCardInteractive, padding: '16px 18px', border: isSel ? '2px solid #10b981' : '1.5px solid rgba(255,255,255,0.95)' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '24px' }}>👨‍💻</span>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontWeight: '900', fontSize: '16px' }}>{h.name}</span>
                            <span style={{ fontSize: '12px', fontWeight: '900', color: '#d97706' }}>★ {h.rating} ({h.reviews})</span>
                          </div>
                          <div style={{ fontSize: '12px', color: '#71717a', fontWeight: '700', marginTop: '2px' }}>{h.tag}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: '18px', color: isSel ? '#059669' : '#d4d4d8', fontWeight: '900' }}>{isSel ? '●' : '○'}</span>
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() => setView('payment')}
                style={{ ...clayBtnMint, width: '100%', padding: '18px', borderRadius: '20px', fontSize: '16px' }}
              >
                선택한 도우미로 결제하기 ➔
              </button>
            </div>
          )}

          {/* ================= 4. 결제 뷰 ================= */}
          {view === 'payment' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '900', color: '#047857', backgroundColor: '#dcfce7', padding: '3px 8px', borderRadius: '6px' }}>STEP 3</span>
                <h2 style={{ fontSize: '22px', fontWeight: '900', margin: '4px 0 2px' }}>주문 및 안전 결제</h2>
                <p style={{ margin: 0, fontSize: '13px', color: '#71717a', fontWeight: '600' }}>문제가 해결되지 않으면 100% 전액 환불됩니다.</p>
              </div>

              <div style={{ ...clayCardStatic, padding: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', paddingBottom: '6px', borderBottom: '1px solid #f1f1ed' }}>
                  <span style={{ color: '#71717a', fontWeight: '700' }}>배정된 도우미</span>
                  <span style={{ fontWeight: '900' }}>{selectedHelper.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '700' }}>
                  <span>10분 원격 화상/화면공유 상담권</span>
                  <span>4,900원</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '900', color: '#047857' }}>
                  <span>첫 이용 환영 쿠폰</span>
                  <span>- 4,900원</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '900', paddingTop: '8px', borderTop: '2px solid #f1f1ed' }}>
                  <span>최종 결제 금액</span>
                  <span style={{ color: '#047857', fontSize: '22px' }}>0원 (무료체험)</span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', marginBottom: '8px' }}>결제 수단</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {[
                    { id: 'kakaopay', name: '🟡 카카오페이' },
                    { id: 'tosspay', name: '🔵 토스페이' },
                    { id: 'card', name: '💳 신용카드' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPayMethod(m.id)}
                      style={{ padding: '14px 6px', borderRadius: '16px', border: payMethod === m.id ? '2px solid #10b981' : '1px solid #e4e4df', backgroundColor: payMethod === m.id ? '#ffffff' : '#f5f5f1', fontSize: '12px', fontWeight: '900', cursor: 'pointer' }}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { setTimeLeft(600); setView('live'); }}
                style={{ ...clayBtnMint, width: '100%', padding: '18px', borderRadius: '20px', fontSize: '16px' }}
              >
                🔒 결제 및 즉시 10분 상담 시작
              </button>
            </div>
          )}

          {/* ================= 5. 라이브 세션 뷰 ================= */}
          {view === 'live' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ ...clayBtnDark, padding: '24px 20px', borderRadius: '28px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#a1a1aa', fontWeight: '700' }}>
                  <span>● 1:1 라이브 연결 중</span>
                  <span>{selectedHelper.name}</span>
                </div>
                <div style={{ fontSize: '56px', fontWeight: '900', color: timeLeft < 120 ? '#f87171' : '#6ee7b7', fontFamily: 'monospace', letterSpacing: '2px', margin: '4px 0' }}>
                  {formatTime(timeLeft)}
                </div>
                <div style={{ height: '8px', backgroundColor: '#3f3f46', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(timeLeft / 600) * 100}%`, backgroundColor: timeLeft < 120 ? '#f87171' : '#34d399', transition: 'width 1s linear' }} />
                </div>
              </div>

              <div style={{ ...clayCardStatic, height: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '24px', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', marginBottom: '8px' }}>
                  📲
                </div>
                <div style={{ fontWeight: '900', fontSize: '16px' }}>스마트폰 화면 공유 진행 중</div>
                <div style={{ fontSize: '13px', color: '#71717a', fontWeight: '600', marginTop: '2px' }}>도우미가 화면에 빨간 펜으로 위치를 짚어드리고 있습니다.</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  onClick={() => setMicOn(!micOn)}
                  style={{ ...clayCardStatic, padding: '16px', borderRadius: '18px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                >
                  {micOn ? '🎙️ 마이크 켜짐' : '🔇 마이크 꺼짐'}
                </button>
                <button
                  onClick={() => setFinishedModal(true)}
                  style={{ ...clayBtnMint, padding: '16px', borderRadius: '18px', fontSize: '14px' }}
                >
                  ✅ 해결 완료
                </button>
              </div>
            </div>
          )}

          {/* ================= 6. 마이페이지 뷰 (새로 탑재) ================= */}
          {view === 'mypage' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ ...clayCardStatic, padding: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '20px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '900', boxShadow: '0 4px 10px rgba(16,185,129,0.3)' }}>
                  김
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px', fontWeight: '900' }}>김*순 고객님</span>
                    <span style={{ fontSize: '10px', fontWeight: '900', padding: '2px 8px', borderRadius: '10px', backgroundColor: '#dcfce7', color: '#166534' }}>VIP</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#71717a', fontWeight: '700', marginTop: '2px' }}>보유 무료 상담권: 1장</div>
                </div>
              </div>

              <div style={{ ...clayCardStatic, padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '14px', fontWeight: '900' }}>내 디지털 상담 활동</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', textAlign: 'center' }}>
                  <div style={{ padding: '12px', backgroundColor: '#f0f0eb', borderRadius: '14px' }}>
                    <div style={{ fontSize: '12px', color: '#71717a', fontWeight: '700' }}>해결한 문제</div>
                    <div style={{ fontSize: '20px', fontWeight: '900', color: '#047857', marginTop: '4px' }}>2회</div>
                  </div>
                  <div style={{ padding: '12px', backgroundColor: '#f0f0eb', borderRadius: '14px' }}>
                    <div style={{ fontSize: '12px', color: '#71717a', fontWeight: '700' }}>자주 찾는 고수</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', marginTop: '4px' }}>박준혁 고수</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  '📋 지난 상담 기록 및 녹화본 보기',
                  '🎁 친구 초대하고 10분 무료권 받기',
                  '📞 24시간 전화 고객센터 문의',
                ].map((item, i) => (
                  <button key={i} style={{ ...clayCardInteractive, padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', fontSize: '14px', fontWeight: '900', color: '#27272a' }}>
                    <span>{item}</span>
                    <span style={{ color: '#a1a1aa' }}>➔</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ================= 세련된 모노크롬 3D 플로팅 독 (하단바) ================= */}
        {view !== 'live' && (
          <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', zIndex: 40 }}>
            <nav style={{ backgroundColor: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(16px)', border: '2px solid rgba(255,255,255,0.95)', boxShadow: '0 16px 36px -6px rgba(0,0,0,0.12), inset 0 1px 2px #ffffff', borderRadius: '32px', padding: '8px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              
              {/* 1) 홈 */}
              <button
                onClick={() => setView('home')}
                style={{ flex: 1, border: 'none', background: view === 'home' ? '#064e3b' : 'none', color: view === 'home' ? '#ffffff' : '#71717a', borderRadius: '20px', padding: '8px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', fontWeight: '900', fontSize: '12px', cursor: 'pointer', boxShadow: view === 'home' ? '0 4px 12px rgba(6,78,59,0.35)' : 'none', transition: 'all 0.2s ease' }}
              >
                <svg width="20" height="20" fill="none" stroke={view === 'home' ? '#ffffff' : 'currentColor'} strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>홈</span>
              </button>

              {/* 2) 고수목록 */}
              <button
                onClick={() => setView('helpers')}
                style={{ flex: 1, border: 'none', background: view === 'helpers' ? '#064e3b' : 'none', color: view === 'helpers' ? '#ffffff' : '#71717a', borderRadius: '20px', padding: '8px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', fontWeight: '900', fontSize: '12px', cursor: 'pointer', boxShadow: view === 'helpers' ? '0 4px 12px rgba(6,78,59,0.35)' : 'none', transition: 'all 0.2s ease' }}
              >
                <svg width="20" height="20" fill="none" stroke={view === 'helpers' ? '#ffffff' : 'currentColor'} strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>고수목록</span>
              </button>

              {/* 3) 중앙 솟아오른 3D 10분신청 액션 버튼 */}
              <div style={{ padding: '0 4px', marginTop: '-24px' }}>
                <button
                  onClick={() => setView('request')}
                  style={{ width: '56px', height: '56px', borderRadius: '20px', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', border: 'none', boxShadow: '0 8px 18px -2px rgba(5,150,105,0.45), 0 0 0 4px #ffffff, inset 0 2px 3px rgba(255,255,255,0.6)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', transition: 'all 0.25s ease' }}
                >
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  <span style={{ fontSize: '9px', fontWeight: '900', marginTop: '2px', letterSpacing: '-0.5px' }}>신청하기</span>
                </button>
              </div>

              {/* 4) 상담내역 */}
              <button
                onClick={() => setView('home')}
                style={{ flex: 1, border: 'none', background: 'none', color: '#71717a', borderRadius: '20px', padding: '8px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', fontWeight: '900', fontSize: '12px', cursor: 'pointer' }}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span>상담내역</span>
              </button>

              {/* 5) 마이페이지 */}
              <button
                onClick={() => setView('mypage')}
                style={{ flex: 1, border: 'none', background: view === 'mypage' ? '#064e3b' : 'none', color: view === 'mypage' ? '#ffffff' : '#71717a', borderRadius: '20px', padding: '8px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', fontWeight: '900', fontSize: '12px', cursor: 'pointer', boxShadow: view === 'mypage' ? '0 4px 12px rgba(6,78,59,0.35)' : 'none', transition: 'all 0.2s ease' }}
              >
                <svg width="20" height="20" fill="none" stroke={view === 'mypage' ? '#ffffff' : 'currentColor'} strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>마이</span>
              </button>

            </nav>
          </div>
        )}

        {/* 완료 모달 */}
        {finishedModal && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(24,24,27,0.6)', backdropFilter: 'blur(4px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div style={{ ...clayCardStatic, padding: '28px 24px', textAlign: 'center', width: '100%', maxWidth: '310px' }}>
              <div style={{ fontSize: '42px', marginBottom: '8px' }}>✨</div>
              <h3 style={{ fontSize: '20px', fontWeight: '900', margin: '0 0 6px' }}>10분 상담 해결 완료!</h3>
              <p style={{ fontSize: '13px', color: '#52525b', fontWeight: '600', margin: '0 0 16px', lineHeight: 1.5 }}>
                {selectedHelper.name}님과의 상담이 만족스러우셨나요?<br />별점 평가를 남겨주세요.
              </p>
              <div style={{ fontSize: '26px', color: '#f59e0b', marginBottom: '18px' }}>★★★★★</div>
              <button
                onClick={() => { setFinishedModal(false); setView('home'); }}
                style={{ ...clayBtnDark, width: '100%', padding: '14px', borderRadius: '16px', fontSize: '15px' }}
              >
                홈으로 돌아가기
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}