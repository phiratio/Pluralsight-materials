/** @jsx React.DOM */

var First = React.createClass({
  render: function () {
    return <p>1st</p>;
  }
});

var Second = React.createClass({
  render: function () {
    return <p>2nd</p>;
  }
});

var Appender = React.createClass({
  render: function () {
    return <div style={{
      border:'1px solid #999', 
      padding: '10px'}}>{this.props.children}</div>;
  }
});

React.renderComponent(
  <Appender>
    <First />
    <Second />
  </Appender>, document.body);


