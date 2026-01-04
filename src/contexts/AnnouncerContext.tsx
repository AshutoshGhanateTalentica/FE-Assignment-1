import React, { createContext, useCallback, useContext, useState, useEffect } from 'react'

type AnnounceFn = (message: string) => void

const AnnouncerContext = createContext<AnnounceFn | undefined>(undefined)

export const AnnouncerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState('')

  const announce: AnnounceFn = useCallback((msg: string) => {
    setMessage('') // reset to ensure repeated same messages are announced
    requestAnimationFrame(() => setMessage(msg))
  }, [])

  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => setMessage(''), 3000)
    return () => clearTimeout(t)
  }, [message])

  return (
    <AnnouncerContext.Provider value={announce}>
      {children}
      <div aria-live="polite" aria-atomic="true" className="sr-only" role="status">{message}</div>
    </AnnouncerContext.Provider>
  )
}

export function useAnnouncer() {
  const ctx = useContext(AnnouncerContext)
  if (!ctx) throw new Error('useAnnouncer must be used within AnnouncerProvider')
  return ctx
}
