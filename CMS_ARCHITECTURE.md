# CMS Architecture — Gustavo Consulting

## 📋 Overview

Este documento describe la arquitectura CMS completa y preparada para futuras iteraciones. Actualmente está **DESACTIVADA** enfocando 100% en frontend perfecto.

**Status:** 🔒 Locked for Phase 2 (Iteración 2.0+)

---

## 🗄️ Database Schema (Supabase PostgreSQL)

### Tabla: `articles`
```sql
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  titulo VARCHAR(500) NOT NULL,
  resumen TEXT NOT NULL,
  contenido TEXT NOT NULL (Markdown/Rich text),
  categoria VARCHAR(100) NOT NULL,
  featured_image_url VARCHAR(500),
  featured_image_alt VARCHAR(255),
  meta_description VARCHAR(160),
  meta_keywords VARCHAR(500),
  author_id UUID REFERENCES auth.users(id),
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP
);
```

### Tabla: `admin_users`
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  rol ENUM('editor', 'admin', 'owner') DEFAULT 'editor',
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla: `contact_messages` (Desactivada por ahora)
```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  empresa VARCHAR(255),
  telefono VARCHAR(20),
  mensaje TEXT NOT NULL,
  leido BOOLEAN DEFAULT false,
  respondido BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla: `email_subscribers` (Desactivada por ahora)
```sql
CREATE TABLE email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  nombre VARCHAR(255),
  fuente VARCHAR(100),
  subscrito BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 API Routes (Planned)

**Status:** ❌ Not implemented (Reserved for Phase 2)

### Artículos
```
GET    /api/articles              → Listar artículos (público)
POST   /api/articles              → Crear artículo (admin, requiere auth)
PUT    /api/articles/[id]         → Actualizar artículo (admin)
DELETE /api/articles/[id]         → Eliminar artículo (admin)
```

### Autenticación Admin
```
POST   /api/admin/auth/login      → Login con email/password
POST   /api/admin/auth/logout     → Logout
POST   /api/admin/auth/refresh    → Refresh token
```

### Suscriptores
```
POST   /api/subscribers           → Agregar suscriptor (público)
GET    /api/subscribers           → Listar suscriptores (admin)
DELETE /api/subscribers/[id]      → Cancelar suscripción
```

---

## 🎛️ Admin Panel Routes (Planned)

**Status:** ❌ Not implemented (Reserved for Phase 2)

### Estructura
```
/admin/
├── page.tsx                      Dashboard
├── articles/
│   ├── page.tsx                 Listado (búsqueda, filtros, acciones)
│   ├── new/page.tsx             Crear artículo
│   └── [id]/page.tsx            Editar artículo
├── messages/page.tsx            Contactos (marcar como leído, responder)
├── subscribers/page.tsx         Email marketing (export CSV)
└── settings/page.tsx            Configuración del sitio
```

---

## 📦 Dependencies to Install (Phase 2)

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install zustand                      # State management
npm install react-markdown               # Article editor
npm install next-cloudinary             # Image optimization (optional)
npm install react-hot-toast             # Notifications
npm install zod                         # Schema validation
```

---

## 🔐 Environment Variables (Phase 2)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email Service (Optional)
RESEND_API_KEY=your_resend_api_key

# Image Storage (Optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
```

---

## 📁 Folder Structure (When Implemented)

```
app/
├── api/
│   ├── articles/
│   │   ├── route.ts              # GET/POST
│   │   └── [id]/route.ts         # PUT/DELETE
│   ├── admin/
│   │   ├── auth/[auth]/route.ts
│   │   └── articles/upload/route.ts
│   └── subscribers/route.ts
├── admin/
│   ├── layout.tsx                # Admin sidebar + nav
│   ├── page.tsx                  # Dashboard ✅ (exists)
│   ├── articles/
│   │   ├── page.tsx
│   │   ├── new/page.tsx
│   │   └── [id]/page.tsx
│   ├── messages/page.tsx
│   ├── subscribers/page.tsx
│   └── settings/page.tsx
├── auth/
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── logout/route.ts
└── lib/
    ├── supabase.ts               # Client initialization
    ├── auth.ts                   # Auth utilities
    ├── articles.ts               # Article queries
    └── types.ts                  # TypeScript interfaces
```

---

## 🔄 Implementation Phases

### **Phase 1** (Current) ✅ Complete
- ✅ Frontend perfecto (Iteración 1.1)
- ✅ Responsive design
- ✅ Animations y interactividad
- ✅ Accessibility (WCAG AA)

### **Phase 2** (Next) ⏳ Planned
- ⏳ Setup Supabase project
- ⏳ API routes (articles CRUD)
- ⏳ Admin authentication
- ⏳ Articles management interface
- ⏳ Image optimization

### **Phase 3** (Future) ⏳ Planned
- ⏳ Contact form messaging
- ⏳ Email marketing setup (suscriptores)
- ⏳ Dashboard analytics
- ⏳ Settings management
- ⏳ Export/reports functionality

---

## 📋 Checklist for Phase 2 Setup

```
CMS Infrastructure:
  [ ] Create Supabase project
  [ ] Setup authentication
  [ ] Create database tables
  [ ] Setup Row Level Security (RLS)
  [ ] Configure API keys in .env

API Development:
  [ ] Implement articles endpoints (GET/POST/PUT/DELETE)
  [ ] Implement auth endpoints (login/logout)
  [ ] Setup middleware for admin protection
  [ ] Error handling & validation
  [ ] Rate limiting

Admin Interface:
  [ ] Create admin layout/sidebar
  [ ] Build articles management page
  [ ] Implement article editor
  [ ] Add image upload handler
  [ ] Create settings page

Testing:
  [ ] Unit tests for API routes
  [ ] Integration tests for Supabase
  [ ] Admin panel usability testing
  [ ] Security audit (auth, RLS)
```

---

## 🎯 Success Criteria (Phase 2)

- ✓ Admins can create/edit/delete articles without code changes
- ✓ Articles are fetched dynamically from database
- ✓ Blog listing shows all published articles
- ✓ Full text search on articles
- ✓ Image optimization for thumbnails
- ✓ Email collection for marketing (future)
- ✓ Admin authentication is secure (2FA-ready)

---

## 🔗 Resources & Documentation

- **Supabase Docs:** https://supabase.com/docs
- **Supabase + Next.js:** https://supabase.com/docs/guides/auth/auth-helpers/nextjs
- **Supabase RLS:** https://supabase.com/docs/guides/auth/row-level-security
- **Authentication Best Practices:** https://owasp.org/www-project-authentication-cheat-sheet/

---

## 📝 Notes

- **Images:** Currently stored locally. Phase 2 can use Cloudinary or Supabase Storage.
- **Email:** Currently using Resend (configured). Phase 2 will integrate with contact form & marketing.
- **Database:** Supabase provides free tier suitable for MVP. Upgrade when needed.
- **Scalability:** Architecture supports multi-admin setup with role-based access.

---

**Last Updated:** 2026-05-24  
**Status:** 🔒 Ready for Phase 2 (Frozen until requirements clarified)
