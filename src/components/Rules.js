import PropTypes from 'prop-types'
import { ruleStyle } from './styles'

/** @jsx jsx */
import { jsx } from '@emotion/core'

function Rules({ rules, styles }) {
  return (
    <div css={styles.ruleStyle || ruleStyle}>
      <div>Rules:</div>
      <div>
        {rules.map((rule, i) => (
          <div key={i}>
            {i + 1}. {rule}
          </div>
        ))}
      </div>
    </div>
  )
}

Rules.propTypes = {
  rules: PropTypes.array.isRequired,
  styles: PropTypes.object
}

export default Rules
