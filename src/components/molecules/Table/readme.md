> Author: Luis Ramos (luis.ramos@tutenlabs.com)

# Tuten Material Table V1

Anteriormente se usaba para todas las tablas de la aplicación se usaba un componente propio que tomaba como basa el paquete **material-table**, sin embargo se esta haciendo la migración a la suite de componentes de **Material Ui** por lo que se desarrollo un nuevo componente para utilizar en todas las tablas del sistema.

## Parametros de entrada

    TutenTable.propTypes = {
	    total:  number,
        showPagination:  bool,
        actions:  func,
        columns:  array,
        data:  array,
        getData:  func
        refresh: bool //opcional para refrescar la data de la tabla
        getSnackbar: func //opcional para controlar el aviso de errores
        fieldToActive: string //opcional para verificar si la fila debe estar inactiva(con estilos de inactivo)
      };

 1. **showPagination**
>  por defecto la tabla siempre mostrara los controles de navegación, en caso de querer lo contrario pasar showPagination={false}.

 2. **actions**

> Es un arreglo objetos que son las acciones que serán desplegadas al principio de cada fila (un botón que tiene 3 puntos) el arreglo y los objetos deben tener la siguiente estructura:
    `
     const  Actions = row  => [{
	     text:  'Activar',  (Texto de la accion)
         close:  true,  (si queremos que el menu se cierre al finalizar la accion, por defecto es true )
         visible:  true (podemos ocultar condicionalmente una acción, default true ),
         action:  row  =>  console.debug(`Desactivar ${row.id}`) (es la funcion que se ejecutara debe ser de la forma 	row => void()  donde row contiene toda la informacion de la fila)
    }]
    `
 3. **columns**

> Es un arreglo de objetos que representan las columnas,  el arreglo y los objetos deben tener la siguiente estructura:
    `
    const Columns = [{
        text:  'Fecha de creación',  (texto que se mostrara en la columna
        tag:  'creationDate',  (el tag es para saber que elemento de la data debemos mostrar en la columna)
        visible:  true (para ocultar columnas condicionalmente, default true)
        sort: true (si se quiere que el usuario pueda ordenar por dicha columna, default false)
        field: 'creation_date' (este field es que se le pasara a la funcion updateDate)
    }];

 4.  **getData**

> es una función utilizada para settear la data que vamos a mostrar en la tabla, sera llamada automaticamente cada vez que cambiemos de pagina o hagamos sort en alguna columna, recibe un page ,limit, field y order. (page, limit, field, oder) => ({total, items}), el objeto items puede no tiene limitaciones en cuanto a cuantas propiedades puede tener sin embargo solo se mostraran aquellos valores cuyo key concuerden con el tag de una columna

# Ejemplo

`
    const dataApi = (page, limit) => {
        const url = `${apiName}/list?pageSize=${page}&limit=${limit}`;
        return api.get(url, buildTokenHeader())
        .then(res => { return res.data; })
        .catch(error => { throw error; });
    }

    const app = props => {
        const [data, setData] = useState([]);
        const [total, setTotal] = useState([]);

        const activar = async (id) => {
             const response = await activarApi(id);
             console.debug(response)
        }

        const Actions = row => [
            {
                text: 'Activar',
                close: true,
                visible: permissions.includes('ACTIVATE_WORKER_TWILIO') && !row.active,
                action: row => activar(row.id))
            }
        ]

        const Columns = [
            { text: 'Nombre', tag: 'name', visible: true },
            { text: 'Apellido', tag: 'lastName', visible: true },
        ];

        const getData = (page, limit) => {
            const response = dataApi(page, limit);
            return { total : response.extra.total, items: response.items  }
        }

        return (
            <TutenTable actions={Actions} columns={Columns} getData={getData} />
        )
    }
`
(para mas detalle, ver el mantenedor de agentes telefonicos, App > Containers > Mantainers > Workers)

## Adicional

Tambien se creo un componente TableHeader para mostrar un titulo y un boton encima de la tabla (de manera que se vea homogenea en toda la app y no tener que repetir tanto codigo) el mismo se usa de la siguiente manera
`
    <TableHeader title={'Mantenedor de Agentes'} buttonText={'Crear Agente'} action={() => console.debug('test')} />
`
donde title es titulo a mostrar, buttonText es el texto que saldra en el boton, y el action es la accion a realizar al clickear el mismo

Finalmente el uso de estos dos componentes se veria asi:

`
   <Container>
        <Box>
          <TableHeader title={'Mantenedor de Agentes'} buttonText={'Crear Agente'} action={() => console.debug('test')} />
          <TutenTable actions={Actions} columns={Columns} getData={getworkers} />
        </Box>
    </Container>
`

## Filtros

Para filtrar tenemos que tener en cuenta que nuestra funcion para obtener la data solo recibira los parametros: page, limit, field y order. Entonces cuando queremos filtrar la data tenemos que tener todas nuestras variables por las que vamos a filtrar en el state del parent component y pasarle esa variable por props a la tabla (prop: filter), y nuestra funcion getData debe leer esa variable del state (no sera pasada por parametros);

Ejemplo

# Ejemplo

`
    const dataApi = (page, limit) => {
        const url = `${apiName}/list?pageSize=${page}&limit=${limit}`;
        return api.get(url, buildTokenHeader())
        .then(res => { return res.data; })
        .catch(error => { throw error; });
    }

    const app = props => {
        const [data, setData] = useState([]);
        const [total, setTotal] = useState([]);
        const [filters, setFilters] = useState();

        const activar = async (id) => {
             const response = await activarApi(id);
             console.debug(response)
        }

        const Actions = row => [
            {
                text: 'Activar',
                close: true,
                visible: permissions.includes('ACTIVATE_WORKER_TWILIO') && !row.active,
                action: row => activar(row.id))
            }
        ]

        const Columns = [
            { text: 'Nombre', tag: 'name', visible: true },
            { text: 'Apellido', tag: 'lastName', visible: true },
        ];

        const getData = (page, limit, field, order) => {
            const response = dataApi(page, limit);
            console.debug(filters) <<<<<<<<<<<<<<<<<<<<<<<<<<< aca estamos haciendo uso de los filters
            return { total : response.extra.total, items: response.items  }
        }

        return (
            <Button onClick={() => setFilters(AnyRandomValue)}>
            <TutenTable actions={Actions} columns={Columns} getData={getData} filters={filters}/>
        )
    }
`

en el ejemplo anterior cada vez que le demos click al button, la tabla se refrescara manteniendo el sort que tengamos configurado pero mandandonos a la primera pagina cada vez.