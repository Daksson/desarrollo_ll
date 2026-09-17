# SpaceExplorer

Proyecto final de **Desarrollo de Software II**, Ingeniería de Sistemas, Universidad de los Llanos, 2026.

## Integrantes

- Daniel Felipe Puin Motavita: parte de Star Wars (SWAPI)
- Daksson Miguel Gualteros Marin: parte de la NASA

## Propósito y alcance

SpaceExplorer es una aplicación web en Angular para explorar datos de dos APIs públicas: la de Star Wars (SWAPI) y la de la NASA.

El objetivo es poner en práctica lo visto en el curso: TypeScript, componentes, signals, rutas, servicios con `HttpClient`, interfaces, mappers y pruebas. La aplicación funciona solo en el navegador: no tiene backend propio ni guarda datos; todo lo que muestra lo pide a las APIs en el momento.

## Funcionalidades

### Star Wars (SWAPI)

- **Lista de personajes** en `/starwars`: tabla con 10 personajes por página, búsqueda por nombre (con Enter o con el botón Buscar) y botones Anterior / Siguiente que se desactivan cuando no hay más páginas.
- **Ficha de cada personaje** en `/starwars/:id`: datos del personaje, su planeta natal y sus películas ordenadas por episodio.
- **Estados de carga y error**: "Cargando...", "No se encontraron personajes." y "No se encontró el personaje." (por ejemplo, en `/starwars/17`, que no existe en SWAPI).
- **Conversión de datos**: SWAPI entrega los números como texto; la aplicación los convierte (`"172"` → `172`, `"1,358"` → `1358`, `"unknown"` → sin dato).

Servicios de SWAPI que consume (no requiere clave):

| Petición | Uso |
|---|---|
| `GET https://swapi.dev/api/people/?page=1&search=sky` | Lista paginada y búsqueda |
| `GET https://swapi.dev/api/people/1/` | Un personaje |
| `GET https://swapi.dev/api/planets/1/` | Planeta natal |
| `GET https://swapi.dev/api/films/1/` | Cada película |

### NASA

- **Foto astronómica del día** en `/nasa`: al entrar muestra la última foto publicada, con su título, explicación, fecha y autor. Con el selector se puede ver la de cualquier día desde el 16 de junio de 1995. Un clic en la imagen abre la versión en alta resolución; los días en que la NASA publicó un video se muestra un enlace para verlo.
- **Asteroides cercanos** en `/nasa/asteroides`: para el día elegido muestra cuántos asteroides pasan cerca de la Tierra, cuántos son potencialmente peligrosos y cuál pasa más cerca, además de una tabla con diámetro, velocidad y distancia, ordenada del más cercano al más lejano.
- **Menú propio** para moverse entre las dos páginas, con la página actual resaltada.
- **Estados de carga y error**: "Cargando...", "No hay foto para esa fecha o la NASA no respondió." y "La NASA no registra asteroides para ese día."
- **Conversión de datos**: la velocidad y la distancia llegan como texto con decimales y se convierten en números enteros; si falta el autor de la foto, se muestra "Dominio público".

Servicios de la NASA que consume (requieren clave, que está en `src/environments`):

| Petición | Uso |
|---|---|
| `GET https://api.nasa.gov/planetary/apod?api_key=...&date=2026-09-15` | Foto astronómica del día (APOD). Sin `date`, devuelve la última |
| `GET https://api.nasa.gov/neo/rest/v1/feed?start_date=2026-09-15&end_date=2026-09-15&api_key=...` | Asteroides cercanos de un día (NeoWs) |

La clave se consigue gratis en https://api.nasa.gov/. Con `DEMO_KEY` también funciona, pero solo permite unas pocas peticiones por hora.

## Dependencias

| Herramienta | Versión |
|---|---|
| Node.js | 18.19.1 o superior, 20.11.1 o superior, o 22 en adelante (probado con 22.18.0) |
| npm | Viene con Node.js (probado con 10.9.3) |
| Angular | 18.2 |
| RxJS | 7.8 |
| TypeScript | 5.5 |
| Jasmine y Karma | Para las pruebas unitarias |

No se instala nada de forma global: el Angular CLI queda dentro del proyecto y se usa con `npx ng` o con los scripts de `npm`. Para las pruebas se necesita Google Chrome.

## Cómo ejecutarlo

```bash
git clone https://github.com/Daksson/desarrollo_ll.git
cd desarrollo_ll
npm install
npm start
```

