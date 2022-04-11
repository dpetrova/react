/* Redux */

//Redux is about two things
// - Managing a global data store also called state management
// - Promoting a uniform data flow

/* 1. State management */

//A state in our app can exist inside a component but also in a global object.
//Typically state that is only needed in one component should stay there.
//State that is used by more than one component is usually put in a global store.
//Another thing we need to think about is that at some point the state needs to be saved down, that's usually done by using performing an AJAX call towards an endpoint.

//When using a state management pattern here are the concerns:
// - what should go in there
// - how do we ensure that all components are in agreement what the state is
// - how do we ensure that state changes happen in the right order, some changes are synchronous and some are asynchronous

/* 2. Unidirectional data flow */

//A unidirectional data flow is about ensuring that data only flows in one direction.

//Let's try the following example:
//We have two components, one create component and one list component.
//When an item is created in the create component we want this information to reach the list component.
//We don't want them to talk directly but rather indirectly.
//We usually solve that by using a pub-sub, publish-subscribe pattern

//We have our scenario and we are trying to define what should happen in what order:
// - user interaction: user enters values for a new item and presses a save button
// - the values are captured into a message and is being passed on, dispatched
// - a central store processes the message that leads to a change of its internal state
// - central store then communicates out to all its listeners that the internal state has changed, one such listener is our list component

//What about other scenarios such as fetching initial data to our list component? In this case we might have the following flow:
// - list component asks for data from the central store by sending it a message
// - central store in turn sends a message that leads to the data being fetched from an endpoint via AJAX
// - when the data arrives the state of the central store is changed and an event is emitted that a listener, in this case the list component is listening to

//As you can see we communicate with messages that ends up being interpreted and leads to a change of the state of our internal store.
//That change is broadcasted to a listener/s and the UI gets updated
