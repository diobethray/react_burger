# Burger App | React | Redux | Firebase
Demo app demonstrating the React ecosystem + Redux + Webpack + Firebase and more...
- Bootstraped using [Create React App](https://github.com/facebook/create-react-app).
- Uses [Firebase](http://firebase.google.com) as the database.

Live Demo: https://react-my-burger-19e9c.firebaseapp.com/burger-builder

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

## Troubleshoot
If you encounter an error upon running
```
TypeError: composeEnhancers is not a function
```
Please add an extension on your Chrome browser called [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
It was being used to debug **Redux** data and state

If at first run you got this error:
```
Ingredients can't be loaded!
```
It means you haven't put your **FIREBASE_URL** and **FIREBASE_KEY** yet mentioned above. Please do so.
