import { useEffect, useState } from "react"
import { useRef } from 'react'
type Draw = {
  ctx: CanvasRenderingContext2D
  currentPoint: Point
  prevPoint: Point | null
}

type Point = { x: number; y: number } | null

function Receiver({ currentPoint , prevPoint , color}:any) {
  const canvasRef = useRef(null);
  // @ts-ignore
  const ctx = canvasRef.current?.getContext('2d');
  
  drawLine({ ctx, currentPoint, prevPoint })
  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    console.log("prevpoint", prevPoint);
    console.log("currentpoint", currentPoint);
    console.log("ctx", ctx);
    
    if(!prevPoint || !currentPoint) return
    const { x: currX, y: currY } = currentPoint
    const lineColor = color
    const lineWidth = 5
  
    let startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.moveTo(startPoint.x, startPoint.y)
  
    ctx.lineTo(currX, currY)
    ctx.stroke()
  
    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
    ctx.fill()
  }

    
  return (
    <div>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className='border border-black rounded-md'
      />
    </div>
  )
}

export default Receiver