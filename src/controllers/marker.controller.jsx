import Marker from '../models/marker';

export const getMarkers = async () => {
  const markers = await Marker.find();
  return markers;
};

export const createMarker = async (marker) => {
  const newMarker = new Marker(marker);
  await newMarker.save();
  return newMarker;
};

export const updateMarker = async (id, marker) => {
  const updatedMarker = await Marker.findByIdAndUpdate(id, marker, {
    new: true,
  });
  return updatedMarker;
};

export const deleteMarker = async (id) => {
  await Marker.findByIdAndRemove(id);
};
