import React from 'react'
import { Controller, Control, FieldValues } from 'react-hook-form'
import TextField from '../atomComponents/Input/text'

import { validateEmail } from './../../util/validations'

interface EmailProps {
    name: string 
    control: Control<FieldValues, object> 
    defaultValue :string
    label: string
}

export default function Email(props: EmailProps): JSX.Element {

  return (
    <Controller
          name={props.name}
          control={props.control}
          defaultValue={props.defaultValue}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              id='email'
              label={props.label}
              value={value}
              onChange={onChange}
              error={error}
              required
              fullWidth
              readOnly={false}
            />
          )}
          rules={{
            required: 'El email es requerido',
            validate: {
              validateEmail: v => validateEmail(v) || "El formato del correo es incorrecto"
            }
          }}
        />
  )
}