  import React from 'react'
  import './Cards.css'
  import { CardsData } from '../../Data/Data'
  import Card from '../Card/Card'
  
  const Cards = () => {
    return (
      <div className="Cards">
        {CardsData.map((card, id) => ( // Make sure the name matches the variable declaration
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
              color={card.color}
              value={card.value} 
            />
          </div>
        ))}
      </div>
    );
  }
  
  export default Cards;