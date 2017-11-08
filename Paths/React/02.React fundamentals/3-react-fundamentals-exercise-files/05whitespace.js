/** @jsx React.DOM */

React.renderComponent(
  <div>
    {"Bob"} {"Alice"}<br/>
    {"Bob"}{" " + "Alice"}<br/>
    {"Bob" + " " + "Alice"}<br/>
    {"Bob"}{" "}{"Alice"}
  </div>, document.body);


