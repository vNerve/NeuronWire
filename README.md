# vNerve NeuronWire JavaScript SDK

Under Heavy Development.

## Build Instruction
 - `git submodule update --init --recursive`
 - `npm install`
 - `npm run build:protobuf`
 - `npm run build`

## TODO:
 - [X] Fix Info Type
 - [X] Write Example
 - [ ] Complete API documentation
 - [X] Publish to npm
 - [ ] Add Test

## Example

An SDK example can be found at `dist/example/demo.html` after build the project.

Place `script` tag before the end of `body`
```html
<script src="https://cdn.jsdelivr.net/npm/@vnerve/neuronwire@0.0.2-1/dist/NeuronWire.js"></script>
```
Sample Code:
```javascript
// Create connector
const connector = new NeuronWire.ClientConnector.StompClientConnector({presetServer:0})
connector.activate() // Connect

// Wait for connector to connect
connector.onConnect(()=>{
  // Register subscriber
  const subscriber = new NeuronWire.Exchange.StompRoomExchange(connector)
  const roomSubscription = subscriber.subscribe('21908196','*');
  // Listen event
  const roomEventEmitter = roomSubscription.emitter;
  roomEventEmitter.on('all', (event)=>{
    console.log(event);
  });

  // subscriber.unsubscribe() to unsubscribe
})

```
