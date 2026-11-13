import { useEffect, useRef, useState } from 'react'
import ClayIcon from './ClayIcon'
import QuickIntro from './QuickIntro'
import CategoryArt from './CategoryArt'
import NavIcon from './NavIcon'
import './App.css'
import './theme.css'
import './studio.css'

const categories = [
  { id: 'talk', icon: 'talk', title: '카카오톡 사용하기', description: '사진 보내기, 친구 추가하기', tasks: ['사진 보내기', '친구 추가하기', '단체방·알림 설정하기', '다른 도움이 필요해요'], color: 'yellow' },
  { id: 'settings', icon: 'settings', title: '휴대폰 설정하기', description: '글씨 키우기, 소리 조절하기', tasks: ['글씨 크게 보기', '소리·벨소리 조절하기', '와이파이 연결하기', '다른 도움이 필요해요'], color: 'blue' },
  { id: 'photos', icon: 'camera', title: '사진·동영상 다루기', description: '사진 찾기, 저장하기, 정리하기', tasks: ['사진·동영상 찾기', '사진 저장하기', '사진 정리하기', '다른 도움이 필요해요'], color: 'pink' },
  { id: 'booking', icon: 'calendar', title: '예매·예약하기', description: '기차표 예매, 병원 예약', tasks: ['기차표 예매하기', '버스표 예매하기', '병원 예약하기', '다른 도움이 필요해요'], color: 'purple' },
  { id: 'documents', icon: 'documents', title: '민원·서류·인증', description: '정부24 서류 발급, 본인인증', tasks: ['정부24 민원·서류 발급하기', '휴대폰 본인인증하기', '아이디·비밀번호 찾기', '다른 도움이 필요해요'], color: 'peach' },
  { id: 'apps', icon: 'apps', title: '다른 앱 사용하기', description: '앱 설치부터 사용 방법까지', tasks: ['앱 설치하기', '앱 사용 방법 배우기', '앱 삭제하기', '다른 도움이 필요해요'], color: 'mint' },
]
const otherCategory = { id: 'other', icon: 'question', title: '함께 알아보기', tasks: ['통화하면서 설명할게요'] }
const teachers = [
  { name: '박준혁', photo: '/teacher-junhyuk.png', description: '휴대폰 설정과 카카오톡을 쉽게 알려드려요.', rating: '4.9', reviews: 128, sessions: 246, badge: '친절한 설명', quote: '제가 직접 해볼 때까지 기다려주셨어요.' },
  { name: '이지은', photo: '/teacher-jieun.png', description: '앱 사용과 예매를 차근차근 도와드려요.', rating: '4.9', reviews: 96, sessions: 183, badge: '차근차근 수업', quote: '어려운 말 없이 쉽게 설명해주셨어요.' },
]
function firstView() { try { return sessionStorage.getItem('10min-intro-seen-v2') ? 'welcome' : 'intro' } catch { return 'intro' } }
const requestKey = '10min-demo-request'
const eventKey = '10min-demo-call'
function readRequest() { try { return JSON.parse(localStorage.getItem(requestKey)) } catch { return null } }
function writeLocal(key, value) { try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* Preview remains usable without storage. */ } }
function PageIntro({ eyebrow, title, children, headingRef }) { return <div className="page-intro">{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h1 ref={headingRef} tabIndex={-1}>{title}</h1>{children && <p>{children}</p>}</div> }
function PriceGuide() { return <aside className="price-card" aria-label="이용 요금 안내"><div className="eyebrow">미리 확인하는 이용 요금</div><div className="price-line"><h2>기본 10분</h2><strong>4,900<span>원</span></strong></div><p>영상통화로 차근차근 알려드려요.</p><div className="price-note"><span aria-hidden="true">✓</span><p>시간이 더 필요하면 요금을 먼저 안내해요.<br /><b>동의하실 때만 연장해요.</b></p></div><small>현재 요금은 예시이며 실제 결제는 진행되지 않아요.</small></aside> }
function SafetyBanner() { return <aside className="safety-banner"><ClayIcon name="shield"/><p><strong>안심 보장:</strong> 금융 비밀번호는 <b>절대 묻지 않아요.</b></p></aside> }

function TeacherPreview() {
  const [request, setRequest] = useState(readRequest)
  const [status, setStatus] = useState('')
  useEffect(() => {
    const onStorage = event => { if (event.key === requestKey) { setRequest(readRequest()); setStatus('') } }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])
  function call() {
    writeLocal(eventKey, { requestId: request.id, action: 'ring', nonce: crypto.randomUUID() })
    setStatus('수신 화면 체험 요청을 보냈어요. 고객 탭에서 확인해주세요.')
  }
  return <div className="app teacher-app"><header className="header"><a href="/" className="teacher-brand">10분만 <span>디지털 선생님</span></a></header><main><PageIntro eyebrow="선생님 전용 화면 · 미리보기" title={'고객에게 먼저\n전화해주세요'}>상담 요청을 확인하고 고객에게 연결하는 화면이에요.</PageIntro><p className="demo-note">같은 브라우저의 고객 탭과 연결되는 화면 체험이에요. 실제 통화·임시번호 발급은 진행되지 않아요.</p>{request?.status === 'waiting' ? <div className="summary-card"><span className="status-chip">체험 상담 요청</span><h2>{request.task}</h2><p>{request.category}<br />담당: {request.teacher} 선생님<br />전화번호: 서로 공개하지 않음</p><button className="primary" onClick={call}>고객에게 전화 걸기 · 화면 체험</button><p role="status" className="button-hint">{status}</p></div> : <div className="empty-state"><ClayIcon name="history"/><h2>대기 중인 체험 요청이 없어요</h2><p>고객 탭에서 도움 신청을 먼저 진행해주세요.</p></div>}<a href="/" className="text-link">고객 화면 열기</a></main></div>
}

function CustomerApp() {
  const [view, setView] = useState(firstView)
  const [category, setCategory] = useState(categories[0])
  const [task, setTask] = useState('')
  const [largeText, setLargeText] = useState(false)
  const [teacher, setTeacher] = useState(teachers[0])
  const [device, setDevice] = useState('잘 모르겠어요')
  const [payment, setPayment] = useState('카드')
  const [records, setRecords] = useState([])
  const [profile, setProfile] = useState(null)
  const [phone, setPhone] = useState('')
  const [otpStep, setOtpStep] = useState(false)
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [notifications, setNotifications] = useState(true)
  const [unread, setUnread] = useState(true)
  const [screenConsent, setScreenConsent] = useState(false)
  const [remoteConsent, setRemoteConsent] = useState(false)
  const [sharePreview, setSharePreview] = useState(false)
  const [micOn, setMicOn] = useState(true)
  const [callRequest, setCallRequest] = useState(null)
  const [explanationMode, setExplanationMode] = useState('')
  const [requestDetails, setRequestDetails] = useState('')
  const [coupon, setCoupon] = useState('none')
  const [reviewRecordId, setReviewRecordId] = useState(null)
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [reviewTags, setReviewTags] = useState([])
  const heading = useRef(null)
  const initialRender = useRef(true)
  useEffect(() => {
    if (initialRender.current) { initialRender.current = false; return }
    window.scrollTo({ top: 0, behavior: 'instant' })
    heading.current?.focus({ preventScroll: true })
  }, [view])
  useEffect(() => {
    const onStorage = event => {
      if (event.key !== eventKey || view !== 'waiting' || !callRequest) return
      try { const data = JSON.parse(event.newValue); if (data?.requestId === callRequest.id && data.action === 'ring') setView('incoming') } catch { /* Ignore malformed preview messages. */ }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [view, callRequest])
  function goTo(next) {
    if (callRequest && ['waiting', 'incoming', 'live'].includes(view) && !['incoming', 'live'].includes(next)) {
      writeLocal(requestKey, { ...callRequest, status: 'ended' })
      setCallRequest(null); setScreenConsent(false); setRemoteConsent(false); setSharePreview(false)
    }
    setError(''); setView(next)
  }
  function chooseCategory(item) { setCategory(item); setTask(item.id === 'other' ? item.tasks[0] : ''); setExplanationMode(''); setRequestDetails(''); goTo('request') }
  function finishIntro() { try { sessionStorage.setItem('10min-intro-seen-v2', '1') } catch { /* Intro can be skipped without storage. */ } goTo('welcome') }
  const customRequest = task === '다른 도움이 필요해요'
  const requestSummary = customRequest ? (explanationMode === 'text' ? requestDetails.trim() : '전화로 설명할게요') : task
  const discount = coupon === 'first' ? 4900 : coupon === 'thanks' ? 1000 : 0
  const finalPrice = 4900 - discount
  const priceText = value => `${value.toLocaleString('ko-KR')}원`
  function login(event) {
    event.preventDefault()
    if (!otpStep) {
      if (!/^01[016789]\d{7,8}$/.test(phone.replace(/\D/g, ''))) { setError('휴대폰 번호를 다시 확인해주세요.'); return }
      setOtpStep(true); setError(''); return
    }
    if (otp !== '123456') { setError('체험용 인증번호 123456을 입력해주세요.'); return }
    setProfile({ name: '체험 고객', phone: `010-****-${phone.replace(/\D/g, '').slice(-4)}` }); setPhone(''); setOtp(''); setOtpStep(false); goTo('home')
  }
  function startWaiting() {
    const request = { id: crypto.randomUUID(), teacher: teacher.name, category: category.title, task: requestSummary, status: 'waiting' }
    setCallRequest(request); writeLocal(requestKey, request); goTo('waiting')
  }
  function endCall(completed = false) {
    if (callRequest) writeLocal(requestKey, { ...callRequest, status: 'ended' })
    if (completed) {
      const id = crypto.randomUUID()
      setRecords(current => [...current, { id, teacher: teacher.name, photo: teacher.photo, task: requestSummary, taskSelection: task, details: requestDetails, mode: explanationMode, category: category.title, amount: finalPrice }])
      setReviewRecordId(id); setRating(0); setReviewText(''); setReviewTags([])
    }
    setScreenConsent(false); setRemoteConsent(false); setSharePreview(false); setMicOn(true); setCallRequest(null)
    goTo(completed ? 'review' : 'home')
  }
  function saveReview(event) {
    event.preventDefault()
    if (!rating) { setError('별점을 선택해주세요.'); return }
    setRecords(current => current.map(record => record.id === reviewRecordId ? { ...record, review: { rating, text: reviewText.trim(), tags: reviewTags } } : record))
    goTo('history')
  }
  const navHidden = ['intro', 'welcome', 'login', 'waiting', 'incoming', 'live', 'review'].includes(view)
  const homeActive = ['home', 'request', 'helpers', 'payment', 'permissions'].includes(view)

  return <div className={`app ${largeText ? 'large-text' : ''} view-${view}`}>
    <header className="header"><button className="brand" onClick={() => goTo('home')} aria-label="10분만 홈"><img className="brand-image" src="/10minutes-logo-rose.png" alt="10분만"/></button><div className="header-actions"><button className="text-size" aria-label={largeText ? '기본 글씨로 보기' : '글씨 크게 보기'} aria-pressed={largeText} onClick={() => setLargeText(!largeText)}>가<span>{largeText ? '기본' : '크게'}</span></button><button className="notification-button" aria-label="알림 보기" onClick={() => { setUnread(false); goTo('notifications') }}><ClayIcon name="bell"/>{unread && <span className="notification-dot"/>}</button></div></header>
    <main>
      {view === 'intro' && <QuickIntro onFinish={finishIntro}/>}
      {view === 'welcome' && <section className="welcome"><span className="welcome-kicker">내 곁의 디지털 선생님</span><h1 ref={heading} tabIndex={-1}>막히는 순간,<br /><span>10분만</span> 함께해요.</h1><p>휴대폰이 어려울 때<br />영상통화로 천천히 알려드려요.</p><figure className="welcome-photo"><img src="/waiting-for-help.png" alt="일상 속에서 휴대폰 도움을 기다리는 고객"/><span className="photo-badge"><ClayIcon name="video"/>막히는 순간, 함께 연결해요</span></figure><div className="welcome-points"><span><b>01</b>도움받을 일 고르기</span><span><b>02</b>선생님 전화 받기</span><span><b>03</b>차근차근 배우기</span></div><button className="primary" onClick={() => goTo('login')}>간편하게 시작하기 <span>→</span></button><button className="text-button" onClick={() => goTo('home')}>로그인 없이 먼저 둘러보기</button><button className="intro-replay" onClick={() => goTo('intro')}>이용 안내 다시 보기</button><SafetyBanner/></section>}
      {view === 'login' && <><button className="back" onClick={() => goTo('welcome')}>‹ 처음으로</button><PageIntro headingRef={heading} eyebrow="쉽고 간단하게" title={otpStep ? '인증번호를\n입력해주세요' : '전화번호 하나로\n시작해요'}>{otpStep ? '체험용 번호 123456을 입력해보세요.' : '복잡한 아이디나 비밀번호는 필요 없어요.'}</PageIntro><div className="login-symbol"><ClayIcon name={otpStep ? 'shield' : 'phone'}/></div><p className="demo-note">로그인 화면 체험이에요. 문자는 발송되지 않으며 입력한 번호는 서버로 전송하거나 저장하지 않아요.</p><form onSubmit={login}>{!otpStep ? <label className="field-label">휴대폰 번호<input type="tel" inputMode="tel" autoComplete="off" placeholder="010 1234 5678" value={phone} onChange={event => setPhone(event.target.value)} maxLength={13}/></label> : <><label className="field-label">체험용 인증번호<input type="text" inputMode="numeric" autoComplete="off" value={otp} placeholder="123456" maxLength={6} onChange={event => setOtp(event.target.value.replace(/\D/g, ''))}/></label><button type="button" className="text-button" onClick={() => { setOtpStep(false); setError('') }}>전화번호 다시 입력하기</button></>}<p className="form-error" role="alert">{error}</p><button className="primary" type="submit">{otpStep ? '확인하고 체험하기' : '인증 화면 미리보기'}</button></form><button className="text-button" onClick={() => goTo('home')}>입력 없이 둘러보기</button></>}
      {view === 'home' && <>
        <section className="home-greeting home-hero"><h1 ref={heading} tabIndex={-1}>어떤 도움이<br />필요하세요<span>?</span></h1><p>디지털 선생님과 같은 화면을 보며<br />막히는 곳을 하나씩 해결해요.</p><figure className="home-remote-photo"><img src="/remote-help-hero.png" alt="서로 다른 장소에서 휴대폰 화면을 함께 보며 원격으로 도움을 주는 디지털 선생님" width="1536" height="1024" fetchPriority="high"/><figcaption><span>① 전화 받기</span><span>② 화면 함께 보기</span><span>③ 차근차근 해결</span></figcaption></figure><p className="remote-caption">화면 공유·원격 도움은 내가 허용할 때만.</p><button className="hero-guide-link" onClick={() => goTo('guide')}>어떻게 도움받나요? 자세히 보기 ›</button></section>
        <div className="section-label"><h2>도움받을 일을 골라주세요</h2></div><div className="category-list">{categories.map(item => <button className="category-card" key={item.id} onClick={() => chooseCategory(item)}><span className={`category-icon ${item.color}`} aria-hidden="true">{item.id === 'talk' ? <img src="/kakaotalk.png" alt="" width="48" height="48"/> : <CategoryArt type={item.icon}/>}</span><span className="category-copy"><strong>{item.title}</strong><span>{item.description}</span></span><span className="chevron" aria-hidden="true">›</span></button>)}</div><button className="unsure-card" onClick={() => chooseCategory(otherCategory)}><span className="question-mark"><ClayIcon name="question"/></span><span><strong>잘 모르겠어요</strong><span>통화하면서 설명할게요</span></span><span className="chevron">›</span></button><div className="reassurance"><p>서두르지 않으셔도 괜찮아요.<br /><strong>내 속도에 맞춰 함께 배워요.</strong></p></div><SafetyBanner/></>}
      {view === 'guide' && <><button className="back" onClick={() => goTo('home')}>‹ 홈으로</button><PageIntro headingRef={heading} title={'선생님이 먼저\n전화드려요'}>전화가 오면 받기만 해주세요.</PageIntro><figure className="welcome-photo"><img src="/video-call-hero.png" alt="휴대폰으로 영상통화 수업을 받는 모습"/></figure><ol className="guide-steps"><li><b>도움받을 일을 골라요</b><p>내용을 고르고 요금을 확인해주세요.</p></li><li><b>디지털 선생님이 전화해요</b><p>앱에 전화가 오면 ‘전화 받기’를 눌러요.</p></li><li><b>필요할 때만 화면을 보여줘요</b><p>내가 허용할 때 화면을 함께 봐요. 원격 조작은 지원 기기에서 별도로 동의해요.</p></li></ol><p className="demo-note">현재는 화면 미리보기예요. 실제 통화와 원격 지원은 준비 중이에요.</p><button className="primary" onClick={() => goTo('home')}>도움받을 일 고르기</button></>}
      {view === 'request' && <><button className="back" onClick={() => goTo('home')}>‹ 다른 도움 고르기</button><PageIntro headingRef={heading} eyebrow="1단계 · 자세한 일 선택" title={category.id === 'other' ? '어려운 점을 함께\n알아볼게요' : '어떤 일이\n어려우세요?'}>{category.title} · 가장 가까운 일을 골라주세요.</PageIntro><div className="task-list" role="group" aria-label="자세한 일 선택">{category.tasks.map(item => <button key={item} className={`task-button ${task === item ? 'selected' : ''}`} aria-pressed={task === item} onClick={() => { setTask(item); setExplanationMode(''); setRequestDetails('') }}><span>{item}</span><span className="selection-dot">{task === item ? '✓' : ''}</span></button>)}</div>
        {customRequest && <section className="explanation-options" aria-label="도움 내용 설명 방법"><h2>어떻게 설명하시겠어요?</h2><p>편한 방법을 골라주세요.</p><button className="explanation-choice" onClick={() => { setExplanationMode('phone'); goTo('helpers') }}><ClayIcon name="phone"/><span><strong>전화로 설명할게요</strong><span>바로 디지털 선생님 찾기</span></span><b>›</b></button><button className={`explanation-choice ${explanationMode === 'text' ? 'selected' : ''}`} aria-pressed={explanationMode === 'text'} onClick={() => setExplanationMode('text')}><ClayIcon name="documents"/><span><strong>직접 입력할게요</strong><span>어려운 내용을 글로 남기기</span></span><b>›</b></button>{explanationMode === 'text' && <div className="request-input"><label className="field-label" htmlFor="request-details">어떤 점이 어려우세요?</label><textarea id="request-details" rows={4} maxLength={300} value={requestDetails} onChange={event => setRequestDetails(event.target.value)} placeholder="예: 사진을 컴퓨터로 옮기고 싶어요."/><span>{requestDetails.length} / 300자</span></div>}</section>}
        <PriceGuide/>{!customRequest && <p className="gentle-note">글로 설명하지 않으셔도 괜찮아요.<br />자세한 내용은 말로 알려주세요.</p>}<button className="primary" disabled={!task || (customRequest && (explanationMode !== 'text' || !requestDetails.trim()))} onClick={() => goTo('helpers')}>디지털 선생님 찾기 →</button>{customRequest && !explanationMode && <p className="button-hint">위에서 설명 방법을 골라주세요.</p>}</>}
      {view === 'helpers' && <><button className="back" onClick={() => goTo('request')}>‹ 도움 내용 바꾸기</button><PageIntro headingRef={heading} eyebrow="2단계 · 디지털 선생님 선택" title={'함께할 선생님을\n골라주세요'}>{requestSummary}</PageIntro><p className="teacher-example-note">사진은 생성 이미지이며, 평점·후기·상담 횟수는 예시예요.</p><div className="teacher-list">{teachers.map(item => <button key={item.name} className={`teacher-card detailed-teacher ${teacher.name === item.name ? 'selected' : ''}`} aria-pressed={teacher.name === item.name} onClick={() => setTeacher(item)}><div className="teacher-heading"><img className="teacher-photo" src={item.photo} alt={`${item.name} 디지털 선생님 프로필 예시`}/><span className="teacher-heading-copy"><strong>{item.name} 선생님</strong><span className="teacher-rating">★ {item.rating} <small>후기 {item.reviews}개</small></span><span className="teacher-badge">{item.badge}</span></span><span className="selection-dot">{teacher.name === item.name ? '✓' : ''}</span></div><p className="teacher-description">{item.description}</p><div className="teacher-metrics"><span>상담 {item.sessions}회</span><b>10분 4,900원</b></div><blockquote>“{item.quote}”<small>예시 후기</small></blockquote></button>)}</div><button className="primary" onClick={() => goTo('payment')}>이 선생님께 도움받기 →</button></>}
      {view === 'payment' && <><button className="back" onClick={() => goTo('helpers')}>‹ 선생님 다시 고르기</button><PageIntro headingRef={heading} eyebrow="3단계 · 요금 확인" title={'도움받을 내용을\n확인해주세요'}>{teacher.name} 선생님과 함께해요.</PageIntro><div className="summary-card"><h2>{category.title}</h2><p>{requestSummary}</p></div><PriceGuide/>
        <section className="coupon-section"><label className="field-label" htmlFor="coupon-select">사용할 쿠폰</label><select id="coupon-select" value={coupon} onChange={event => setCoupon(event.target.value)}><option value="none">쿠폰을 사용하지 않을게요</option><option value="thanks">체험용 1,000원 할인 쿠폰</option><option value="first">체험용 첫 10분 무료 쿠폰</option></select><p className="button-hint">할인 적용을 살펴보는 예시 쿠폰이에요. 한 장만 적용돼요.</p></section><div className="payment-total" aria-live="polite"><p><span>기본 10분</span><span>4,900원</span></p><p><span>쿠폰 할인</span><span>- {priceText(discount)}</span></p><p className="final-total"><strong>최종 결제 예정 금액</strong><b>{priceText(finalPrice)}</b></p></div>
        <fieldset><legend>어떤 휴대폰을 쓰세요?</legend><div className="chips">{['삼성 갤럭시', '애플 아이폰', '잘 모르겠어요'].map(item => <button key={item} aria-pressed={device === item} className={device === item ? 'selected' : ''} onClick={() => { setDevice(item); setRemoteConsent(false) }}>{item}</button>)}</div></fieldset><fieldset><legend>결제 방법</legend><div className="chips">{['카드', '카카오페이', '토스페이'].map(item => <button key={item} aria-pressed={payment === item} className={payment === item ? 'selected' : ''} onClick={() => setPayment(item)}>{item}</button>)}</div></fieldset><p className="demo-note">{priceText(finalPrice)} 결제 예정 화면이에요. 체험 중에는 실제 결제되지 않아요.</p><button className="primary" onClick={() => goTo('permissions')}>통화 준비하기 →</button></>}
      {view === 'permissions' && <><button className="back" onClick={() => goTo('payment')}>‹ 요금 확인으로</button><PageIntro headingRef={heading} eyebrow="4단계 · 안심하고 연결" title={'내가 허용한 만큼만\n함께 봐요'}>화면 공유와 원격 조작은 따로 선택해요.</PageIntro><div className="permission-card"><ClayIcon name="video"/><div><h2>영상통화</h2><p>실제 연결 시 카메라·마이크 사용을 기기에서 직접 허용해요.</p></div></div><label className="consent-option"><input type="checkbox" checked={screenConsent} onChange={event => { setScreenConsent(event.target.checked); if (!event.target.checked) setRemoteConsent(false) }}/><span><b>화면 함께 보기 · 선택</b><span>통화 중 내가 보고 있는 화면을 보여줘요.<br />언제든 공유를 멈출 수 있어요.</span></span></label><label className={`consent-option ${device !== '삼성 갤럭시' || !screenConsent ? 'unavailable' : ''}`}><input type="checkbox" checked={remoteConsent} disabled={device !== '삼성 갤럭시' || !screenConsent} onChange={event => setRemoteConsent(event.target.checked)}/><span><b>원격 조작 도움 · 선택</b><span>{device === '삼성 갤럭시' ? '화면 공유 선택 후 신청할 수 있어요. 실제 지원 가능 여부는 기기 확인이 필요해요.' : '아이폰·미확인 기기는 화면을 보며 설명하는 방식으로 안내해요.'}</span></span></label><p className="demo-note">동의 화면 미리보기예요. 기기 권한은 변경되지 않으며 실제 화면 공유·원격 조작은 실행되지 않아요.</p><SafetyBanner/><button className="primary" onClick={startWaiting}>선생님 전화 기다리기</button></>}
      {view === 'waiting' && <div className="connection-screen"><span className="status-chip">전화 연결 준비 · 체험</span><div className="waiting-orbit"><ClayIcon name="phone"/><span className="loading-dots"><i/><i/><i/></span></div><PageIntro headingRef={heading} title={'선생님이 전화를\n준비하고 있어요'}>{teacher.name} 선생님이 전화하면<br />이 화면에서 받아주세요.</PageIntro><div className="summary-card"><p><b>{requestSummary}</b><br />앱 안에서 전화 · 개인 번호 공개 없이</p><span className="status-chip">안심번호 전화 연결은 준비 중</span></div><p className="demo-note">실제 통화 연결 중이 아닌 대기 화면 체험이에요. 아래에서 수신 화면을 확인할 수 있어요.</p><button className="primary" onClick={() => goTo('incoming')}>전화 받기 화면 미리보기</button><a className="text-link" href="/teacher" target="_blank" rel="noreferrer">선생님 화면에서 전화 걸어보기 ↗</a><p className="button-hint">같은 브라우저의 다른 탭에서 체험할 수 있어요.</p><button className="text-button" onClick={() => endCall()}>기다리기 취소</button></div>}
      {view === 'incoming' && <div className="connection-screen"><span className="status-chip">수신 화면 체험</span><div className="caller-avatar"><img src={teacher.photo} alt={teacher.name + " 선생님 프로필 예시"}/></div><PageIntro headingRef={heading} title={`${teacher.name} 선생님이\n전화했어요`}>디지털 선생님 · 앱 영상통화</PageIntro><p className="private-call"><ClayIcon name="shield"/>서로의 실제 전화번호는 표시하지 않아요.</p><div className="call-actions"><button className="decline-call" onClick={() => endCall()}><ClayIcon name="phone"/>받지 않기</button><button className="accept-call" onClick={() => goTo('live')}><ClayIcon name="video"/>전화 받기</button></div><p className="button-hint">실제 전화가 아닌 수신 화면 미리보기예요.</p></div>}
      {view === 'live' && <><PageIntro headingRef={heading} eyebrow="상담 화면 체험" title={'선생님과 함께\n하나씩 배워요'}>실제 통화·화면 공유는 연결되지 않았어요.</PageIntro><div className="call-preview"><img className="call-teacher-photo" src={teacher.photo} alt={teacher.name + " 선생님 프로필 예시"}/><h2>{teacher.name} 선생님</h2><p>{requestSummary}</p><b>기본 상담 시간 10:00</b><small>체험 화면 · 상담 시간은 차감되지 않아요</small></div><div className="call-controls"><button aria-pressed={!micOn} onClick={() => setMicOn(!micOn)}>{micOn ? '마이크 켜짐 · 예시' : '마이크 꺼짐 · 예시'}</button><button disabled={!screenConsent} aria-pressed={sharePreview} onClick={() => setSharePreview(!sharePreview)}>{sharePreview ? '화면 공유 표시 끄기' : '화면 공유 표시 체험'}</button></div>{sharePreview && <div className="demo-note">화면 공유 표시 미리보기예요. 실제 화면은 전송되지 않아요.</div>}<div className="summary-card"><h2>원격 도움 설정</h2><p>{remoteConsent ? '원격 도움 신청 선택됨 · 실제 조작 연결 없음' : '원격 조작 신청 안 함'}</p><button className="secondary" onClick={() => { setRemoteConsent(false); setScreenConsent(false); setSharePreview(false) }}>화면 공유·원격 도움 동의 철회</button></div><button className="primary" onClick={() => endCall(true)}>상담 화면 체험 마치기</button></>}
      {view === 'history' && <><PageIntro headingRef={heading} eyebrow="나의 도움 기록" title="이용 내역">지난 도움과 남긴 후기를 확인해요.</PageIntro>{records.length ? records.map(record => <div className="summary-card" key={record.id}><span className="status-chip">화면 체험 완료 · 실제 이용 아님</span><h2>{record.task}</h2><p>{record.teacher} 선생님 · {record.category}<br />결제 예정 금액 {priceText(record.amount)} · 실제 결제 없음</p>{record.review ? <div className="saved-review"><strong>{'★'.repeat(record.review.rating)} · 내가 남긴 리뷰</strong>{record.review.tags.length > 0 && <p>{record.review.tags.join(' · ')}</p>}{record.review.text && <p>{record.review.text}</p>}<small>화면 체험 중 작성한 리뷰예요.</small></div> : <button className="secondary" onClick={() => { setReviewRecordId(record.id); setRating(0); setReviewText(''); setReviewTags([]); goTo('review') }}>리뷰 남기기</button>}<button className="secondary" onClick={() => { setCategory(categories.find(item => item.title === record.category) || otherCategory); setTask(record.taskSelection || record.task); setRequestDetails(record.details || ''); setExplanationMode(record.mode || ''); goTo('request') }}>같은 도움 다시 선택하기</button></div>) : <div className="empty-state"><ClayIcon name="history"/><h2>아직 이용 내역이 없어요</h2><p>도움받고 싶은 일을 골라보세요.</p><button className="primary" onClick={() => goTo('home')}>도움 고르러 가기</button></div>}</>}
      {view === 'review' && <><PageIntro headingRef={heading} eyebrow="도움은 어떠셨나요?" title={'소중한 후기를\n남겨주세요'}>{records.find(record => record.id === reviewRecordId)?.teacher} 선생님과의 시간을 알려주세요.</PageIntro><form onSubmit={saveReview}><fieldset className="review-stars"><legend>만족도를 골라주세요</legend><div>{[1,2,3,4,5].map(value => <label key={value}><input type="radio" name="rating" value={value} checked={rating === value} onChange={() => setRating(value)} aria-label={`${value}점`}/><span className={rating >= value ? 'filled' : ''} aria-hidden="true">★</span></label>)}</div><p className="button-hint">{rating ? `${rating}점을 선택했어요` : '별을 눌러 점수를 골라주세요'}</p></fieldset><fieldset><legend>어떤 점이 좋았나요? · 선택</legend><div className="review-tags">{['설명이 쉬워요', '친절해요', '천천히 기다려줘요', '문제를 해결했어요'].map(tag => <button key={tag} type="button" className={reviewTags.includes(tag) ? 'selected' : ''} aria-pressed={reviewTags.includes(tag)} onClick={() => setReviewTags(current => current.includes(tag) ? current.filter(item => item !== tag) : [...current, tag])}>{tag}</button>)}</div></fieldset><label className="field-label" htmlFor="review-text">한 줄 후기 · 선택</label><textarea id="review-text" rows={4} maxLength={300} value={reviewText} onChange={event => setReviewText(event.target.value)} placeholder="도움받은 경험을 편하게 남겨주세요."/><p className="button-hint">{reviewText.length} / 300자 · 후기는 현재 체험 중에만 보관돼요.</p><p role="alert" className="form-error">{error}</p><button className="primary" type="submit" disabled={!rating}>리뷰 남기기</button></form><button className="text-button" onClick={() => goTo('history')}>다음에 남길게요</button></>}
      {view === 'mypage' && <><PageIntro headingRef={heading} title="내 정보">나에게 맞게 편하게 이용하세요.</PageIntro><div className="profile-card"><ClayIcon name="user"/><div><h2>{profile?.name || '반가워요, 고객님'}</h2><p>{profile?.phone || '로그인하면 이용 정보를 관리할 수 있어요.'}</p></div></div>{!profile && <button className="primary" onClick={() => goTo('login')}>간편 로그인 화면 보기</button>}<div className="settings-list"><button onClick={() => { setName(profile?.name || ''); goTo('profile') }}><span>내 이름</span><span>{profile?.name || '설정하기'} ›</span></button><button onClick={() => goTo('device')}><span>내 휴대폰</span><span>{device} ›</span></button><button onClick={() => goTo('history')}><span>이용·결제 내역</span><span>›</span></button><button onClick={() => goTo('notifications')}><span>알림</span><span>›</span></button><button aria-pressed={largeText} onClick={() => setLargeText(!largeText)}><span>글씨 크게 보기</span><span className={`toggle ${largeText ? 'on' : ''}`}/></button><button onClick={() => goTo('support')}><span>도움말·문의</span><span>›</span></button><button onClick={() => goTo('privacy')}><span>개인정보·안심 이용</span><span>›</span></button></div>{profile && <button className="text-button" onClick={() => { setProfile(null); goTo('welcome') }}>체험 계정 로그아웃</button>}<p className="button-hint">내 정보와 이용 기록은 현재 화면 체험 동안만 유지돼요.</p></>}
      {view === 'profile' && <><button className="back" onClick={() => goTo('mypage')}>‹ 내 정보</button><PageIntro headingRef={heading} title="어떻게 불러드릴까요?">선생님께 보여줄 이름을 적어주세요.</PageIntro><form onSubmit={event => { event.preventDefault(); if (!name.trim()) { setError('이름을 입력해주세요.'); return } setProfile(current => ({ ...current, name: name.trim() })); goTo('mypage') }}><label className="field-label">이름 또는 별명<input value={name} onChange={event => setName(event.target.value)} maxLength={20} placeholder="예: 김민지"/></label><p role="alert" className="form-error">{error}</p><button className="primary">이 이름으로 체험하기</button></form></>}
      {view === 'device' && <><button className="back" onClick={() => goTo('mypage')}>‹ 내 정보</button><PageIntro headingRef={heading} title="내 휴대폰">잘 모르겠다면 그대로 선택해주세요.</PageIntro><div className="task-list">{['삼성 갤럭시', '애플 아이폰', '잘 모르겠어요'].map(item => <button className={`task-button ${device === item ? 'selected' : ''}`} key={item} onClick={() => { setDevice(item); setRemoteConsent(false) }} aria-pressed={device === item}>{item}<span className="selection-dot">{device === item ? '✓' : ''}</span></button>)}</div><button className="primary" onClick={() => goTo('mypage')}>선택 완료</button></>}
      {view === 'notifications' && <><button className="back" onClick={() => goTo('home')}>‹ 홈으로</button><PageIntro headingRef={heading} title="알림">도움받는 데 필요한 소식을 확인해요.</PageIntro><div className="summary-card"><span className="status-chip">서비스 안내</span><h2>디지털 선생님이 먼저 전화해요</h2><p>도움 신청 후 전화 대기 화면에서 기다려주세요.</p></div><div className="settings-list"><button aria-pressed={notifications} onClick={() => setNotifications(!notifications)}><span>상담 알림 받기 · 예시</span><span className={`toggle ${notifications ? 'on' : ''}`}/></button></div><p className="button-hint">알림 설정 화면 체험이며 실제 푸시 알림은 발송되지 않아요.</p></>}
      {view === 'support' && <><button className="back" onClick={() => goTo('mypage')}>‹ 내 정보</button><PageIntro headingRef={heading} title="무엇이 궁금하세요?"/><div className="faq-list">{[['선생님이 전화하면 어떻게 받나요?', '앱의 수신 화면에서 ‘전화 받기’를 누르면 돼요.'], ['10분 안에 끝나지 않으면요?', '추가 요금을 먼저 안내하고, 동의하실 때만 연장하는 방식으로 준비하고 있어요.'], ['화면을 꼭 보여줘야 하나요?', '아니요. 화면 공유와 원격 도움은 선택이에요. 통화 중에도 동의를 철회할 수 있어요.'], ['문제가 해결되지 않으면요?', '실제 서비스 출시 전 취소·환불 기준과 고객센터 연락 방법을 안내할 예정이에요.']].map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div><p className="demo-note">고객센터 운영과 문의 접수는 준비 중이에요.</p></>}
      {view === 'privacy' && <><button className="back" onClick={() => goTo('mypage')}>‹ 내 정보</button><PageIntro headingRef={heading} title="안심하고 이용하세요"/><SafetyBanner/><div className="summary-card"><h2>원할 때만 화면을 보여줘요</h2><p>통화 준비에서 동의하고, 통화 중 언제든 철회해요.</p></div><div className="summary-card"><h2>전화번호를 서로 공개하지 않아요</h2><p>앱 영상통화를 기본으로 준비해요. 일반 전화로 연결하는 안심번호는 통신 서비스 연동 후 제공할 수 있어요.</p></div><div className="summary-card"><h2>내 정보는 어떻게 처리되나요?</h2><p>현재는 화면 체험이며 입력한 전화번호를 서버로 보내지 않아요. 출시 전에 개인정보 처리방침과 보관·삭제 기준을 안내할 예정이에요.</p></div></>}
    </main>
    {!navHidden && <nav className="bottom-nav" aria-label="주 메뉴">{[{id:'home',label:'홈',icon:'home',active:homeActive},{id:'history',label:'이용 내역',icon:'history',active:view==='history'},{id:'mypage',label:'내 정보',icon:'user',active:['mypage','profile','device','support','privacy'].includes(view)}].map(item => <button key={item.id} className={item.active ? 'active' : ''} aria-current={item.active ? 'page' : undefined} onClick={() => goTo(item.id)}><span className="nav-orb category-icon"><NavIcon name={item.icon}/></span><span className="nav-label">{item.label}</span></button>)}</nav>}
  </div>
}
export default function App() { return window.location.pathname === '/teacher' ? <TeacherPreview/> : <CustomerApp/> }
