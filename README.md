# news-service-api

## Service for search news with authentication
Версия 1.0.0 https://github.com/AleksandrHexlet/news-api
IP 84.201.143.93

Domain https://api.news-today.site/
       https://news-today.site/
RUS

Для развертывания проекта локально необходимо:
- скопировать репозиторий;
- выполнить команду npm install,
- запустить mongodb командой mongod,
- запустить сервер npm run start.
Сервер заупускается на http://localhost:3000/
Для выполнения запросов используйте Postman или другую подобную программу:
авторизация
- Необходимо пройти регистрацию. Для регистрации используйте отправку запросов в Postman;
- Необходимо в Postman в закладке authorization выбрать схему Bearer token и вставить токен из файла jwt_secret.env и отправить запрос на localhost:3000//signup для создания пользователя в базе данных
- дальше необходимо отправить запрос на localhost:3000//signin для авторизации.
- далее вам будет присвоен секретный ключ который сохранится в браузере и вам не потребуется вводить логин и пароль при каждом входе;
- после авторизации вы сможете создать нового пользователя отправив запрос localhost:3000//signup
работа с пользователями
- GET /users/me возвращает всех пользователей из базы (email и имя);
- GET /articles возвращает все сохранённые пользователем статьи;
- POST /articles создаёт статью с переданными в теле keyword, title, text, date, source, link и image;
- DELETE /articles/:articleId — удаляет сохранённую статью  по _id;


- POST /signup создаёт пользователя с переданными в теле email, password и name
- POST /signin проверяет переданные в теле почту и пароль и возвращает JWT

