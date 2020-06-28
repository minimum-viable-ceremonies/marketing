import React from "react"

import SquiggleOne from "../images/squiggle-one.svg"
import SquiggleTwo from "../images/squiggle-two.svg"
import SquiggleThree from "../images/squiggle-three.svg"

import "../styles/squiggles.scss"

const Squiggles = () => {

  return (
    <div className="mt-16 squiggles">
      <SquiggleOne className="squiggle" />
      <SquiggleTwo className="squiggle" />
      <SquiggleThree style={{bottom: "-2px"}} className="squiggle" />
    </div>
  )
}

export default Squiggles
