import React, { useEffect, useState } from 'react'
import './NewCollections.css'

import Item from '../Items/Item'

const NewCollections = () => {
  const [new_collections,setNew_collections]=useState([])
useEffect(() => {
  fetch('https://e-commerce-website-backend-f5sh.onrender.com/newcollections')
    .then((response) => response.json()) 
    .then((data) => setNew_collections(data))
    .catch((error) => console.error("Error fetching collections:", error));
}, []);

  return (
    <div className='new-collections'>
        <h1>New Collections</h1>
        <hr/>
        <div className="collections">
            {new_collections.map((item,i)=>{
                 return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
      
    </div>
  )
}

export default NewCollections
