# Snake Game

Juego Snake desarrollado con React y Vite. La aplicacion esta separada en componentes reutilizables y maneja el estado del juego con hooks de React.

## Funcionalidades

- Pantalla de inicio y pantalla de juego.
- Movimiento con las flechas del teclado.
- Pausa y reanudacion con la tecla espacio.
- Crecimiento de la serpiente al comer.
- Deteccion de colisiones con paredes y con la serpiente.
- Puntaje visible durante la partida.
- Reinicio despues de game over.
- Aumento de velocidad cada 50 puntos.
- Estilo visual futurista y minimalista.

## Instalacion

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Luego abre la URL que muestra Vite, normalmente:

```text
http://localhost:5173
```

## Comandos

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Como jugar

- Entra desde la pantalla principal con el boton `JUGAR`.
- Usa las flechas para cambiar de direccion.
- Presiona `Espacio` para pausar o continuar.
- Come la comida para crecer y sumar puntos.
- Evita chocar con las paredes o con tu propio cuerpo.

## Estructura principal

```text
src/
  App.jsx
  main.jsx
  App.css
  components/
    Board.jsx
    Food.jsx
    Score.jsx
    Snake.jsx
  hooks/
    useGameLoop.js
  pages/
    Game.jsx
    Home.jsx
  utils/
    gameHelpers.js
```

## Componentes

| Componente | Responsabilidad |
| --- | --- |
| `App` | Controla la navegacion entre inicio y juego. |
| `Game` | Contenedor principal de la partida. |
| `Home` | Pantalla inicial. |
| `Board` | Renderiza el tablero y contiene `Snake` y `Food`. |
| `Snake` | Renderiza la cabeza, cuerpo y cola de la serpiente. |
| `Food` | Renderiza la comida. |
| `Score` | Muestra el puntaje. |

## Logica del juego

La logica principal vive en `src/hooks/useGameLoop.js`. Este hook usa `useState` para manejar el estado del juego y `useEffect` para escuchar el teclado y controlar el loop de movimiento.

El arreglo de la serpiente mantiene la cabeza en la posicion `0`, por lo que `snake[0]` siempre representa la cabeza.
