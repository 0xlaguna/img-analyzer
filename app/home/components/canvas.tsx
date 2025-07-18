import { Fragment, useRef } from "react"
import Konva from "konva"
import { Stage } from "react-konva"

export default function Canvas() {
  const stageRef = useRef(null)
  return (
    <Fragment>
      <Stage ref={stageRef}></Stage>
    </Fragment>
  )
}
