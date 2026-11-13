import { useEffect, useState } from 'react'
import ClayIcon from './ClayIcon'


export default function QuickIntro({ onFinish }) {
  const [step, setStep] = useState('waiting')
  useEffect(() => {
    if (step === 'done') return
    const timer = window.setTimeout(() => setStep(step === 'waiting' ? 'demo' : 'done'), step === 'waiting' ? 3600 : 6200)
    return () => window.clearTimeout(timer)
  }, [step])
  return <section className={`quick-intro intro-${step}`} aria-label="원격 도움 이용 안내">
    <div className="intro-topline"><span>10분만 이용 안내</span><button onClick={onFinish}>건너뛰기 ›</button></div>
    {step === 'waiting' && <>
      <span className="story-step">01 / 연결을 기다리는 순간</span>
      <h1>휴대폰 앞에서<br /><span>혼자 막막했다면.</span></h1>
      <figure className="waiting-story-photo"><img src="/waiting-for-help.png" alt="편안한 공간에서 휴대폰을 들고 도움을 기다리는 고객의 모습"/><figcaption><span className="story-mini-orb"><ClayIcon name="phone"/></span><span><strong>디지털 선생님이 준비하고 있어요</strong><small>신청한 뒤에는 선생님이 먼저 연락해요.</small></span></figcaption></figure>
      <p>모르는 게 생기는 건 자연스러워요.<br />혼자 애쓰지 말고, 함께 풀어봐요.</p>
      <button className="primary" onClick={() => setStep('demo')}>어떻게 도와주나요? →</button>
      <small className="story-disclaimer">실제 전화가 아닌 서비스 이용 안내예요.</small>
    </>}
    {step === 'demo' && <>
      <span className="story-step">02 / 같은 화면, 함께 해결</span>
      <h1>설명만 듣는 대신,<br /><span>화면을 함께 봐요.</span></h1>
      <div className="intro-demo-scene"><img className="intro-scene-photo" src="/remote-help-hero.png" alt="떨어진 곳에서 같은 휴대폰 화면을 보며 안내하는 디지털 선생님과 고객"/><div className="intro-phone"><span className="phone-speaker"/><div className="demo-gallery"><span>내 사진</span><div className="demo-thumbnails"><i>🌷</i><i>🌳</i><i>🌊</i><i>🐱</i></div><div className="demo-pointer"><span>☝</span></div><b className="demo-help-bubble">여기를 눌러보세요</b></div></div></div>
      <div className="story-explanation"><span><b>1</b>내가 허용한 화면을 함께 보고</span><span><b>2</b>선생님이 위치를 짚어주면</span><span><b>3</b>직접 해보며 익혀요</span></div>
      <button className="primary" onClick={() => setStep('done')}>이제 알겠어요 →</button>
      <small className="story-disclaimer">이해를 돕는 예시예요. 실제 원격 연결은 진행되지 않아요.</small>
    </>}
    {step === 'done' && <div className="intro-done">
      <span className="story-step">03 / 내 곁의 디지털 선생님</span>
      <h1>디지털 앞에서,<br /><span>혼자일 필요 없어요.</span></h1>
      <p>작은 질문부터 막막한 문제까지.<br />내 곁의 디지털 선생님과<br /><strong>하나씩 해결해나가요.</strong></p>
      <button className="primary" onClick={onFinish}>함께 시작하기 →</button>
      <small className="story-disclaimer">준비되셨을 때 눌러주세요. 자동으로 넘어가지 않아요.</small>
    </div>}
    <div className="intro-progress" aria-hidden="true"><span className={step === 'waiting' ? 'current' : ''}/><span className={step === 'demo' ? 'current' : ''}/><span className={step === 'done' ? 'current' : ''}/></div>
  </section>
}
