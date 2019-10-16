# Hosting

When deploying an app generated with this generator, make sure to deploy the `build/` folder. Depending on your webserver
setup, you will probably have to set the index.html document as a custom 404 page. Otherwise, routes like
https://your-app.com/login and https://your-app.com/welcome will not work and display a 404 page instead, when visited
directly.
