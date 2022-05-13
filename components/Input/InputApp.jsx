import React from 'react'

export default function InputApp({ type, name, label, placeholder, value, onChange, error, otherError, autoFocus }) {
  return (
    <>
      <label className="label">{label}</label>
      <div className="control">
        <input 
          className={error || otherError ? `input is-danger` : `input`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          autoFocus={autoFocus}
        />
        {error && <p className="help is-danger">{error}</p>}
        {otherError && <p className="help is-danger">{otherError}</p>}
      </div>
    </>
  )
}
