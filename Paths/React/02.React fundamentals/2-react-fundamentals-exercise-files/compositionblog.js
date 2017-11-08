/** @jsx React.DOM */

var post = {
    title: 'React v0.5',
    content: 'This release is the result of several months of hard work from members of the team and the community.',
    comments: ['Great work team!','Does not work on my machine.','What is this react?']
};

var Post = React.createClass({
    render: function() {
        return    <div>
                      <h1>{this.props.data.title}</h1>
                      <p>{this.props.data.content}</p>
                      <h2>Comments</h2>
                      
                      <Comment content={this.props.data.comments[0]} />
                      <Comment content={this.props.data.comments[1]} />
                      <Comment content={this.props.data.comments[2]} />
                      
                      {this.props.data.comments.map(function (comment) {
                          return <Comment content={comment} />;
                      })}
                  </div>;
    }
});

var Comment = React.createClass({
    render: function () {
        return <div>{this.props.content}</div>;
    }
});

React.renderComponent(
    <Post data={post} />, 
    document.body
);


