import React from 'react'

export default function InputApp({ type, name, label, placeholder, value, onChange, error }) {
  return (
    <>
      <label className="label">{label}</label>
      <div className="control">
        <input 
          className={error ? `input is-danger` : `input`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        />
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </>
  )
}
