# Next.js Deployment with PM2

This guide will help you deploy a Next.js application using **PM2** to keep it running in the background.

## Prerequisites
- Node.js installed (`node -v` to check)
- PM2 installed globally (`npm install -g pm2`)
- A Next.js project set up

## Steps to Deploy

### 1. Install Dependencies
```sh
npm install
```

### 2. Build the Next.js App
```sh
npm run build
```

### 3. Start the App with PM2
```sh
pm2 start npm --name "nextjs-app" -- start
```

### 4. Save the PM2 Process
```sh
pm2 save
```

### 5. Set Up Auto Start on Reboot
```sh
pm2 startup
```
Follow the instructions shown to enable PM2 startup.

### 6. Monitor the Process
```sh
pm2 list
pm2 logs nextjs-app
```

### 7. Restart or Stop the App
```sh
pm2 restart nextjs-app
pm2 stop nextjs-app
pm2 delete nextjs-app
```

## Optional: Configure PM2 Ecosystem File
Create a `ecosystem.config.js` file:
```js
module.exports = {
  apps: [
    {
      name: "nextjs-app",
      script: "npm",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        NEXT_PUBLIC_DATA_API=https://165.232.47.193/api // change to real
        NEXT_PUBLIC_DATA=https://165.232.47.193 // change to real
        NODE_TLS_REJECT_UNAUTHORIZED=0 
      }
    }
  ]
};
```
Start with:
```sh
pm2 start ecosystem.config.js
```

## Done! 🚀 Your Next.js app is now running with PM2.

