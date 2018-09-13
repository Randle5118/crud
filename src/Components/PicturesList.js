import React from 'react'
import PropTypes from 'prop-types';
import PictureCard from './PictureCard';

const PictureList = ({ pictures }) => {
  const emptyMessage =(
    <p>There are no Pictures yet here</p>
  )
  const picturesList =(
    <div className="ui four cards">
      { pictures.map( picture => <PictureCard picture ={ picture } key={ picture._id } />) }
    </div>
  )
  return (
    <div>
      { pictures.length === 0 ? emptyMessage : picturesList }
    </div>
  )
}

PictureList.propTypes = {
  pictures: PropTypes.array.isRequired
}

export default PictureList;