/** @jsx React.DOM */

var Timer = React.createClass({
    render: function() {
        return <div style={{display: 'none'}}/>;
    },
    componentDidMount: function () {
        setInterval(this.props.onInterval, this.props.interval);
    }
});
 
React.renderComponent(<Timer onInterval={function () { console.log('tick'); }} interval={1000} />, document.body);
