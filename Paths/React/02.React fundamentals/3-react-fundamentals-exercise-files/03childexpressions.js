/** @jsx React.DOM */

var Hello = React.createClass({
  render: function() {
    return <div>{'Hello ' + this.props.name}</div>;
  }
});

var Goodbye = React.createClass({
  render: function () {
    return <p>{'Goodbye'}</p>;
  }
});

React.renderComponent(
  <div>
    {new Date().getDate() % 2 == 0 
      ? <Hello name="Thomas" /> 
      : <Goodbye />}
  </div>, document.body);


