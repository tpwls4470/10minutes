import { useId } from 'react'

const shapes = {
  settings: <><path d="m18 5 8 0 1 5 4 2 5-1 4 7-4 4v4l4 4-4 7-5-1-4 2-1 5h-8l-1-5-4-2-5 1-4-7 4-4v-4l-4-4 4-7 5 1 4-2Z" transform="translate(0 -3) scale(1 .94)"/><circle cx="22" cy="21" r="8" fill="#e8f1ed" stroke="#527a79" strokeWidth="2"/><circle cx="22" cy="21" r="4" fill="#83b2b1" stroke="none"/></>,
  camera: <><path d="M7 13h8l3-5h8l3 5h8v21H7Z" strokeLinejoin="round"/><rect x="7" y="14" width="30" height="20" rx="5"/><circle cx="22" cy="24" r="8" fill="#f9e9f3" stroke="#855c80" strokeWidth="2"/><circle cx="22" cy="24" r="5" fill="#95719f" stroke="#fbe9fa" strokeWidth="1.4"/><circle cx="20.5" cy="22.5" r="1.7" fill="#fff5fa" stroke="none"/><rect x="29" y="16" width="4" height="2" rx="1" fill="#ffe9d2" stroke="none"/></>,
  calendar: <><rect x="8" y="8" width="28" height="28" rx="7"/><path d="M9 17h26M15 5v8M29 5v8" className="icon-line"/><path d="m15 25 5 4 9-9" className="icon-line"/></>,
  documents: <><path d="M10 5h16l8 9v25H10Z"/><path d="M26 5v10h8M15 23h13M15 30h10" className="icon-line"/></>,
  apps: <><rect x="10" y="4" width="24" height="34" rx="7"/><path d="M18 8h8M20 34h4" className="icon-line"/><rect x="15" y="15" width="5" height="5" rx="1" fill="#ffe3ad" stroke="none"/><rect x="24" y="15" width="5" height="5" rx="1" fill="#e3f0dd" stroke="none"/><rect x="15" y="24" width="5" height="5" rx="1" fill="#f3d5df" stroke="none"/><rect x="24" y="24" width="5" height="5" rx="1" fill="#d5e7fa" stroke="none"/></>,
  home: <><path d="m5 20 17-15 17 15-5 2v15H10V22Z"/><path d="M18 37V25h8v12" className="icon-line"/></>,
  history: <><rect x="10" y="7" width="25" height="31" rx="6"/><rect x="16" y="4" width="13" height="7" rx="3"/><path d="M16 20h13M16 27h9" className="icon-line"/></>,
  user: <><circle cx="22" cy="13" r="8"/><path d="M7 37c0-9 6-14 15-14s15 5 15 14Z"/></>,
  bell: <><path d="M10 27V17C10 5 33 5 33 17v10l4 5H6Z"/><path d="M17 35c0 5 10 5 10 0" className="icon-line"/><circle cx="22" cy="7" r="3"/></>,
  question: <><path d="M13 14c0-11 19-12 19-1 0 7-10 6-10 13" fill="none" strokeWidth="8" strokeLinecap="round"/><circle cx="22" cy="35" r="4" stroke="none"/></>,
  shield: <><path d="m22 4 15 6-2 17c-3 7-13 12-13 12S12 34 9 27L7 10Z"/><path d="m14 21 6 6 10-12" className="icon-line"/></>,
  phone: <><path d="m10 5 8 7-4 6c3 6 6 9 12 12l6-4 7 8-6 6C17 39 4 26 4 11Z"/></>,
  video: <><rect x="4" y="11" width="25" height="24" rx="7"/><path d="m29 18 11-6v23l-11-6Z"/></>,
}

export default function ClayIcon({ name, className = '' }) {
  const id = useId().replaceAll(':', '')
  return <svg className={`clay-icon ${className}`} viewBox="0 0 44 44" aria-hidden="true">
    <defs><linearGradient id={`${id}-fill`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="var(--icon-light, #e3aec1)"/><stop offset=".48" stopColor="var(--icon-mid, #ab607e)"/><stop offset="1" stopColor="var(--icon-dark, #713551)"/></linearGradient><filter id={`${id}-shadow`} x="-30%" y="-30%" width="170%" height="180%"><feDropShadow dx="1.5" dy="3" stdDeviation="1.5" floodColor="#673c4f" floodOpacity=".28"/></filter></defs>
    <g fill={`url(#${id}-fill)`} stroke="var(--icon-dark, #713551)" strokeWidth="1.2" strokeLinejoin="round" filter={`url(#${id}-shadow)`}>{shapes[name] || shapes.apps}</g>
  </svg>
}
