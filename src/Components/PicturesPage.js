// connectを使ってcomponentとreducerを繋ぐ
// PropTypesは検証用機能
// fetchPicturesをactionからimport

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PicturesList from './PicturesList'
import { fetchPictures, deletePicture } from '../actions'

class PicturesPage extends Component {
  // dataの引渡しで componentDidMountというライフサイクルをつかう
  // componentDidMount はこのコンポーネントがrenderするときに実行する
  componentDidMount = () => {
    // fetchPictures は actionから導入
    this.props.fetchPictures()
  }
  
  render() {
    return (
      <div>
        {/* 下のmapStateToProps内のpictureを導入 */}
        <PicturesList pictures = {this.props.pictures} deletePicture= { this.props.deletePicture } />
      </div>
    );
  }
}

PicturesPage.propTypes ={
  pictures: PropTypes.array.isRequired,
  fetchPictures: PropTypes.func.isRequired,
  deletePicture: PropTypes.func.isRequired,
}

// connectの一つ目のパラメータはmapStateToProps
const mapStateToProps = (state) =>{
  return {
    pictures: state.pictures,
  };
};


// 第二の関数はfetchPicturesを入れる  
export default connect(mapStateToProps, { fetchPictures, deletePicture })(PicturesPage)