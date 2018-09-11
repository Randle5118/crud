import React, { Component } from 'react';
import classnames from 'classnames';

class PictureForm extends Component {
  state ={
    title : '',
    cover : '',
    errors : {}
  }

  // e is mean event
  // Object.assingn() is same like clone
  handleChange = (e) =>{
    if(!!this.state.errors[e.target.name]){
    //  Use Object.assign() can keep the "this.state.errors" and just change the "errors"
    let errors = Object.assign({}, this.state.errors);
    delete errors[e.target.name];
    this.setState({ 
      [e.target.name]: e.target.value 
    });
    }else{
      this.setState({ 
        [e.target.name]: e.target.value 
      })
    }
  }

  handleSubmit = (e) =>{
    e.preventDefault();

    let errors = {};
    if (this.state.title === '') errors.title = "Title can't be empty"
    if (this.state.cover === '') errors.cover = "Cover can't be empty"
    this.setState( { errors } )
  }

  render() { 
    return ( 
      // onSubmit is let the button useful 
      <form className="ui form" onSubmit={ this.handleSubmit }>
        <h1>Add New Picture</h1>
        {/* // "!!" is let "this.state.errors.title" change to boolean
               if "this.state.errors.title" is ture then errors will be use */}
        <div className= { classnames('field',  { error: !!this.state.errors.title })}>
          <label htmlFor="title">Title</label>
          <input 
          type="text" 
          name="title"
          volue={ this.state.title }
          onChange={ this.handleChange }
          />
          <span>{ this.state.errors.title }</span>
        </div>

        <div className= { classnames('field',  { error : !!this.state.errors.cover  })}>
          <label htmlFor="title">Cover</label>
          <input 
          type="text" 
          name="cover" 
          volue={ this.state.cover }
          onChange={ this.handleChange }
          />
          <span>{ this.state.errors.cover }</span>
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