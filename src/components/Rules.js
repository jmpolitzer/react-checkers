import PropTypes from 'prop-types'
import { rules } from './styles'

/** @jsx jsx */
import { jsx } from '@emotion/core'

function Rules({ styles }) {
  return (
    <div css={styles.rules || rules}>
      <div>Rules:</div>
      <div>
        <div>1. If a player's circle is full, it is their turn.</div>
        <div>2. Players get one move per turn.</div>
        <div>
          3. A checker is kinged when it reaches the opposite end of the board.
        </div>
        <div>4. Press and hold "m" to make multiple jumps.</div>
        <div>
          5. Any checker can make single or multiple jumps going forward.
        </div>
        <div>
          6. Only a king can make single or multiple jumps going forward and
          backward.
        </div>
        <div>
          7. When player jumps a checker, their score will increment by one.
        </div>
        <div>
          8. When player jumps a king, their score will increment by two.
        </div>
        <div>
          9. When player is kinged, their opponent's score will decrement by
          one.
        </div>
      </div>
    </div>
  )
}

Rules.propTypes = {
  styles: PropTypes.object
}

export default Rules
