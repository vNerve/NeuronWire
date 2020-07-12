# vNerve NeuronWire JavaScript SDK

Under Heavy Development.

## Build Instruction
 - `git submodule update --init --recursive`
 - `npm install`
 - `npm run build:protobuf`
 - `npm run build`

## TODO:
 - [ ] Fix Info Type
 - [ ] Write Example
 - [ ] Complete API documentation
 - [ ] Publish to npm
 - [ ] Add Test

## Example
Place `script` tag before the end of `body`
```html
<script src="https://cdn.jsdelivr.net/npm/neuronwire@0.0.1/dist/NeuronWire.js"></script>
```
Sample Code:
```javascript
// Create Connector
const connector = new NeuronWire.ClientConnector.StompClientConnector({presetServer:0})
connector.activate() // Connect

// Register Subscriber
const subscriber = new NeuronWire.Exchange.Room.StompRoomExchange(connector)
const roomSubID = subscriber.subscribe('21908196','*',(msg)=>{
    console.log(JSON.stringify(msg)) // <- Get your decoded message here
})

subscriber.unsubscribe(roomSubID) // unsubscribe

```
