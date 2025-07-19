"use client"

import React, { useEffect, useRef, useState } from "react"
import { useAnalyzerStore } from "@/providers/analyzer-provider"
import Konva from "konva"
import { Image, Layer, Rect, Stage, Transformer } from "react-konva"
import useImage from "use-image"

export default function Renderer() {
  const { rendererConfig, selectedImage } = useAnalyzerStore((state) => state)

  const getCorner = (
    pivotX: number,
    pivotY: number,
    diffX: number,
    diffY: number,
    angle: number
  ) => {
    const distance = Math.sqrt(diffX * diffX + diffY * diffY)
    angle += Math.atan2(diffY, diffX)
    const x = pivotX + distance * Math.cos(angle)
    const y = pivotY + distance * Math.sin(angle)
    return { x, y }
  }

  const getClientRect = (rotatedBox: {
    rotation: number
    x: number
    y: number
    width: number
    height: number
  }) => {
    const { x, y, width, height } = rotatedBox
    const rad = rotatedBox.rotation

    const p1 = getCorner(x, y, 0, 0, rad)
    const p2 = getCorner(x, y, width, 0, rad)
    const p3 = getCorner(x, y, width, height, rad)
    const p4 = getCorner(x, y, 0, height, rad)

    const minX = Math.min(p1.x, p2.x, p3.x, p4.x)
    const minY = Math.min(p1.y, p2.y, p3.y, p4.y)
    const maxX = Math.max(p1.x, p2.x, p3.x, p4.x)
    const maxY = Math.max(p1.y, p2.y, p3.y, p4.y)

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    }
  }

  const getTotalBox = (boxes: any[]) => {
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity

    boxes.forEach((box) => {
      minX = Math.min(minX, box.x)
      minY = Math.min(minY, box.y)
      maxX = Math.max(maxX, box.x + box.width)
      maxY = Math.max(maxY, box.y + box.height)
    })

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    }
  }

  const LimitedDragAndResize = () => {
    const [stageSize, setStageSize] = useState({
      width: rendererConfig.width * 12,
      height: rendererConfig.height * 6,
    })

    const [scale, setScale] = useState(1)

    const [shapes, setShapes] = useState([
      {
        id: "rect1",
        x: stageSize.width / 2 - 60,
        y: stageSize.height / 2 - 60,
        width: 50,
        height: 50,
        fill: "#FF000080",
      },
    ])

    const [boundingBox, setBoundingBox] = useState({
      topLeftX: 0,
      topLeftY: 0,
      width: 0,
      height: 0,
    })

    const shapeRefs = useRef(new Map())
    const trRef = useRef<any>(null)

    const [image, status] = useImage(selectedImage?.url!)

    const updateBoundingBox = () => {
      if (!trRef.current) return

      const nodes = trRef.current.nodes()
      if (nodes.length === 0) return

      const boxes = nodes.map((node: { getClientRect: () => any }) =>
        node.getClientRect()
      )
      const box = getTotalBox(boxes)

      const newBoundingBox = {
        topLeftX: box.x,
        topLeftY: box.y,
        width: box.width,
        height: box.height,
      }

      setBoundingBox(newBoundingBox)
      console.log("Bounding Box Updated:", newBoundingBox)
    }

    useEffect(() => {
      if (!image) {
        return
      }

      const scale = Math.min(
        stageSize.width / image.width,
        stageSize.height / image.height
      )
      setScale(scale)

      const ratio = image.width / image.height
      setStageSize({
        width: stageSize.width,
        height: stageSize.height / ratio,
      })
    }, [image, scale])

    // Setup a transfomer after layout mounts so we can rotate, resize and scale
    useEffect(() => {
      if (trRef.current) {
        const nodes = shapes.map((shape) => shapeRefs.current.get(shape.id))
        trRef.current.nodes(nodes)
        updateBoundingBox()
      }
    }, [shapes])

    useEffect(() => {
      const handleResize = () => {
        setStageSize({
          width: stageSize.width,
          height: stageSize.height,
        })
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Boundary function
    const boundBoxFunc = (
      oldBox: any,
      newBox: {
        rotation: number
        x: number
        y: number
        width: number
        height: number
      }
    ) => {
      const box = getClientRect(newBox)

      const isOut =
        box.x < 0 ||
        box.y < 0 ||
        box.x + box.width > stageSize.width ||
        box.y + box.height > stageSize.height

      if (isOut) {
        return oldBox
      }

      return newBox
    }

    // drag handler
    const handleTransformerDrag = (e: Konva.KonvaEventObject<DragEvent>) => {
      if (!trRef.current) return

      const nodes = trRef.current.nodes()
      if (nodes.length === 0) return

      const boxes = nodes.map((node: { getClientRect: () => any }) =>
        node.getClientRect()
      )
      const box = getTotalBox(boxes)

      nodes.forEach(
        (shape: {
          getAbsolutePosition: () => any
          setAbsolutePosition: (arg0: any) => void
        }) => {
          const absPos = shape.getAbsolutePosition()
          const offsetX = box.x - absPos.x
          const offsetY = box.y - absPos.y

          const newAbsPos = { ...absPos }

          if (box.x < 0) {
            newAbsPos.x = -offsetX
          }
          if (box.y < 0) {
            newAbsPos.y = -offsetY
          }
          if (box.x + box.width > stageSize.width) {
            newAbsPos.x = stageSize.width - box.width - offsetX
          }
          if (box.y + box.height > stageSize.height) {
            newAbsPos.y = stageSize.height - box.height - offsetY
          }

          shape.setAbsolutePosition(newAbsPos)
        }
      )
      updateBoundingBox()
    }

    return (
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        scaleX={scale}
        scaleY={scale}
      >
        <Layer>
          <Image image={image} />
          {shapes.map((shape) => (
            <Rect
              key={shape.id}
              ref={(node) => {
                if (node) shapeRefs.current.set(shape.id, node)
              }}
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
              fill={shape.fill}
              draggable
            />
          ))}
          <Transformer
            ref={trRef}
            boundBoxFunc={boundBoxFunc}
            onDragMove={handleTransformerDrag}
            onTransformEnd={updateBoundingBox}
          />
        </Layer>
      </Stage>
    )
  }

  return (
    <React.Fragment>
      <LimitedDragAndResize />
    </React.Fragment>
  )
}
