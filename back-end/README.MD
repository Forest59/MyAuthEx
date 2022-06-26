# Getting Started

## Script to run api
> npm start

## Restart mongodb (and check status)
> sudo systemctl stop mongod
> sudo systemctl start mongod
> sudo systemctl status mongod

## SendGrid used for email features
SENDGRID_API_KEY defined in .env file (if developpement  .env.local)

## Detected issues

After start server, we receive warning : 

>[nodemon] starting `npx babel-node ./src/server.js`
>Browserslist: caniuse-lite is outdated. Please run:
>npx browserslist@latest --update-db
>
>Why you should do it regularly:
>https://github.com/browserslist/browserslist#browsers-data-updating

To solve it, please use :
> sudo npm i npm-update-all -g
> sudo npm-update-all

npm packages will be updated.

## Detected issue with server after CTRL+Z

When restart command : npm start

E>mitted 'error' event on Server instance at:
    at emitErrorNT (node:net:1357:8)
    at processTicksAndRejections (node:internal/process/task_queues:83:21) {
  code: 'EADDRINUSE',
  errno: -98,
  syscall: 'listen',
  address: '::',
  port: 8080
>}
>[nodemon] app crashed - waiting for file changes before starting...
^Z
[2]+  Stopped                 npm start

Kill the task using related port (in this case 8080)

> greg@greg-820G2:~/Documents/MyauthEx/back-end$ lsof -i TCP:8080 | grep LISTEN
> node    8183 greg   22u  IPv6  76178      0t0  TCP *:http-alt (LISTEN)
> greg@greg-820G2:~/Documents/MyauthEx/back-end$ kill -9 8183
> greg@greg-820G2:~/Documents/MyauthEx/back-end$ lsof -i TCP:8080 | grep LISTEN

  ## 


