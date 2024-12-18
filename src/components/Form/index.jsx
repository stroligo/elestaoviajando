import { useState } from 'react';
import { Button } from '../ui/Button';

export function Form() {
  const [trip, setTrip] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState([]);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      trip,
      city,
      country,
      date,
      thumbnail,
      tags,
      lat,
      lng,
      images,
      description,
    });

    // Limpar os estados dos inputs
    setTrip('');
    setCity('');
    setCountry('');
    setDate('');
    setThumbnail('');
    setTags([]);
    setLat('');
    setLng('');
    setImages([]);
    setDescription('');

    // Exibir um alerta para confirmar o envio
    alert('Dados enviados com sucesso!');
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file.type.startsWith('image/jpeg')) {
      setThumbnail(file);
    } else {
      alert('Por favor, selecione apenas arquivos JPG');
    }
  };

  const handleImagesChange = (event) => {
    const files = event.target.files;
    const newImages = Array.from(files).map((file) => file);
    setImages([...images, ...newImages]);
  };

  const handleTagChange = (event) => {
    const newTag = event.target.value.trim();
    if (newTag !== '') {
      setTags([...tags, newTag]);
      event.target.value = '';
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleTagChange(event);
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className="flex gap-6 md:flex-row flex-col w-full pb-10">
      <form
        onSubmit={handleSubmit}
        className="bg-beige rounded-lg p-5 w-full md:w-6/12"
      >
        <div className="flex mb-4 gap-4">
          <label htmlFor="trip">Trip:</label>
          <input
            type="text"
            id="trip"
            name="trip"
            value={trip}
            onChange={(event) => setTrip(event.target.value)}
          />
        </div>
        <div className="flex mb-4 gap-4">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
        <div className="flex mb-4 gap-4">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          />
        </div>
        <div className="flex mb-4 gap-4">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div className="flex mb-4 gap-4">
          <label htmlFor="thumbnail">Thumbnail:</label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            onChange={handleThumbnailChange}
          />
        </div>
        <div className="flex mb-4 gap-4">
          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={tags.join(', ')}
            onChange={(event) => setTags(event.target.value.split(','))}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex mb-4 gap-4">
            <label htmlFor="lat">Latitude:</label>
            <input
              type="number"
              id="lat"
              name="lat"
              value={lat}
              onChange={(event) => setLat(event.target.value)}
            />
          </div>
          <div className="flex mb-4 gap-4">
            <label htmlFor="lng">Longitude:</label>
            <input
              type="number"
              id="lng"
              name="lng"
              value={lng}
              onChange={(event) => setLng(event.target.value)}
            />
          </div>
        </div>
        <div className="flex mb-4 gap-4">
          <label htmlFor="images">Images:</label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleImagesChange}
          />
        </div>
        <div className="flex mb-4 gap-4">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="flex justify-end items-end">
          <Button type="submit">Salvar</Button>
        </div>
      </form>
      <div className="md:w-6/12 p-5">
        <di>Trip: {trip}</di>
        <div>Cidade: {city}</div>
        <div>País: {country}</div>
        <div>Data: {date}</div>
        {thumbnail && (
          <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail" />
        )}
        <div>Tags: {tags.join(', ')}</div>
        <div>Latitude: {lat}</div>
        <div>Longitude: {lng}</div>
        <div>Images:</div>
        <ul>
          {images.map((image, index) => (
            <li key={index}>{image.name}</li>
          ))}
        </ul>
        <div>Description:</div>
        <div>{description}</div>
      </div>
    </div>
  );
}
