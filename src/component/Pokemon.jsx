import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// height , name,species.name,sprites.other.dream_world.font-default -home-official-artwork

function Pokemon({name,height,experience,image1,species}) {

  return (

  <>
    <Card style={{ width: '18rem' }}  className='mt-2' >
      <Card.Img variant="top" src={image1} />
      <Card.Body>
        <Card.Title>Name : {name}</Card.Title>
        <Card.Title>Height : {height}</Card.Title>
        <Card.Title>Experience : {experience}</Card.Title>
        <Card.Title>Species : {species}</Card.Title>
        <Card.Text>
         
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
 </>
 
  )
}

export default Pokemon
