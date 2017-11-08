import config from './config-styles'

const btn = {
  flex: 1,
  height: config.imageHeight,
  padding: 20,
  fontSize: 50,
  background: 'transparent',
  color: '#fff',
  textShadow: '1px 1px 3px rgba(0, 0, 0, .6)',
  border: 'none',
  outline: 0,
  cursor: 'pointer',
  userSelect: 'none'
}

const prev = {
  ...btn,
  textAlign: 'left'
}

const next = {
  ...btn,
  textAlign: 'right'
}

const hidden = {
  visibility: 'hidden'
}

const hover = {
  transition: 'all 1s',
  color: '#8c9ea3'
}

export default {
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    display: 'flex'
  },
  prev,
  prevHidden: {
    ...prev,
    ...hidden
  },
  prevHover: {
    ...prev,
    ...hover
  },
  next,
  nextHidden: {
    ...next,
    ...hidden
  },
  nextHover: {
    ...next,
    ...hover
  }
}