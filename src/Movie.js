import React from 'react';
import star from ".//img/star.png"
import deleteImage from ".//img/delete.png"
import './/movie.css'

export default function Movie(props) {
  const { title, grade } = props.item;

  // Generate star images based on the grade
  const stars = [];
  for (let i = 0; i < grade; i++) {
    stars.push(<img key={i} src={star} alt="Star" className='star-image'/>);
  }

  return (
    <div>
      <li className="list-group-item">
        {title}  <span>{stars}<img src={deleteImage} className='deleteImg' onClick={() => {props.deleteItem(props.item.id)}}></img></span>
      </li>
    </div>
  );
}
