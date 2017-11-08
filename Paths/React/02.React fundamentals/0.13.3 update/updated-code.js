// https://jsfiddle.net/69z2wepo/9511/

var Hello = React.createClass({
    render: function() {
        return    <div>
                      <h1>Hello at {this.props.now}</h1>
                  </div>;
    }
});

React.render(
    <Hello now={new Date().toString()} />, 
    document.body
);

// https://jsfiddle.net/69z2wepo/9516/

var Hello = React.createClass({
    render: function() {
        return    <div>
                      <h1>Hello at {this.props.now}{' '}{this.props.b}</h1>
                  </div>;
    }
});

React.render(
    <Hello now={new Date().toString()} b="7" />, 
    document.body
);

// https://jsfiddle.net/69z2wepo/9513/

var post = {
    title: 'React v0.5',
    content: 'This release is the result of several months of hard work from members of the team and the community.',
    comments: ['Great work team!','Does not work on my machine.','What is this react?']
};

var Post = React.createClass({
    render: function() {
        return (   
    <div>
      <h1>{this.props.data.title}</h1>
      <p>{this.props.data.content}</p>
      <h2>Comments</h2>
      
      <Comment content={this.props.data.comments[0]} />
      <Comment content={this.props.data.comments[1]} />
      <Comment content={this.props.data.comments[2]} />
  </div>);
    }
});

var Comment = React.createClass({
    render: function () {
        return <div>{this.props.content}</div>;
    }
});

React.render(
    <Post data={post} />, 
    document.body
);

// https://jsfiddle.net/69z2wepo/9519/

var Count = React.createClass({
    getInitialState: function () {
        return {counter: 1};
    },
    render: function() {
        return    <div>
                      <h1>Counter</h1>
                      <p>{this.state.counter}</p>
                  </div>;
    }
});

React.render(
    <Count />, 
    document.body
);

// https://jsfiddle.net/69z2wepo/9524/

var Count = React.createClass({
    getInitialState: function () {
        var state = {counter: 1};
        setInterval(function () {
            this.setState({counter: this.state.counter + 1});
        }.bind(this), 1000);
        return state;
    },
    render: function() {
        return    <div>
                      <h1>Counter</h1>
                      <CountDisplay counter={this.state.counter} />
                  </div>;
    }
});

var CountDisplay = React.createClass({
    render: function () {
        return <p>{this.props.counter}</p>
    }
});

React.render(
    <Count />, 
    document.body
);

// http://jsfiddle.net/69z2wepo/9525/

var Text = React.createClass({
    getDefaultProps: function () {
        return {
            foregroundColor: 'green',
            backgroundColor: 'red'
        };
    },
    render: function() {
        var styles = {
            color: this.props.foregroundColor,
            backgroundColor: this.props.backgroundColor
        };
        return <p style={styles} >{this.props.content}</p>;
    }
});

React.render(<Text content="Once upon a time..." />, document.body);

// http://jsfiddle.net/69z2wepo/9529/

var Hello = React.createClass({
    propTypes: {
        now: React.PropTypes.string.isRequired,
        b: function(props, propName, componentName) {
            if (props[propName] < 5) {
                return new Error(propName + 
                    " must be 5 or greater");
            }
        }
    },
    render: function() {
        return    <div>
                      <h1>
                          Hello at {this.props.now}{' '}
                          {this.props.b}
                      </h1>
                  </div>;
    }
});

React.render(
    <Hello now={new Date().toString()} b={7} />, 
    document.body
);

// http://jsfiddle.net/69z2wepo/9532/

var Highlight = {
    componentDidUpdate: function () { 
        var node = $(React.findDOMNode(this));
        node.slideUp();
        node.slideDown();
    }
};

