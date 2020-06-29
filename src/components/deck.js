import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSprings, animated, interpolate } from "react-spring"
import { useDrag } from "react-use-gesture"
import Markdown from "react-markdown"

import Visibility from "react-visibility-sensor"

import "../styles/deck.scss"

const CARD_COUNT = 6

const Deck = ({ visible }) => {
  const { t } = useTranslation()
  const [begun, begin] = useState(false)
  const [springs, setSprings] = useSprings(CARD_COUNT, i => ({
    from: { x: 0, rot: 0, scale: 1.5, y: -1000 }
  }))

  useEffect(() => {
    if (!begun) return

    setSprings(i => ({
      x: 0,
      y: -i * 4,
      scale: 1,
      rot: -10 + Math.random() * 20,
      delay: i * 150,
    }))
  }, [begun, setSprings])

  const gesture = useDrag(({ args: [index], down, movement: [xDelta], direction: [xDir], velocity }) => {
    const dir = xDir < 0 ? -1 : 1
    const isGone = !down && velocity > 0.1

    setSprings(i => {
      if (index !== i || index === 0) return

      return {
        x: isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0,
        rot: xDelta / 100 + (isGone ? dir * velocity * 10 : 0),
        delay: undefined,
        config: {
          friction: 50,
          tension: down ? 800 : isGone ? 200 : 500
        }
      }
    })
  })

  return (
    <Visibility onChange={visible => visible ? begin(true) : null}>
      <div className="deck">
        {begun && springs.map(({ x, y, rot, scale }, index) => (
          <animated.div
            className="deck-card"
            key={index}
            style={{transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)}}
          >
            <animated.div
              {...gesture(index)}
              onMouseEnter={() => setSprings(i => i === index ? { scale: 1.1 } : null)}
              onMouseLeave={() => setSprings(i => i === index ? { scale: 1.0 } : null)}
              className="deck-card-content flex justify-center items-center p-4"
              style={{transform: interpolate([rot, scale], (rot, scale) => [
                  'perspective(1500px)',
                  'rotateX(15deg)',
                  `rotateY(${rot / 10}deg)`,
                  `rotateZ(${rot}deg)`,
                  `scale(${scale})`
                ].join(' '))
              }}
            >
              {index === 0 ? (
                <div className="flex flex-col justify-center items-center">
                  <p className="mb-4">{t(`how.cards.${index}.name`)}</p>
                  <a href={t("common.roomUrl")} className="mvc-btn primary">{t("common.makeRoom")} →</a>
                </div>
              ) : (
                <div className="flex flex-col w-full h-full">
                  <div className="flex justify-between items-center">
                    <div className="deck-card-icon">
                      {t(`how.cards.${index}.icon`)}
                    </div>
                    <div className={`deck-card-theme mvc-badge ${t(`how.cards.${index}.theme`)}`}>
                      {t(`themes.${t(`how.cards.${index}.theme`)}.name`)}
                    </div>
                  </div>
                  <div className="deck-card-title mt-2">
                    {t(`how.cards.${index}.name`)}
                  </div>
                  <div className="deck-card-subheading">
                    {t(`how.cards.${index}.sub-heading`)}
                  </div>
                  <div className="deck-card-description">
                    <Markdown source={t(`how.cards.${index}.description`)} />
                  </div>
                </div>
              )}
            </animated.div>
          </animated.div>
        ))}
      </div>
    </Visibility>
  )
}

export default Deck
