import React, { memo } from 'react'
import useWindowSize from '../utils/useWindowSize'

const Background = memo(() => {
  const { width, height } = useWindowSize()

  const generateStars = () => {
    const dot = []
    const star = (key) => {
      const size = Math.floor(2 * Math.random()) + 3

      const styles = {
        backgroundColor: '#fff',
        position: 'fixed',
        borderRadius: '50%',
        top: (height || 0) * Math.random() + 'px',
        left: (width || 0) * Math.random() + 'px',
        height: size + 'px',
        width: size + 'px',
        zIndex: 0,
      }

      return <div key={`dot_${key}`} style={styles}></div>
    }

    for (var i = 0; i < 200; i++) {
      dot.push(star(i))
    }

    return dot
  }

  return <div className="bg-gray-900 fixed top-0 right-0 bottom-0 left-0 z-0">{generateStars()}</div>
})

export default Background
