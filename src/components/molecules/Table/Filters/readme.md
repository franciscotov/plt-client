> Author: Luis Ramos (luis.ramos@tutenlabs.com)

# Tuten Table Filters V1

Se creo un componente para los filtros de las tablas, el cual recibe 3 parametros, filters, setFilters, y filterList

<TableFilter filters={filtersInfo} setFilters={setFilterInfo} filterList={testFilters} />

## Parametros de entrada

TableFilter.propTypes = {
    filters: shape(),
    setFilters: func,
    filterList: array,
    showKeywordInput: bool
};

1. **filters y setFilters**

filters es el objeto donde se va a almecenar el estado actual de los filtros seleccionados, con su valor, y setFilters es la funcion que actualiza el state.

Filters debe tener la siguiente forma: { keyword: '', selecteds: [] }

2. **filterList**

Es la lista de filtros, actualmente (18/10/2021) existen 2 tipos de filtro, 'list' y 'date' y deben tener los siguientes campos

label: 'Fecha de creacion', //El label del Filtro
tag: 'test_48', // el nombre del field por el cual se desea filtrar (debe ser unico)
checked: false, // si el filtro esta en checked (deberia ser falso por default)
type: 'date', // el tipo de filtro (date o list)
visible: true, // si el filtro es visible para el usuario (se pueden aplicar validaciones para mostrar o no mostrar x filtro a un usuario)

Ademas, dependiendo de cada filtro deben tener otros campos particulares que van en el field config del filtro.

En el caso de los tipo List tenemos:

config: {
    value: [] //Valor actual del filtro (debe empezar como un array vacio),
    list: [  // La lista de opciones posibles por la cual filtrar
        {
          label: 'Test 1', // Label de la opcion
          value: 'test1',  // valor de la opcion (debe ser unico)
        }
    ]
}


En el caso de los tipo date tenemos:

config: {
    range: false, // si es un rango de fecha o una fecha unica
    singleDateLabel: 'Ingresa la fecha de creación' (default), // label si es una fecha unica
    startDateLabel: 'Fecha inicio' (default), // label del primer input si es un rango de fechas
    endDateLabel: 'Fecha fin' (default), // label del segundo input si es un rango de fechas
    startDate: null, // valor del primer/unico input
    endDate: null // valor del segundo input input
}





por lo que el objeto filterList tendria la siguiente forma:

const testFilters = [
  {
    label: 'Estado',
    tag: 'state',
    checked: false,
    type: 'list',
    visible: true,
    config: {
      value: [],
      list: [
        {
          label: 'Test 1',
          value: 'test1'
        },
        {
          label: 'Test 2',
          value: 'test2'
        },
        {
          label: 'Test 3',
          value: 'test3'
        },
        {
          label: 'Test 4',
          value: 'test4'
        },
        {
          label: 'Test 5',
          value: 'test5'
        },
        {
          label: 'Test 6',
          value: 'test6'
        },
        {
          label: 'Test 7',
          value: 'test7'
        }
      ]
    }
  }
  {
    label: 'Fecha de creacion',
    tag: 'creation_date',
    checked: false,
    type: 'date',
    visible: true,
    config: {
      range: false,
      startDate: null,
      endDate: null
    }
  },
  {
    label: 'Fecha de actualizacion',
    tag: 'update_date',
    checked: false,
    type: 'date',
    visible: true,
    config: {
      range: false,
      singleDateLabel: 'Ingresa la fecha de actualizacion',
      startDate: null,
      endDate: null
    }
  }
]


cada vez que se haga un cambio en los filtros, la varible filters que le pasamos al componente cambiara, por lo que podria llegar a tener la siguiente forma:

{
    keyword: 'perez',
    selecteds: [
        {
            label: 'Estado',
            tag: 'state',
            checked: false,
            type: 'list',
            visible: true,
            config: {
            value: ['test1', 'test2'],    // LAS OPCIONES QUE SELECCIONAMOS
            list: [
                {
                label: 'Test 1',
                value: 'test1'
                },
                {
                label: 'Test 2',
                value: 'test2'
                },
                {
                label: 'Test 3',
                value: 'test3'
                },
                {
                label: 'Test 4',
                value: 'test4'
                },
                {
                label: 'Test 5',
                value: 'test5'
                },
                {
                label: 'Test 6',
                value: 'test6'
                },
                {
                label: 'Test 7',
                value: 'test7'
                }
                ]
            }
        },
        {
            label: 'Fecha de actualizacion',
            tag: 'update_date',
            checked: false,
            type: 'date',
            visible: true,
            config: {
                range: true,
                singleDateLabel: 'Ingresa la fecha de actualizacion',
                startDate: 'fecha',
                endDate: 'fecha'
            }
        }
    ]
}

ya que puede crecer mucho este objeto se creo una funcion parseFilters (exportada en el mismo archivo del componente), que parsea este objeto de la siguiente forma

{
    [tag]: [val1, val2, val3] //en el caso de las listas,
    [tag] : { // en el caso de los tipo date
       range: true,
       startDate: 'fecha',
       endDate: 'fecha'
    }
}
