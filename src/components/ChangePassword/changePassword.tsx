import React, { useState, useRef, useMemo } from 'react'
import {
  Grid,
  Typography,
  Box,
  useMediaQuery,
  Button,
  CircularProgress,
  Container,
} from '@material-ui/core'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import Alert from '../Global/alert'

import LogoTuten from './../../img/tuten.png'
import { useStyles } from './styles'
import messages from './messages'
import Password from '../atom/Input/password'
import axios from 'axios'
import { PasswordRequirementAlert } from './passwordRecoveryAlert';
import { changePasswordWithToken } from '../../api/login'

type FormData = {
  password: string
  repassword: string
}

export default function ChangePassword() {
  const { control, handleSubmit, watch } = useForm<FormData>()
  const passwordRef = useRef<string>()
  passwordRef.current = watch('password')
  const classes = useStyles()
  const [progress, setProgress] = useState(false)
  const isMobile = useMediaQuery('(max-width:960px)')

  const [errorChangePassword, setErrorChangePassword] = useState<Error>()

  const history = useHistory()
  const location = useLocation()
  const query = useMemo(() => new URLSearchParams(location.search), [location])

  const onSubmit: SubmitHandler<FormData> = async (dataForm) => {
    setProgress(true)
    try {
      const token = query.get('token')
      const { password } = dataForm
      await changePasswordWithToken(token, password)
      setProgress(false)
      history.push({
        pathname: '/',
        state: {
          type: 'success',
          body: 'Cambio de contraseña exitosa.',
        },
      })
    } catch (err) {
      setProgress(false)
      if (axios.isAxiosError(err))
        setErrorChangePassword(
          new Error(err.response?.data?.message || err.message)
        )
    }
  }

  return (
    <Grid container justifyContent="center" style={{ height: '100vh', marginTop: '-75px'}}>
      <Grid item xs={12} md={7}>
        <Container maxWidth="xs">
          <Box mt={13}>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} className={classes.textContainer}>
                  <Box marginBottom={1}>
                      <Typography variant="h4" gutterBottom style={{ textAlign: 'left' }}>
                          <FormattedMessage {...messages.header} />
                      </Typography>
                      <Typography variant="body1" className={classes.text}>
                          <FormattedMessage {...messages.subheader} />
                      </Typography>
                  </Box>
              </Grid>
              <PasswordRequirementAlert message={messages.alertMessage} />
            <Grid item xs={12} >
              <Controller
                name='password'
                control={control}
                defaultValue=''
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Password
                    id='password'
                    label={messages.newPassword.defaultMessage}
                    value={value}
                    onChange={onChange}
                    error={error}
                    required={true}
                    fullWidth={true}
                    readOnly={false}
                  />
                )}
                rules={{
                  required: 'Nueva contraseña requerida',
                  minLength: { value: 8, message: 'Mínimo 8 caracteres' },
                  validate: {
                    atLeastOneLowerCaseLetter: (value) =>
                      value.split('').some((ch) => ch >= 'a' && ch <= 'z') 
                      ||  messages.atLeastOneLowerCaseLetter.defaultMessage,
                    atLeastOneUpperCaseLetter: (value) =>
                      value.split('').some((ch) => ch >= 'A' && ch <= 'Z')
                      || messages.atLeastOneUpperCaseLetter.defaultMessage,
                    atLeastOneNumber: (value) =>
                      value.split('').some((ch) => ch >= '0' && ch <= '9')
                      || messages.atLeastOneNumber.defaultMessage,
                    atLeastOneSymbol: (value) =>
                      value.split('').some((ch) => '!@#$%^&*.()-_'.includes(ch))
                      || messages.atLeastOneSymbol.defaultMessage,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='repassword'
                control={control}
                defaultValue=''
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Password
                    id='repassword'
                    label={messages.repeatNewPassword.defaultMessage}
                    value={value}
                    onChange={onChange}
                    error={error}
                    required={true}
                    fullWidth={true}
                    readOnly={false}
                  />
                )}
                rules={{
                  required: 'Repetir nueva contraseña requerido',
                  validate: {
                    passwordsMatch: (value) =>
                      value === passwordRef.current || messages.passwordNotMatch.defaultMessage,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} direction="row" className={classes.buttonContainer}>
                <Grid item xs={6} md={6}>
                  <Button
                    component={Link}
                    to='/'
                    variant='outlined'
                    color='primary'
                    size='large'
                    fullWidth
                  >
                    { messages.cancel.defaultMessage }
                  </Button>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    size='large'
                    onClick={handleSubmit(onSubmit)}
                  >
                    {progress ? (
                      <CircularProgress size={25} style={{ color: 'white' }} />
                    ) : (
                      messages.accept.defaultMessage
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {errorChangePassword && (
              <Grid item xs={12}>
                <Box mt={isMobile ? -2 : 4}>
                  <Alert
                    body={errorChangePassword.message}
                    variant='outlined'
                    type='error'
                    onClose={() => setErrorChangePassword(undefined)}
                  />
                </Box>
              </Grid>
            )}
              <Box mt={8}>
                <Grid item xs={12} >
                  <img src={LogoTuten} alt='Logo de tuten' />
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Container>
      </Grid>
    </Grid>
  )
}
