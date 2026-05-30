# 🐍 Snake Game — React + Vite

Implementación del clásico juego Snake usando React con Vite.

## Instalación y uso

```bash
npm install
npm run dev
```

Abrí http://localhost:5173 en tu navegador.

## Cómo jugar

- Presioná **INICIAR JUEGO** para comenzar
- Usá las **flechas del teclado** (↑ ↓ ← →) para mover la serpiente
- Comé la comida roja para crecer y sumar puntos
- Evitá las paredes y tu propio cuerpo
- La velocidad aumenta cada 50 puntos

## Estructura de componentes

| Componente | Responsabilidad                        |
|------------|----------------------------------------|
| `App`      | Orquestador principal, usa el hook     |
| `Board`    | Tablero: contiene Snake y Food         |
| `Snake`    | Renderiza los segmentos de la serpiente|
| `Food`     | Renderiza la comida                    |
| `Score`    | Muestra el puntaje actual              |