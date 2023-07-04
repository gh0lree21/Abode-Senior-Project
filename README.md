



# Things for me to remember: 
useEffect order matters!

Will need to update the server/index.js socket, APIRoutes.js urls to run off localhost

Will need to update the .env Mongo_url to go outside of local

[Chat Tutorial Link](https://www.youtube.com/watch?v=otaQKODEUFs&t=11637s)

## Map:

Server:
Every controller has an associated model and route
index.js connects the MongoDB and Socket.io

## Public:

The pages directory contains the different pages for the application. 
The components comprise components within pages used by any of the pages. 
App.js implements the routes (to the pages).
index.js creates the root.

## Heirarchy consists of:
|          |        |       |       |
| -----    | -----  | ----- | ----- |
| index.js |        |       |       |
|          | App.js |       |       | 
|          |        | Chat  |       |
|          |        |       | ChatContainer - from the edge of Contacts component to the right | 
|          |        |       | ChatInput - The bottom part of the chat container |
|          |        |       | Contacts - Left hand contact list |
|          |        |       | Logout - top right logout (power icon) button |
|          |        |       | Welcome - What happens if no chat is selected  |
|          |        | Login  |       |
|          |        | Register |       |
|          |        | SetAvatar  |       |          
            


## utils:

APIRoutes.js is just a storage file for all of the api routes