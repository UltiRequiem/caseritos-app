# Deployment Guide for Railway

This guide explains how to deploy your NestJS application to Railway using the provided Docker configuration.

## Prerequisites

1. A [Railway](https://railway.app/) account
2. [Railway CLI](https://docs.railway.app/develop/cli) installed (optional, for command-line deployment)
3. Git installed on your system

## Deployment Steps

### Option 1: Deploy via Railway Dashboard (Recommended for beginners)

1. **Push your code to a GitHub repository**
   - Make sure your code includes the `Dockerfile`, `.dockerignore`, and `railway.json` files

2. **Create a new project in Railway**
   - Log in to [Railway Dashboard](https://railway.app/dashboard)
   - Click "New Project" and select "Deploy from GitHub repo"
   - Find and select your repository
   - Railway will automatically detect the Dockerfile and use it for deployment

3. **Configure Environment Variables**
   - In your project dashboard, click on the "Variables" tab
   - Add all necessary environment variables as specified in `.env.example`
   - At minimum, set the following:
     - `PORT=3000`
     - `NODE_ENV=production`
     - `ORIGINS=*` (or your specific allowed origins)

4. **Deploy Your Application**
   - Railway will automatically build and deploy your application
   - You can view build logs in the "Deployments" tab

### Option 2: Deploy via Railway CLI

1. **Login to Railway CLI**
   ```bash
   railway login
   ```

2. **Link your project (if you've already created it on Railway)**
   ```bash
   railway link
   ```

3. **Deploy your application**
   ```bash
   railway up
   ```

4. **Set environment variables**
   ```bash
   railway variables set PORT=3000 NODE_ENV=production ORIGINS=*
   ```

## Local Testing with Docker

Before deploying to Railway, you can test your Docker setup locally:

1. **Build the Docker image**
   ```bash
   docker build -t acme-frutas-app .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 --env-file .env acme-frutas-app
   ```

3. **Using Docker Compose**
   ```bash
   docker-compose up
   ```

## Monitoring & Logs

Once deployed, you can monitor your application and view logs through the Railway dashboard.

## Troubleshooting

- **Build fails**: Check the build logs in Railway for specific errors
- **Application crashes**: View the logs to identify the issue
- **Database connection issues**: Ensure you've properly configured database environment variables

## Additional Resources

- [Railway Documentation](https://docs.railway.app/)
- [NestJS Deployment Guide](https://docs.nestjs.com/techniques/deployment)
- [Docker Documentation](https://docs.docker.com/)
