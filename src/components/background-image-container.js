import React from "react"
import style from "bacground-image-container.module.css"

const ImgContainer = ({ children }) => (
  <div id={style.mainContainer}>
    <div id={imgContainer}></div>
    <div id={contentContainer}>{children}</div>
  </div>
)

export default ImgContainer
