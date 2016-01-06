# electron-window-manager
A window manager and message dispatcher for Electron

## Demo & Example

```
npm install
npm start
```

## API Document

### Class: WindowManagerServer

#### new WindowManagerServer(object windowDefinition)

#### server.open(window_name)
* `window_name` (String): the window name in the definition object

create and open the window process

#### server.close(window_name)
* `window_name` (String): the window name in the definition object

close the window_name

#### server.isOpened(window_name)
* `window_name` (String): the window name in the definition object

#### server.registerIPC()

### Class: WindowManagerClient

#### new WindowManagerClient(window_name, dispatcher)
* `window_name` (String): the window name in the definition object
* `dispatcher` (Functaion): 

#### client.init()

#### client.open(window_name, args)
* `window_name` (String): the window name in the definition object

#### client.close([window_name])
* `window_name` (String, optional): if not provide, it will close current window

#### client.send(window_name, payload)
* `window_name` (String): the window name in the definition object

## License

MIT
