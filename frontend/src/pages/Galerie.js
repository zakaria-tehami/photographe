import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Galerie.css'

export default function Galerie() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:1337/api/pictures")
            .then((response) => {
                setData(response.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const filteredData = filter
        ? data.filter(image => image.attributes.name.toLowerCase().includes(filter.toLowerCase()))
        : data;

    return (
        <div className='galerie-con'>
            <h1>Ma galerie photos</h1>
            <select className="filter-select" onChange={handleFilterChange} value={filter || ""}>
                <option value="">Tous</option>
                <option value="Mariage">Mariage</option>
                <option value="Grossesse">Grossesse</option>
                <option value="Bébé">Bébé</option>
                <option value="Famille">Famille</option>
                <option value="Couple">Couple</option>
                <option value="Baptême">Baptême</option>
            </select>
            <div className="galerie">
                {filteredData.map((image) => (
                    <div key={image.id} className="menuItem">
                        <h1 className='menuTitle'>{image.attributes.name}</h1>
                        {image.attributes.link && (
                            <img src={image.attributes.link} alt={image.attributes.name} className="image-class"/>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
