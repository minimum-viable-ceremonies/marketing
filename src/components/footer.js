import React from "react"
import { useTranslation } from "react-i18next"

import Squiggles from "./squiggles"
import styles from "../styles/footer.scss"

const Footer = () => {
  const { t } = useTranslation()

  return (
    <div id="footer">
      <Squiggles />
      <div className="pb-8 pt-8 flex flex-col md:flex-row md:max-w-screen-md items-center lg:max-w-screen-lg md:m-auto">
        <div className="md:mr-32 text-center md:text-left flex flex-col footer-contact">
          <div className="title"><strong>{t('footer.contact')}</strong></div>
          <div style={{ fontSize: "24px", color: "blue"}} className="mb-4">
            <strong>
              <a href={`mailto:${t('footer.contactEmail')}`}>{t('footer.contactEmail')}</a>
            </strong>
          </div>
        </div>
        {false && <div className="mr-32 flex flex-col footer-company">
          <div className="mb-4">
            <strong>{t('footer.company')}</strong>
          </div>
          <div className="mb-4">
            <a href="/about">{t('footer.about')}</a>
          </div>
          <div className="mb-4">
            <a href="/blog">{t('footer.blog')}</a>
          </div>
          <div className="mb-4">
            <a href="/pricing">{t('footer.pricing')}</a>
          </div>
          <div className="mb-4">
            <a href="/notes">{t('footer.notes')}</a>
          </div>
        </div>}
        {false && <div className="mr-32 flex flex-col footer-legal">
          <div className="mb-4">
            <strong>{t('footer.legal')}</strong>
          </div>
          <div className="mb-4">
            <a href="/terms">{t('footer.terms')}</a>
          </div>
          <div className="mb-4">
            <a href="/privacy">{t('footer.privacy')}</a>
          </div>
        </div>}
        {false && <div className="mr-32 flex flex-col footer-newsletter">
          <div><strong>{t('footer.newsletter')}</strong></div>
        </div>}
      </div>
    </div>
  )
}

export default Footer
