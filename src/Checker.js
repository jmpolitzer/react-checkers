import React from 'react'

function Checker({
  square,
  square: { isKinged } = {},
  handlePick,
  color,
  boardStyle,
  className
}) {
  const style = {
    regular: {
      height: 35,
      width: 35,
      borderRadius: '50%',
      backgroundColor: color,
      cursor: 'pointer'
    },
    kinged: {
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 27,
      width: 27,
      borderRadius: '50%',
      border: `5px solid ${color}`,
      color: color,
      fontWeight: 'bold',
      fontSize: 17
    }
  }
  return (
    <div
      className={className}
      style={{
        ...style[isKinged ? 'kinged' : 'regular'],
        ...boardStyle
      }}
      onClick={handlePick ? () => handlePick(square) : null}
    >
      {isKinged && 'K'}
    </div>
  )
}

export default Checker
