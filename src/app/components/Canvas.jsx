'use client'

import React, { useRef, useState, useEffect } from 'react'

const Canvas = () => {
  const canvasRef = useRef(null)
  const [circles, setCircles] = useState([])
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth, window.innerHeight)
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize() // Initialize canvas size

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)

    circles.forEach((circle) => {
      context.beginPath()
      context.arc(circle.x, circle.y, 20, 0, 2 * Math.PI)
      //   For drawing circles which are filled
      //   context.fillStyle = 'red' // Circle color
      //   context.fill()
      //   For drawing circles which are not filled (outline)
      context.strokeStyle = 'red'
      context.lineWidth = 2
      context.stroke()
      context.closePath()
    })
  }, [circles])

  const handleClick = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    console.table(rect, ['property,value'])
    console.log(e.clientX, rect.left)
    console.log(e.clientY, rect.top)
    const x = e.pageX - rect.left
    const y = e.pageY - rect.top

    // Add a new circle to the array
    setCircles((prevCircles) => [...prevCircles, { x, y }])
  }

  const clearCanvas = () => {
    setCircles([])
  }

  return (
    <div>
      <button
        onClick={clearCanvas}
        style={{
          margin: '10px',
          padding: '10px 5px',
          borderRadius: '5px',
          border: 'solid 2px white',
        }}
      >
        Clear Canvas
      </button>
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        width={canvasSize.width}
        height={canvasSize.height}
      ></canvas>
    </div>
  )
}

export default Canvas
