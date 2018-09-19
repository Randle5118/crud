// use PictureFormPage to cover PicturesForm and cut the code value in PicturesForm
// code refactoring 重構
// Refactoring the code to let the code can be read . 

import React, { Component } from 'react'
import { connect } from "react-redux";
import { savePicture, fetchPicture, updatePicture } from "../actions";
import { Redirect } from 'react-router-dom'
import PictureForm from './PicturesForm';



class PictureFormPage extends Component {
    state = {
        redirect: false ,
    }

  // beacuse this file is using in 2 Link, you should distinguish the Edit or add 
  componentDidMount(){
    const { match } = this.props;
    if(match.params._id){
      // use  console.log("_id:", match.params._id) to check the distinguish is work
      this.props.fetchPicture(match.params._id); 
    }
  }

  savePicture = ({ _id, title , cover }) => {
    if ( _id ){
        // update is same with save a new data , so we can use same code to wirte
        // update have to add _id to find a data
          return this.props.updatePicture({ _id, title, cover }).then(
          () => { this.setState({ redirect: true })},
          
        )
      }else{
        // if 2 funcation in then , 1st will be true  2st will be falese . 
        // if savePicture is error 
        return this.props.savePicture({ title, cover }).then(
          // success
          () => { this.setState({ redirect: true })},
          // error
          // when error , take the errors from backend , and setStae the errors and turn loading to false 
          (err) => err.response.json().then(({ errors }) => { this.setState({ errors , loading:false }) })
        )
      }
  }
    
    render() {
        return (
            <div>
                {
                    this.state.redirect ?
                    <Redirect to ="/pictures" /> :
                    <PictureForm 
                        savePicture = { this.savePicture }
                        picture = { this.props.picture }
                    />
                }
            </div>
        )
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
  
   
  export default connect(mapStateToProps , { savePicture ,fetchPicture, updatePicture })(PictureFormPage)