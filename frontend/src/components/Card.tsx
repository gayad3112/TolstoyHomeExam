import React from 'react';

interface MetadataItem {
  title: string;
  description: string;
  image: string;
}

interface CardProps {
  data: MetadataItem | undefined;
}

const Card = ({ data }:CardProps) => {
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
