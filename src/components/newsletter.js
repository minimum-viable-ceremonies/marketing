import React, { useState } from "react"
import Confetti from "react-dom-confetti"
import { useTranslation } from "react-i18next"
import { useMatomo } from "@datapunt/matomo-tracker-react"

import { successData, failureData } from "../data/confettiData"

import Loading from "./loading"

const Signup = () => {
  const { t } = useTranslation()
  const { trackEvent } = useMatomo()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState('')

  const submit = () => {
    setLoading(true)
    setState('')
    trackEvent({ category: 'call-to-action', action: 'subscribe-to-list', name: 'signup' })
    fetch(`${process.env.FUNCTIONS_HOST}/sendgrid-subscribe`, {
      method: 'PUT',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' }
    }).then(
      response => response.json()
    ).then(({ errors }) => {
      if (!errors) { setEmail("") }
      setLoading(false)
      setState(errors ? "failure" : "success")
      setTimeout(() => setState(''), 3000)
    }).catch(() => {
      setLoading(false)
      setState("failure")
      setTimeout(() => setState(''), 3000)
    })
  }

  return (
    <div className="newsletter flex flex-col sm:items-center md:items-start">
      <div className="footer-title">{t("newsletter.header")}</div>
      <p className="mt-2 mb-2">{t("newsletter.helptext")}</p>
      <div className="flex flex-row items-center">
        <input
          className={`${state} p-2 mr-4 border-2 rounded`}
          disabled={loading}
          type="email"
          name="email"
          placeholder={t("newsletter.placeholder")}
          value={email}
          onKeyPress={({ key }) => key.toLowerCase() === 'enter' && submit()}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <button disabled={loading} className={`${loading ? 'mvc-btn--loading' : ''} cta-link relative mvc-btn primary`} onClick={submit}>
          <Confetti active={state} config={state === 'success' ? successData : failureData} />
          {loading && <Loading size={20} />}
          <span>{t("common.go")}</span>
        </button>
      </div>
      <div className={`${state ? 'active' : ''} ${state} footer-message italic pt-2 text-xs`}>{t(`newsletter.${state}`)}</div>
    </div>
  )
}

export default Signup
