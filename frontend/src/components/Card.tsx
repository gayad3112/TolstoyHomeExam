import React from 'react';
import './Card.css';

interface MetadataItem {
  title: string;
  description: string;
  image: string;
}

interface CardProps {
  data: MetadataItem | undefined;
}

const Card: React.FC<CardProps> = ({ data }) => {
  if (!data) return null;
  else if (data.title === '' && data.image === '' && data.description === ''){
    return(
      <div className="card">
      <h1>there was an error fetching the metadata</h1>
      </div>
    )}
  else{
  return (
    <div className="card">
      <h1>{data.title}</h1>
      <img src={data.image} alt={data.title} />
      <p>{data.description}</p>
    </div>
  );
}
};

export default Card;
