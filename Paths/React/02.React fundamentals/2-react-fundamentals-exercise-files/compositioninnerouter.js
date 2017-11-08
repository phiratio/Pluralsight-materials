/** @jsx React.DOM */

var Inner = React.createClass({
    render: function () {
        return <h3>Inner</h3>;
    }
});

var Outer = React.createClass({
    render: function() {
        return    <div>
                      <h2>Outer</h2>
                      <Inner />
                  </div>;
    }
});

React.renderComponent(
    <Outer />, 
    document.body
);


