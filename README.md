# node-service-template
Microservice starter including a DB, backend server, and frontend.

## Local Development
### Node & NPM
Node `v8.1.3`
NPM `v6.4.1`

### Backend - Database & Server
#### Getting Started
Set your local node environment (you may want to add this to your global environment vars, search the web for how to do that for your particular OS):
```
export NODE_ENV=dev
```
Will be working in the backend directory:
```
cd backend
```
Install dependencies:
```
npm install
```
Initialize your database container:
```
npm run db-init
```
You should now have a  Docker container running your Postgres DB instance inside it on your machine. 
Should you need to tear down this container and instance (**your data will be lost**) run `npm run db-destroy`

Now start your backend server:
```
npm start
```
