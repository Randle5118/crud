import React, { Component } from 'react';
import classnames from 'classnames'
import { connect } from "react-redux";
import { savePicture, fetchPicture, updatePicture } from "../actions";
import { Redirect } from 'react-router-dom'

class PictureForm extends Component {
  state ={
    //  you have to make a  distinguish when you get a props
    _id : this.props.picture ? this.props.picture._id : null , 
    title : this.props.picture ? this.props.picture.title : '',
    cover : this.props.picture ? this.props.picture.cover : '',
    errors : {},
    // effect => 効果
    // add the lodding effect
    loading : false ,
    done: false
  }



  // beacuse this file is using in 2 Link, you should distinguish the Edit or add 
  componentDidMount(){
    const { match } = this.props;
    if(match.params._id){
      // use  console.log("_id:", match.params._id) to check the distinguish is work
      this.props.fetchPicture(match.params._id); 
    }
  }

  // Receive 接收
  // porps is empty at first , so we should use componentWillReceiveProps to take the state
  componentWillReceiveProps( nextPorps ){
    this.setState({
      _id: nextPorps.picture._id,
      title: nextPorps.picture.title,
      cover: nextPorps.picture.cover
    })
    

  }

  // e is mean event
  // Object.assingn() is same like clone
  handleChange = (e) =>{
    if(!!this.state.errors[e.target.name]){
    //  Use Object.assign() can keep the "this.state.errors" and just change the "errors"
    let errors = Object.assign({}, this.state.errors);
    delete errors[e.target.name];
    this.setState({ 
      [e.target.name]: e.target.value ,
      errors
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
    this.setState( { errors } );

    // Valid => 有效, attributes => 屬性
    // Object.key() can return all attributes
    // if this submit have any error , the "isValid" will not be 0
    const isValid = Object.keys(errors).length === 0

    if(isValid){
      const { _id, title, cover } = this.state;
      this.setState({ loading: true });

      if ( _id ){
        // update is same with save a new data , so we can use same code to wirte
        // update have to add _id to find a data
          this.props.updatePicture({ _id, title, cover }).then(
          () => { this.setState({ done: true })},
          (err) => err.response.json().then(({ errors }) => { this.setState({ errors , loading:false }) })
        )
      }else{
        // if 2 funcation in then , 1st will be true  2st will be falese . 
        // if savePicture is error 
        this.props.savePicture({ title, cover }).then(
          // success
          () => { this.setState({ done: true })},
          // error
          // when error , take the errors from backend , and setStae the errors and turn loading to false 
          (err) => err.response.json().then(({ errors }) => { this.setState({ errors , loading:false }) })
        )
      }
    }
  }

  render() { 
    const form =(
        // onSubmit is let the button useful 
        <form className={ classnames( "ui", "form", { loading: this.state.loading })} onSubmit={ this.handleSubmit }>
          <h1>Add New Picture</h1>

          { !!this.state.errors.global && <div className="ui negative message">{ this.state.errors.global }</div> }

          {/* // "!!" is let "this.state.errors.title" change to boolean
                if "this.state.errors.title" is ture then errors will be use */}
          <div className= { classnames('field',  { error: !!this.state.errors.title })}>
            <label htmlFor="title">Title</label>
            <input 
            type="text" 
            name="title"
            value={ this.state.title }
            onChange={ this.handleChange }
            />
            <span>{ this.state.errors.title }</span>
          </div>
          
          <div className= { classnames('field',  { error : !!this.state.errors.cover  })}>
            <label htmlFor="title">Cover</label>
            <input 
            type="text" 
            name="cover" 
            value={ this.state.cover }
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
    )
    return ( 
      <div>
        { this.state.done ? <Redirect to="/pictures" /> : form  }
      </div>
    );
  }
}


// mapStateToProps can use 2 parameter, 1st state 2st props
const mapStateToProps = ( state, props ) =>{
  const { match } = props
  if(match.params._id){
    return {
      picture: state.pictures.find(item => item._id === match.params._id)
    }
  }
  return { picture: null }
}

 
export default connect(mapStateToProps , { savePicture ,fetchPicture, updatePicture }) (PictureForm);