# electron-window-manager
A window manager and message dispatcher for Electron

## Demo & Example

```
npm install
npm start
```

## API Document

### WindowManagerServer

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

### WindowManagerClient

#### new WindowManagerClient(window_name, dispatcher)
* `window_name` (String): the window name in the definition object
* `dispatcher` (Functaion): 

#### client.init()

#### client.open(window_name, args)

#### client.close([window_name])

#### client.send(window_name, payload)

## License

MIT
