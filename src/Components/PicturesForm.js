import React, { Component } from 'react';

class PictureForm extends Component {
  state ={
    title : '',
    cover : ''
  }

  // e is mean event
  handleChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) =>{
    e.preventDefault();
  }

  render() { 
    return ( 
      // onSubmit is let the button useful 
      <form className="ui form" onSubmit={ this.handleSubmit }>
        <h1>Add New Picture</h1>

        <div className="field">
          <label htmlFor="title">Title</label>
          <input 
          type="text" 
          name="title"
          volue={ this.state.title }
          onChange={ this.handleChange }
          />
        </div>

        <div className="field">
          <label htmlFor="title">Cover</label>
          <input 
          type="text" 
          name="cover" 
          volue={ this.state.cover }
          onChange={ this.handleChange }
          />
        </div>

        <div className="field">
          { this.state.cover !== '' && <img src={ this.state.cover } alt="cover" className="ui small borderd image"/>}
        </div>

        <div className="field">
          <button className="ui primary button">Save</button>
        </div>
      </form>
    );
  }
}
 
export default PictureForm;