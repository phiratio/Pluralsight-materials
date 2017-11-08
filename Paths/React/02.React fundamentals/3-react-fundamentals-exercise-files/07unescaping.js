/** @jsx React.DOM */

var DangerContainer = React.createClass({
  render: function () {
    return <p dangerouslySetInnerHTML={{__html:this.props.dangerous}} />;
  }
});

React.renderComponent(<DangerContainer dangerous="<strong>HELLO</strong>" />, document.body);


