## Note Manager

Application for creating small notes, customized to your own liking.

### Work Plan:
1. ~~Basic note CRUD functionality~~
2. ~~Folders~~
3. Drag and drop
4. Colored notes
5. Responsive markup
6. Authentication
7. Synchronization with Google services
8. Links to personal notes for other users
9. Customizable design and layout

### Install:
```
npm install
npm install babel-preset-react
npm install babel-preset-es2015
```

### Run:
```
Frontend:
npm start
Go to localhost:8080

Backend:
(Make sure you have python, pip, virtual_env installed)
create new virtual_env
. <your virtual_env>/bin/activate
pip install -r requirements.txt
cd exampleapp
python manage.py migrate
python manage.py runserver
```

### Tests:
##### All tests:
```
npm test
```
##### Single test:
```
npm test -- FileName.spec.js
```
##### Coverage report:
```
npm run coverage
```

### About
```
Built with: Webpack
Front-end: React, Redux, ES6, Babel
Back-end: Python, Django, SQLite
Tests: Jest, Enzyme
```
