# Socket IO Practice 
This docker project will create a food ordering server that will use socket.io for communication. 

## Echo Testing Route 
This route allows you to emit an event to the server called **echo** along with a message.  In 10 seconds it will emit back an event called **returnEcho**. 

### Emitting the Event
```
 socket.emit("echo", "I know you are, what am I?")
```

### Listening for the Event
```
this.socket.on("returnEcho", (arg1) => {
  alert(arg1);
})
```

## Events you can emit

* **echo** - 1 parameter
* **order** - 2 paramters (phone number, time multiplier)

The time multiplier will make it slower for example, 1 will be 10 seconds while 2 will be a 20 second wait. The phone will be used to distinguish who's order is who's. 
This server does something a little wierd in that it both emits the event back and also broadcasts it to the rest of the connected nodes. 

## Events you can listen to. 

* **returnEcho** - 1 parameter that is the message
* **OrderRecieved** - 1 parameter that is the phone number
* **OrderBeingProcessed** - 1 paramter that is the phone number
* **OrderDone** - 1 parameter that is the phone number