Abrir http://localhost:4200/ y elegir **Star Wars** o **NASA** en el menú. Se necesita conexión a internet, porque los datos vienen de las APIs.

Otros comandos:

| Comando | Qué hace |
|---|---|
| `npm run build` | Compila la aplicación en `dist/space-explorer` |
| `npx ng test --watch=false` | Ejecuta las pruebas unitarias una vez |

## Estructura del proyecto

```text
desarrollo_ll/
├── presentacion/                     Diapositivas de la exposición y diagramas
│   ├── presentacion.html             Abrir con doble clic; flechas para avanzar
│   ├── arquitectura-starwars.html    Diagrama de arquitectura de Star Wars (interactivo)
│   ├── secuencia-detalle.html        Diagrama de lo que pasa al abrir una ficha
│   ├── arquitectura-nasa.html        Diagrama de arquitectura de la NASA
│   └── diagramas/                    Fuentes JSON de los diagramas
│
└── src/
    ├── environments/
    │   ├── environment.ts             Configuración de producción (URLs y clave de la NASA)
    │   └── environment.development.ts Configuración usada por npm start
    │
    └── app/
        ├── app.config.ts              provideRouter y provideHttpClient
        ├── app.routes.ts              Rutas: '', nasa, nasa/asteroides, starwars, starwars/:id
        ├── app.component.html         Menú de navegación
        │
        ├── interfaces/
        │   ├── swapi.interface.ts     Datos tal como llegan de SWAPI
        │   ├── starwars.interface.ts  Datos de Star Wars que usa la aplicación
        │   ├── nasa-api.interface.ts  Datos tal como llegan de la NASA
        │   └── nasa.interface.ts      Datos de la NASA que usa la aplicación
        │
        ├── mappers/
        │   ├── starwars.mapper.ts     Convierte los datos de SWAPI a los de la app
        │   └── nasa.mapper.ts         Convierte los datos de la NASA a los de la app
        │
        ├── services/
        │   ├── service_starwars/      StarwarsService: peticiones a SWAPI
        │   └── service_nasa/          NasaService: peticiones a la NASA
        │
        ├── utils/
        │   └── date.util.ts           Fecha de hoy en formato YYYY-MM-DD, con la hora local
        │
        ├── components/
        │   ├── starwars/
        │   │   └── character-list/    Tabla de personajes (recibe la lista con input.required)
        │   └── nasa/
        │       ├── nasa-menu/         Menú entre la foto del día y los asteroides
        │       └── asteroid-list/     Tabla de asteroides (recibe la lista con input.required)
        │
        └── pages/
            ├── landing/               Inicio
            ├── starwars/              Lista de personajes con buscador y paginación
            ├── starwars-detail/       Ficha de un personaje
            ├── nasa/                  Foto astronómica del día
            └── nasa-asteroids/        Asteroides cercanos de un día
```

### Cómo fluyen los datos

```text
Página (signals) --subscribe--> Servicio --HttpClient--> API
                                   |
                              pipe(map)
                                   v
                                Mapper
```

1. La **página** llama a un método del servicio y se suscribe.
2. El **servicio** hace la petición con `HttpClient`, usando la URL de `environments`.
3. Con `pipe(map)`, la respuesta pasa por el **mapper**, que la convierte a las interfaces de la aplicación.
4. La página recibe los datos ya convertidos, los guarda en **signals** y la pantalla se actualiza.

Los componentes de `components/` no hacen peticiones: solo muestran lo que la página les pasa.

## Pruebas

```bash
npx ng test --watch=false
```

Las pruebas no llaman a las APIs reales: usan `provideHttpClientTesting` para comprobar qué petición se hizo y responder con datos de prueba.

| Archivo | Qué comprueba |
|---|---|
| `mappers/starwars.mapper.spec.ts` | Conversión de texto a número, `"unknown"` a `null` y URL a id |
| `services/service_starwars/starwars.service.spec.ts` | Que se envíen `page` y `search`, y que la respuesta llegue convertida |
| `pages/starwars/starwars.component.spec.ts` | Que los personajes recibidos aparezcan en la tabla |
| `mappers/nasa.mapper.spec.ts` | Foto con y sin autor, texto a número y asteroides ordenados por distancia |
| `services/service_nasa/nasa.service.spec.ts` | Que se envíen la fecha y la clave, y que la respuesta llegue convertida |
| `pages/nasa/nasa.component.spec.ts` | Que el título y la imagen de la foto aparezcan en la página |
| `app.component.spec.ts` | Que la aplicación se cree y el menú tenga sus enlaces |
