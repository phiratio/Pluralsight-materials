/** @jsx React.DOM */

var Hello = React.createClass({

    render: function() {
        return    <div>
                      <h1>Hello at {this.props.now}</h1>
                  </div>;
    }
});

