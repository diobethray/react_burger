# Burger App | React | Redux | Firebase
Demo app demonstrating the React ecosystem + Redux + Webpack + Firebase and more...
- Bootstraped using [Create React App](https://github.com/facebook/create-react-app).
- Uses [Firebase](http://firebase.google.com) as the database.

## First thing

```
npm install
```

## Setup Firebase
Create a [Realtime Database](https://firebase.google.com/docs/database/) on Firebase and create an **ingredients** data like this:

```
ingredients
├── bacon: 0
├── cheese: 0
├── meat: 0
├── salad: 0
```

Copy the database url endpoint (e.g. https://....firebaseio.com/) and paste it on **FIREBASE_URL** under _src/store/firebase/firebase.js_.

Get your **Web API Key** from your firebase project settings as well and put it on **FIREBASE_KEY**.

Finally, run **npm start** and see if works!
```
npm start
```
