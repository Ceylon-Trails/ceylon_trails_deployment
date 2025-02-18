import React, { useRef, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapModal = ({ isOpen, onClose, markerPosition, setMarkerPosition }) => {
  const mapRef = useRef(null);

  const DraggableMarker = ({ position, setPosition }) => {
    const markerRef = useRef(null);

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            const newPosition = marker.getLatLng();
            setPosition(newPosition);
          }
        },
      }),
      [setPosition]
    );

    return position ? (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      />
    ) : null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl relative">
          <span className="close absolute top-0 right-0 p-4 cursor-pointer" onClick={onClose}>&times;</span>
          <MapContainer
            center={markerPosition || [0, 0]}
            zoom={2}
            style={{ width: '100%', height: '400px' }}
            ref={mapRef}
            whenCreated={(map) => {
              map.on('click', (e) => {
                setMarkerPosition(e.latlng);
              });
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <DraggableMarker position={markerPosition} setPosition={setMarkerPosition} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
