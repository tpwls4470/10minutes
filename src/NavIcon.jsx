import { useId } from 'react'

export default function NavIcon({ name }) {
  const id = useId().replaceAll(':', '')
  return <svg className="nav-art" viewBox="0 0 44 44" aria-hidden="true"><defs>
    <linearGradient id={`${id}-blue`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#80d5ff"/><stop offset="1" stopColor="#5586ed"/></linearGradient>
    <linearGradient id={`${id}-violet`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d3b4fa"/><stop offset="1" stopColor="#9b70d8"/></linearGradient>
  </defs>
    {name === 'home' && <path d="m5 21 17-15 17 15-3 2v14H25V26h-6v11H8V23Z" fill={`url(#${id}-blue)`} stroke="#d9f3ff" strokeWidth="1" strokeLinejoin="round"/>}
    {name === 'history' && <><rect x="10" y="5" width="26" height="34" rx="6" fill={`url(#${id}-blue)`}/><path d="M16 15h14M16 22h14M16 29h9" stroke="#f8fcff" strokeWidth="2.4" strokeLinecap="round"/></>}
    {name === 'user' && <g fill={`url(#${id}-violet)`}><circle cx="22" cy="13" r="9"/><path d="M7 38c0-9 6-14 15-14s15 5 15 14Z"/></g>}
  </svg>
}
