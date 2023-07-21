componente alert para aviso de acción ejecutada con o sin error o mensaje de información
recibe las siguientes propiedades
message, severity, title

title: string para el titulo de la card

severity: 'error' | 'info' | 'success' | 'warning'

msg: el mensaje con la informacion de la acción

NOTA: el componente maneja cierre automatico y cierre por click

Ejemplo de uso

import UseAlertComponent from '../moleculesComponents/alert/Alert'

const { AlertComponent, openSnackbar } = UseAlertComponent()

openSnackbar(
'mensaje para la card,
'error',
'titulo de la card,
)

return(
  <AlertComponent />
)
