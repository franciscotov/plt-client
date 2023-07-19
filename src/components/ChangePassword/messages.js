import { defineMessages } from 'react-intl'
export const scope = 'app.components.ChangePassword.messages'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Cambio de contraseña',
  },
  subheader: {
    id: `${scope}.subheader`,
    defaultMessage: 'Ingresa una nueva contraseña.',
  },
  alertMessage: {
    id: `${scope}.alertMessage`,
    defaultMessage:
      'La contraseña debe tener al menos 8 caracteres. Debe incluir una mayúscula, una minúscula, un número y un símbolo (!@#$%^&*.()-_).',
  },
  newPassword: {
    id: `${scope}.newPassword`,
    defaultMessage: 'Nueva contraseña',
  },
  repeatNewPassword: {
    id: `${scope}.repeatNewPassword`,
    defaultMessage: 'Repetir nueva contraseña',
  },
  atLeastOneLowerCaseLetter: {
    id: `${scope}.atLeastOneLowerCaseLetter`,
    defaultMessage: 'Al menos 1 letra minúscula',
  },
  atLeastOneUpperCaseLetter: {
    id: `${scope}.atLeastOneUpperCaseLetter`,
    defaultMessage: 'Al menos 1 letra mayúscula',
  },
  atLeastOneNumber: {
    id: `${scope}.atLeastOneNumber`,
    defaultMessage: 'Al menos 1 número',
  },
  atLeastOneSymbol: {
    id: `${scope}.atLeastOneSymbol`,
    defaultMessage: 'Al menos 1 caracter especial',
  },
  passwordNotMatch: {
    id: `${scope}.passwordNotMatch`,
    defaultMessage: 'Las contraseñas no coinciden',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancelar',
  },
  accept: {
    id: `${scope}.accept`,
    defaultMessage: 'Aceptar',
  },
})
