import React from 'react'
import PropTypes from 'prop-types'


const PictureCard = ({ picture }) => {
  return (
    <div className="ui card">
      <div className="image">
        <img src={ picture.cover } alt="Picture Cover"/>
      </div>
      <div className="content">
        <div className="header">{ picture.title }</div>
      </div>
    </div>
  )
}

PictureCard.propTypes = {
  picture: PropTypes.object.isRequired,
}


export default PictureCard;