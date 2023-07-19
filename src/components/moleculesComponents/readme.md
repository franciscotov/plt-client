componente modal de dialogo para confirmación de acción
recibe las siguientes propiedades open,
  open, title, msg, buttons

  open: para mostrar el componente, si es true este se mostrará

  setOpen: una función para manejar el cierre del componente, en caso de querer cerrar el componente
  por que se completó la acción se debe hacer desde el componente padre.

  msg: texto de mensaje del modal(en el cuerpo), ej: `seguro de activar profesional, ...`

  buttons: arreglo con las propiedades de los botones del modal debe tener el siguiente modelo:
  [{text: 'cancelar', action: () => setOpen(false)}]

  ejemplo de uso

  const [open, setOpen] = useState(false);
  <DialogComponent
    open={open}
    setOpen={setOpen}
    title={'confirmar eliminar?'}
    msg={'estas seguro de eliminar'}
    buttons={[
      { text: 'cancelar', action: () => console.log('cancelando') },
      { text: 'confirmar', action: () => console.log('confirmar') },
    ]}
  />
  <Button onClick={() => setOpen(true)}>
