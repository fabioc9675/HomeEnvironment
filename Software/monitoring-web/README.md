# Getting Started with Web Project

This project was create following the [stack MERN](https://blog.devgenius.io/how-to-get-started-with-the-mern-stack-the-easy-way-b9758fe45956)

## init nodejs app

`npm init --yes`

## Folders:

app: contains react code
models: contains database models
public: contains html and css code coverted from reactjs
routes: contains routing between code

## Modules

### Backend dependencies

- `npm install express` framework for nodejs
- `npm install mongoose` allows to connect withh database
- `npm install dotenv` allows to load environment variables
- `npm install cors` to work with cors
- `npm install nodemon -D` to automatically restart server when the code
- `npm install concurrently` run concurrently server and frontend
- `npm install socket.io` Package to add socket io functionallity

### Frontend dependencies

- `npm install react axios` to connect with server
- `npm install react-router react-router-dom` to use router in Application
- `npm install socket.io-client` Package to add socket io functionallity
- `npm install react-bootstrap bootstrap` use bootstrap components
- `npm install moment` use date time formater
- `npm install react-icons --save` Icons https://react-icons.github.io/react-icons/

## Steps

1. Setting up the Application
2. Setting up the Node Server
3. Creating the Routes
4. Defining the Models
5. Connection to a Database
6. Testing the API
7. Creating the Frontend

## Heroku MERN Deployment

Follow the YouTube video [tutorial](https://www.youtube.com/watch?v=5dQC2JUd27g) and the [GitHub repo](https://github.com/safak/youtube/tree/free-deployment)

### Deploying Full-Stack Apps

1. Create a Heroku app.
2. Change your Node app port to

```
process.env.PORT || <any port number>
```

3. Move your front-end app inside the Node app.
4. Add these codes inside your main JS file in your Node app.

```
app.use(express.static(path.join(__dirname, "/<front end app folder name>/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/<front end app folder name>/build', 'index.html'));
});
```

5. Add this script to your package.json in the Node app.

```
"heroku-postbuild": "cd client && npm install && npm run build"
```

6. Change your API URL in your React app.

7. Set your environment variables on Heroku

8. Run these codes.

```bash
heroku login
```

```bash
git init
```

```bash
heroku git:remote -a <app-name>
```

```bash
git add .
```

```bash
git commit -am "my first commit"
```

```bash
git push heroku master
```
