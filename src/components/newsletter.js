import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useMatomo } from "@datapunt/matomo-tracker-react"

const Signup = () => {
  const { t } = useTranslation()
  const { trackEvent } = useMatomo()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  return (
    <div className="newsletter">
      <h5>{t("newsletter.header")}</h5>
      <p>{t("newsletter.helptext")}</p>
      <div>
        <input
          type="email"
          name="email"
          placeholder={t("newsletter.placeholder")}
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <button className="cta-link mvc-btn primary" onClick={() => {
          setLoading(true)
          trackEvent({ category: 'call-to-action', action: 'subscribe-to-list', name: 'signup' })
          fetch('http://localhost:5001/minimum-viable-ceremonies-dev/us-central1/sendgrid-subscribe', {
            method: 'PUT',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' }
          }).then(() => setLoading(false))
            .catch(console.log)
        }}>{t("common.go")}</button>
      </div>
    </div>
  )
}

export default Signup
