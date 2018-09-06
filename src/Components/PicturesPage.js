// connectを使ってcomponentとreducerを繋ぐ
// PropTypesは検証用機能

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PicturesList from './PicturesList'

class PicturesPage extends Component {
  render() {
    return (
      <div>
        {/* 下のmapStateToProps内のpictureを導入 */}
        <PicturesList pictures = {this.props.pictures}  />
      </div>
    );
  }
}

PicturesPage.PropTypes ={
  pictures: PropTypes.array.isRequired
}

// connectの一つ目のパラメータはmapStateToProps
const mapStateToProps = (state) =>{
  return {
    pictures: state.pictures
  };
};


export default connect(mapStateToProps)(PicturesPage)