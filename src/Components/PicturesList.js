import React from 'react'
import PropTypes from 'prop-types';

const PictureList = ({ pictures }) => {
  const emptyMessage =(
    <p>There are no Pictures yet here</p>
  )
  const picturesList =(
    <p>Picture List</p>
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