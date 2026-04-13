// cPanel Passenger entry point.
// Passenger uses require() to load the startup file. We use a dynamic
// import() here so it can load the ESM Astro server without top-level await errors.
// In cPanel Setup Node.js App, set the startup file to: app.js
import('./dist/server/entry.mjs').catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
