import React from "react"
import { useTranslation } from "react-i18next"

import Squiggles from "./squiggles"
import Newsletter from "./newsletter"

import "../styles/footer.scss"

const Footer = () => {
  const { t } = useTranslation()

  return (
    <div id="footer">
      <Squiggles />
      <div className="pb-8 pt-8 flex flex-col md:justify-center lg:justify-between md:flex-row md:max-w-screen-md sm:items-center md:items-start lg:max-w-screen-lg md:m-auto">
        <div className="md:text-center md:text-left flex flex-col sm:items-center md:items-start footer-contact">
          <div className="footer-title">{t('footer.contact')}</div>
          <div className="mb-4">
            <a style={{fontSize: "24px"}} className="mvc-link" href={`mailto:${t('footer.contactEmail')}`}>{t('footer.contactEmail')}</a>
          </div>
        </div>
        {false && <div className="flex flex-col footer-company">
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
        <div className="flex flex-col footer-legal text-center md:text-left">
          <div className="mb-4">
            <strong><a className="mvc-link" href="/legal">{t('footer.legal')}</a></strong>
          </div>
          <div className="mb-4">
            <a className="mvc-link" href="/articles/terms">{t('footer.terms')}</a>
          </div>
          <div className="mb-4">
            <a className="mvc-link" href="/articles/privacy">{t('footer.privacy')}</a>
          </div>
        </div>
        <div className="flex flex-col footer-newsletter">
          <Newsletter />
        </div>
      </div>
    </div>
  )
}

export default Footer
