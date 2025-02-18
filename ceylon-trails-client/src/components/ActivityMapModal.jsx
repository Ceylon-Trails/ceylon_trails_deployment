/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultCenter = {
    lat: 7.8731,
    lng: 80.7718,
};

const ActivityMapModal = ({ activityMap, item }) => {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null); 

    useEffect(() => {
        if (mapContainer.current && !mapRef.current) {
            mapRef.current = L.map(mapContainer.current).setView([defaultCenter.lat, defaultCenter.lng], 8);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
        }
       
        if (mapRef.current) {
            const location = item?.locations?.[0]; 

            if (location) {
              
                if (markerRef.current) {
                    mapRef.current.removeLayer(markerRef.current);
                }            
                markerRef.current = L.marker([location.lat, location.lng]).addTo(mapRef.current);            
                mapRef.current.setView([location.lat, location.lng], 8);
            } else {            
                console.error('Location is undefined');
            }
        }
    }, [item]);

    return (
        <dialog ref={activityMap} id="my_modal_4" className="modal backdrop-blur-sm overflow-y-scroll">
            <div className="modal-box w-11/12 max-w-7xl flex-col font-jomhuria text-4xl sm:text-5xl md:text-6xl text-white bg-base-500/30 border-2 border-gray-500 h-[650px]">
                <form method="dialog">
                    <button className="absolute hover:cursor-pointer hover:bg-red-400 border-0 text-lg hover:text-white top-4 right-4 btn font-abhaya">X</button>
                </form>

                <div className="grid gap-4 mb-10  sm:grid-cols-3 mt-5 md:grid-cols-3">
                    <label className="flex text-nowrap justify-center mt-3 text-white text-3xl sm:text-4xl lg:text-6xl font-jomhuria" htmlFor="">
                        {item ? item.name : 'Loading'}
                    </label>
                </div>

                <div id="map"  ref={mapContainer} style={{ height: '400px', width: '100%', margin: 'auto' }}></div>
            </div>
        </dialog>
    );
};

export default ActivityMapModal;
