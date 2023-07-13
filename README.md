



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

## Colors
#686868 - GREY
#010101 - BLACK
#1FC742 - GREEEN
#025B18 - CAMO GREEN
#023612 - DARK GREEN
#39FF14 - NEON GREEN
#100C08 - SMOKY BLACK (CHAT CONTAINER)
#000000 - BLACK (BACKGROUND)
#1B1B1B - EERIE BLACK (RECEIVED MESSAGES)
#343434 - JET BLACK (SENT MESSAGES)
#F2F3F4 - ANTI-FLASH WHITE
#ACE1AF - CELADON
#9F8170 - BEAVER
#1A1110 - LICORICE
## Logo
https://app.logo.com/dashboard/logo_1000a7b9-4e84-4470-a0a3-22697917f14f/your-logo-files

## Contact Book Icon
* <a href="https://www.flaticon.com/free-icons/address-book" title="address book icons">Address book icons created by Smashicons - Flaticon</a>

## Future development:

* Refactor so that state is available to update dynamically instead of needing to refresh to see changes to contacts. --> Could redirect to the welcome page once a contact has been added?
* Handling needs to be implemented for a user to send a message to a newly added contact who doesn't have the user added as a contact. 
* Make "Add" button stationary about (10 rem below search bar) in the AddContact component. 
* Fix toast notification exit button (search for button and see where a class should be used to eliminate inheritance of button size).