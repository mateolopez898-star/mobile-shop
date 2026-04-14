# Mobile Shop
App para comprar dispositivos móviles, desarrollada con React y Vite.

## Tecnologías
- React 18
- Vite
- React Router v6

## Requisitos
- Node.js v18 o superior
- npm v9 o superior

## Funcionalidades
- Listado de móviles con barra de búsqueda
- Detalle de producto con selección de color/almacenamiento
- Dentro de detalle, opción añadir al carrito
- Contador del carrito persiste en el encabezado con caché de 1 hora
- Diseño responsive adaptativo

## Instalación
1º Clona el repositorio
2º Instala las dependencias requeridas

git clone https://github.com/mateolopez898-star/mobile-shop.git
cd mobile-shop
npm install

## Scripts
|Comando | Descripción |
|`npm run start` | Modo desarrollo |
|`npm run build` | Compilación de producción |
|`npm run test` | Lanzamiento de  los tests |
|`npm run lint` | Comprobación del código|

## API
Base URL dispositivos: `https://itx-frontend-test.onrender.com`
- `GET /api/product` — Listado de productos
- `GET /api/product/:id` — Detalle de producto
- `POST /api/cart` — Añadir producto al carrito

