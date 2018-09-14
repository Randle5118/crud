import React from 'react'
import PropTypes from 'prop-types'
// change the page from card , so you need use "Link"
import { Link } from 'react-router-dom'


const PictureCard = ({ picture }) => {
  return (
    <div className="ui card">
      <div className="image">
        <img src={ picture.cover } alt="Picture_Cover"/>
      </div>
      <div className="content">
        <div className="header">{ picture.title }</div>
      </div>
      <div className="extra content">
        <div className="ui two buttons">
          <Link to={ `/picture/${picture._id}` } className="ui basic button green">Edit</Link>
          <div className="ui basic button red">Delet</div>
        </div>
      </div>
    </div>
  )
}

PictureCard.propTypes = {
  picture: PropTypes.object.isRequired,
}


export default PictureCard;
