import { useEffect, useState } from 'react';
import './App.css'
import { Form } from './components/Form';
import Card from './components/Card';


function App() {

  const [data, setData] = useState([]);



  const fetchData = async(urls: string[]) => {
    try {
      const response = await fetch('http://localhost:3000/fetch-metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const metadata = await response.json();

      // Extract specific metadata
      const extractedData = metadata.map((item: { [x: string]: any; }) => ({
        title: item['og:title'],
        description: item['og:description'],
        image: item['og:image']
      }));

      setData(extractedData);

    } catch (error) {
      alert('Error fetching metadata, please try again later');
      console.error('Error fetching metadata:', error);
    }
  };
  useEffect(() => {
    console.log("Data updated:", data);
  }, [data]);
  return (
    <div className="app-container">
      <h1>Gaya's Metadata Fetcher</h1>
      <h4>Enter any URL below to fetch it's metadata (minimum 3 URL's)</h4>
        <Form onSubmit={fetchData} />
        <div className="cards-container">
            {data.length > 0 && data.map((item, index) => (
                <Card key={index} data={item} />
            ))}
        </div>
    </div>
);
}

export default App
