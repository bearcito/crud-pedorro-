# Panel de Administración WooCommerce

Un panel de administración completo para gestionar productos de WooCommerce construido con Next.js, TypeScript y Tailwind CSS.

## Características

- ✅ **CRUD completo** de productos (Crear, Leer, Actualizar, Eliminar)
- ✅ **Interfaz moderna** con Tailwind CSS
- ✅ **Diseño responsive** para móviles y desktop
- ✅ **Integración con WooCommerce API**
- ✅ **TypeScript** para mejor desarrollo
- ✅ **App Router de Next.js**

## ️ Tecnologías

- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **WooCommerce REST API** - Integración con WooCommerce

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/crud-pedorro-.git
   cd crud-pedorro-
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**

   ```bash
   cp .env.example .env.local
   ```

   Edita `.env.local` con tus credenciales de WooCommerce:

   ```env
   NEXT_PUBLIC_WC_STORE_URL_USER1=https://tu-tienda.com
   NEXT_PUBLIC_WC_CONSUMER_KEY_USER1=tu_consumer_key
   NEXT_PUBLIC_WC_CONSUMER_SECRET_USER1=tu_consumer_secret
   ```

4. **Ejecuta el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

5. **Abre [http://localhost:3000](http://localhost:3000) en tu navegador**

## Estructura del Proyecto

```
src/
├── app/
│   ├── api/
│   │   └── products/
│   │       ├── route.ts                    # GET, POST
│   │       └── [id]/
│   │           └── route.ts                # PUT, DELETE
│   ├── lib/
│   │   └── woocommerce.ts                  # Configuración API
│   ├── page.tsx                            # Página principal
│   └── layout.tsx                          # Layout
└── types/
    └── product.ts                          # Tipos TypeScript
```

## 🔧 Configuración de WooCommerce

Para obtener las credenciales de la API de WooCommerce:

1. Ve a tu panel de administración de WordPress
2. Navega a **WooCommerce > Configuración > Avanzado > API REST**
3. Crea una nueva clave API con permisos de lectura/escritura
4. Copia la URL de tu tienda, Consumer Key y Consumer Secret

## 🎯 Uso

- **Crear producto:** Completa el formulario y haz clic en "Crear Producto"
- **Editar producto:** Haz clic en "Editar" en cualquier producto
- **Eliminar producto:** Haz clic en "Borrar" y confirma la acción

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request.
