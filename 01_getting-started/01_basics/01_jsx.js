// JSX is pretty much you writing XML in JavaScript. It's a pre processor step

/*  simple example */
const Elem = <h1>Some title</h1>;

// and you can use it in React like so:
<div>
  <Elem />
</div>;

// when it is being processed, it is turned into the following ES5 code:
React.createElement("Elem", null, "Some title");

//first parameter: element name (Elem)
//second parameter: attributes (null, because we don't have any)
//third parameter: element value (Some title)




/*  with attribute example */
const Elem2 = <h1>Some title</h1>;

// usage:
<div>
  <Elem2 title="a title" />
</div>;

// it is turned into the following code:
React.createElement("Elem", { title: "a title" }, "Some title");




/*  multiline example */
// wrap multiple elements in a parenthesis (), like so:
const Elem3 = (
  <div>
    <h1>Some title</h1>
    <div>Some content</div>
  </div>
);

// JSX needs to have one parent

//incorrect:
const Elem4 =
(
  <h1>Some title</h1>
  <div>Some content</div>
)

//correct (wrap your content in a div element):
const Elem5 =
 (
   <div>
     <h1>Some title</h1>
     <div>Some content</div>
   </div>
 )

 //correct: (wrap it in a React.Fragment)
 const Elem6 = 
 (
   <React.Fragment>
     <h1>Some title</h1>
     <div>Some content</div>
   </React.Fragment>
)