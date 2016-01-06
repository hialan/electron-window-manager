# electron-window-manager
A window manager and message dispatcher for Electron

## Demo & Example

```
npm install
npm start
```

## API Document

### Class: WindowManagerServer

#### new WindowManagerServer(windowDefinition)
* `windowDefinition` (Object), properties:
  * create (Function): 

#### server.open(window_name)
* `window_name` (String): the window name in the definition object

create and open the window process

#### server.close(window_name)
* `window_name` (String): the window name in the definition object

close the window

#### server.isOpened(window_name)
* `window_name` (String): the window name in the definition object

check the window whether is opened.

#### server.registerIPC()

let server listen to the channel 'WindowManager' and register the message handler. 

### Class: WindowManagerClient

#### new WindowManagerClient(window_name, dispatcher)
* `window_name` (String): the window name in the definition object
* `dispatcher` (Functaion): the dispatcher of the receiving message. 
  * `dispatcher(event, arg)` 

#### client.init()

Initial the client, should be called after window rendered. 

This method will do following steps:
* listen to the ipc channel 'WindowManager'
* send 'ready' signal to server

#### client.open(window_name[, args])
* `window_name` (String): the window name in the definition object
* `args` (Object, optional): open the window with initial data

notify server to open window with initial data. 

#### client.close([window_name])
* `window_name` (String, optional): if not provide, it will close current window

notify server to close window. 

#### client.send(window_name, payload)
* `window_name` (String): the window name in the definition object
* `payload` (any): the data / message you want to send

send data/message to the window with `window_name` through server. 

## License

MIT
