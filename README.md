# Finance AI 🤖💰

Una plataforma SaaS inteligente de gestión financiera personal que utiliza inteligencia artificial para analizar, clasificar y proporcionar insights sobre tus transacciones financieras.

## 🌟 Características

- **IA Inteligente**: Integración con OpenAI para clasificación automática de transacciones
- **Dashboard Analítico**: Visualización en tiempo real de metrices financieras
- **Gestión de Transacciones**: CRUD completo de movimientos financieros
- **Autenticación Segura**: JWT con contraseñas hasheadas (bcrypt)
- **App Móvil Multiplataforma**: iOS, Android y Web con React Native
- **Multiidioma**: Soporte para múltiples idiomas (i18n)
- **API REST**: Backend escalable con NestJS

## 🛠️ Stack Tecnológico

### Backend
- **Framework**: NestJS 11
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Autenticación**: JWT + Passport
- **IA**: OpenAI API
- **Seguridad**: Helmet, bcrypt, validación de DTOs
- **Validación**: class-validator, Zod

### Frontend Móvil
- **Framework**: React Native 0.81 con Expo
- **Estado**: React Query (@tanstack/react-query)
- **Formularios**: React Hook Form + Zod
- **Navegación**: React Navigation
- **HTTP Client**: Axios
- **Internacionalización**: i18next

## 📋 Requisitos Previos

- **Node.js**: v18+ 
- **PostgreSQL**: v14+
- **npm**: v10+ o yarn
- **Expo CLI**: (para desarrollo móvil)
- **OpenAI API Key**: Para funcionalidades de IA

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd finance-ai
```

### 2. Instalar dependencias

```bash
# Backend
cd apps/api
npm install

# Frontend Móvil
cd ../finance-mobile
npm install
```

### 3. Configurar variables de entorno

#### Backend (`apps/api/.env`)

```env
# Base de Datos
DATABASE_URL=postgresql://user:password@localhost:5432/finance_db

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRATION=3600

# OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# Puerto
PORT=3000

# Node Environment
NODE_ENV=development
```

#### Frontend Móvil (`apps/finance-mobile/.env`)

```env
# API URL
REACT_APP_API_URL=http://localhost:3000/api

# Environment
REACT_APP_ENV=development
```

### 4. Configurar base de datos

```bash
cd apps/api
npx prisma migrate dev --name init
```

## 📜 Scripts Disponibles

### Backend

```bash
# Desarrollo
npm run start:dev

# Build para producción
npm run build

# Ejecutar en producción
npm run start:prod

# Tests
npm run test
npm run test:watch
npm run test:cov
npm run test:e2e

# Linting
npm run lint

# Formateo
npm run format
```

### Frontend Móvil

```bash
# Desarrollo
npm start

# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📁 Estructura del Proyecto

```
finance-ai/
├── apps/
│   ├── api/                    # Backend NestJS
│   │   ├── src/
│   │   │   ├── ai/            # Módulo de IA
│   │   │   ├── auth/          # Autenticación JWT
│   │   │   ├── users/         # Gestión de usuarios
│   │   │   ├── txns/          # Transacciones
│   │   │   ├── dashboard/     # Dashboard
│   │   │   ├── prisma/        # Configuración Prisma
│   │   │   └── common/        # Utilidades compartidas
│   │   ├── prisma/            # Esquema y migraciones
│   │   └── test/              # Tests E2E
│   │
│   └── finance-mobile/         # App React Native
│       ├── src/
│       │   ├── screens/       # Pantallas de la app
│       │   ├── navigation/    # Stack de navegación
│       │   ├── api/           # Cliente HTTP
│       │   ├── components/    # Componentes reutilizables
│       │   ├── auth/          # Gestión de tokens
│       │   ├── i18n/          # Internacionalización
│       │   └── schemas/       # Validaciones Zod
│       └── assets/            # Imágenes y recursos
```

## 🔌 API Endpoints Principales

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refrescar token

### Usuarios
- `GET /api/users/profile` - Obtener perfil actual
- `PATCH /api/users/profile` - Actualizar perfil
- `DELETE /api/users/account` - Eliminar cuenta

### Transacciones
- `GET /api/txns` - Listar transacciones
- `POST /api/txns` - Crear transacción
- `PATCH /api/txns/:id` - Actualizar transacción
- `DELETE /api/txns/:id` - Eliminar transacción
- `POST /api/txns/quick` - Crear transacción rápida

### Dashboard
- `GET /api/dashboard` - Obtener metrices del dashboard

### IA
- `POST /api/ai/classify` - Clasificar transacción con IA
- `POST /api/ai/insights` - Obtener insights con IA

## 🔐 Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ Autenticación JWT stateless
- ✅ Headers de seguridad con Helmet
- ✅ Validación de DTOs en todas las rutas
- ✅ CORS configurado
- ✅ Rate limiting con @nestjs/throttler

## 🗄️ Base de Datos

El proyecto usa PostgreSQL con Prisma ORM. Las migraciones están en `apps/api/prisma/migrations/`.

### Esquema principal
- **Users**: Almacena información de usuarios
- **Transactions**: Historial de transacciones
- **Categories**: Categorías para clasificar transacciones

## 🚀 Despliegue

### Docker

```bash
cd apps/api
docker-compose up -d
```

### Producción

1. Compilar backend: `npm run build`
2. Compilar app móvil: `eas build`
3. Configurar variables de entorno en producción
4. Desplegar con Heroku, AWS, DigitalOcean, etc.

## 📝 Licencia

UNLICENSED

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Soporte

Para reportar bugs o sugerir features, abre un issue en el repositorio.

---

**Desarrollado con ❤️**