var Count = React.createClass({
    getInitialState: function () {
        var state = {counter: 1};
        setInterval(function () {
            this.setState({counter: this.state.counter + 1});
        }.bind(this), 4000);
        return state;
    },
    render: function() {
        return    <div>
                      <h1>Counter</h1>
                      <p>{this.state.counter}</p>
                  </div>;
    },
    mixins: [Highlight]    
});

React.render(
    <Count />, 
    document.body
);

// http://jsfiddle.net/69z2wepo/10289/

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

React.render(
  <div>
    {new Date().getDate() % 2 == 0 
      ? <Hello name="Thomas" /> 
      : <Goodbye />}
  </div>, document.body);

// http://jsfiddle.net/69z2wepo/10290/

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
    return <div className="appender">{this.props.children}</div>;
  }
});

React.render(
  <Appender>
    <First />
    <Second />
  </Appender>, document.body);

// http://jsfiddle.net/69z2wepo/10291/

React.render(
  <div>
    {"Bob"} {"Alice"}<br/>
    {"Bob"}{" " + "Alice"}<br/>
    {"Bob" + " " + "Alice"}<br/>
    {"Bob"}{" "}{"Alice"}
  </div>, document.body);

// http://jsfiddle.net/69z2wepo/10292/

var DangerContainer = React.createClass({
  render: function () {
    return <p dangerouslySetInnerHTML={{__html: this.props.dangerous}}></p>;
  }
});

React.render(<DangerContainer dangerous="<strong>HELLO</strong>" />, document.body);

// http://jsfiddle.net/69z2wepo/10296/

var Timer = React.createClass({
    render: function() {
        return <div style={{display: 'none'}}/>;
    },
    componentDidMount: function () {
        setInterval(this.props.onInterval, this.props.interval);
    }
});
 
React.render(<Timer onInterval={function () { console.log('tick'); }} interval={1000} />, document.body);

// http://jsfiddle.net/69z2wepo/10297/

var ControlledComponent = React.createClass({
    render: function() {
        return <input type="text" value="init" />;
    }
});
 
React.render(<ControlledComponent />, document.body);

// http://jsfiddle.net/69z2wepo/10299/

var ControlledComponent = React.createClass({
    getInitialState: function () {
        return {init:'init'};
    },
    render: function() {
        return <input type="text" value={this.state.init} 
                 onChange={this.handleChange} />;
    },
    handleChange: function (e) {
        this.setState({ init: e.target.value} );
    }
});
 
React.render(<ControlledComponent />, document.body);

// http://jsfiddle.net/69z2wepo/10333/

var UncontrolledComponent = React.createClass({
    render: function() {
        return <input type="text"
                 onChange={this.handleChange} />;
    },
    handleChange: function (e) {
        console.log(e.target.value);
    }
});
 
React.render(<UncontrolledComponent />, document.body);

// http://jsfiddle.net/69z2wepo/10334/

var RefTest = React.createClass({
    render: function() {
        return <input type="text" ref="inp"
                 onChange={this.handleChange} />;
    },
    componentDidMount: function () {
        React.findDOMNode(this.refs.inp).value = "set by ref";        
    }
});
 
React.render(<RefTest />, document.body);

// http://jsfiddle.net/69z2wepo/10335/

var RefTest = React.createClass({
    render: function() {
        return <div><input type="text" ref="first" /><br/>
        <input type="text" ref="second" /><br/>
        <input type="button" value="Add" onClick={this.handleAdd} /></div>;
    },
    handleAdd: function () {
        alert(parseFloat(this.refs.first.getDOMNode().value) + parseFloat(React.findDOMNode(this.refs.second).value));
    }
});
 
React.render(<RefTest />, document.body);

// http://jsfiddle.net/69z2wepo/10376/  

var GetDOMNodeTest = React.createClass({
    render: function() {
        return <input ref="inp" type="text" onChange={this.handleChange} />;
    },
    handleChange: function () {
       console.log(React.findDOMNode(this.refs.inp).value);
    }
});
 
React.render(<GetDOMNodeTest />, document.body);
