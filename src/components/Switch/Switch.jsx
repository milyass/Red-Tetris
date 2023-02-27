import React from 'react'

const Switch = props => {
  const Props = {
    color: 'var(--primary)',
    ...props
  }
  return (
    <label className='label'>
      <div className='toggle' style={{ marginLeft: 10, marginRight: 10 }}>
        <input
          className='toggle-state'
          type='checkbox'
          name='check'
          defaultChecked={props.checked}
          onChange={props.onChange}
          style={{ margin: 10 }}
        />
        <div className='indicator '></div>
      </div>
    </label>
  )
}

export default Switch
