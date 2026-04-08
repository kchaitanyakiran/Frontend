# AgriLink Deployment

## Frontend

Use a static host such as Vercel, Netlify, or Render Static Site.

- Build command: `npm run build`
- Publish directory: `dist`
- Required environment variable:
  - `VITE_API_BASE_URL=https://your-backend-domain/api`
- SPA routing is configured in `vercel.json` and `netlify.toml`.

## Backend

Use a Java web service host such as Render, Railway, or a VPS.

- Root directory: `backend`
- Build command: `./mvnw package -DskipTests`
- Start command: `java -jar target/backend-0.0.1-SNAPSHOT.jar`
- Java version: `21`
- Docker deployment is also supported with `backend/Dockerfile`.

Required environment variables:

- `PORT`: provided by most hosts automatically, default is `8080`
- `DB_URL`: MySQL JDBC URL
- `DB_USERNAME`: MySQL username
- `DB_PASSWORD`: MySQL password
- `JWT_SECRET`: long random production secret
- `JWT_EXPIRATION_MS`: `86400000`
- `CORS_ALLOWED_ORIGINS`: frontend production URL, for example `https://your-frontend-domain`

## MySQL

Create a MySQL database named `agrilink` or point `DB_URL` to an existing MySQL database. The backend uses `spring.jpa.hibernate.ddl-auto=update`, so tables are created or updated automatically at startup.

## Local Verification Commands

```powershell
cd C:\AgriLink\backend
.\mvnw.cmd clean test
.\mvnw.cmd package -DskipTests
```

```powershell
cd C:\AgriLink
npm run build
```
