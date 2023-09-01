import React from 'react'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { VisibilityIcon, VisibilityOffIcon } from '../utils/constants'

const Input = ({ name, type, label, autoFocus, handleChange, handleShowPassword }) => {
  return (
    <TextField
      name={name}
      label={label}
      required
      fullWidth
      type={type}
      variant="outlined"
      onChange={handleChange}
      autoFocus={autoFocus}
      InputProps={name === "password" ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleShowPassword}>
              {type === "password" ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        )
      } : null}
    />
  )
}

export default Input