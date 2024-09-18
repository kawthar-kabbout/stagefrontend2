import React, { useState } from 'react';
import '../css/AddRestaurant.css';

function AddRestaurant() {
    const [formData, setFormData] = useState({
        idRes: '',
        nom: '',
        localisation: '',
        note: 0, // Initialiser la note à 0
        telephone: '',
        nbReviews: 0, // Initialiser nbReviews à 0
        livraison: '',
        img1: '',
        img2: '',
        img3: '',
        img4: '',
        img5: '',
        categorie: [], // Ajouter la propriété categorie
        facebookUrl: '', // Ajouter facebookUrl
        instagramUrl: '' // Ajouter instagramUrl
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData((prevData) => {
                const updatedCategories = checked
                    ? [...prevData.categorie, value]
                    : prevData.categorie.filter((cat) => cat !== value);
                return {
                    ...prevData,
                    categorie: updatedCategories,
                };
            });
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const validateForm = () => {
        for (let key in formData) {
            if (formData[key] === '' || (Array.isArray(formData[key]) && formData[key].length === 0)) {
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate form fields
        if (!validateForm()) {
            setMessage('Tous les champs requis ne sont pas renseignés');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:3000/api/add-restaurant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Restaurant ajouté avec succès!', data);
                setMessage('Restaurant ajouté avec succès!');
                setFormData({
                    idRes: '',
                    nom: '',
                    localisation: '',
                    note: 0,
                    telephone: '',
                    nbReviews: 0,
                    livraison: '',
                    img1: '',
                    img2: '',
                    img3: '',
                    img4: '',
                    img5: '',
                    categorie: [],
                    facebookUrl: '',
                    instagramUrl: ''
                });
            } else {
                const errorData = await response.json();
                console.error('Erreur côté serveur:', errorData.error);
                setMessage(errorData.error);
            }
        } catch (error) {
            console.error('Erreur lors de la requête fetch:', error);
            setMessage('Erreur lors de l\'ajout du restaurant. Veuillez réessayer.');
        }
    };

    return (
        <>
            <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2rem' }}>Ajouter un restaurant</h1>
            {message && <p style={{ textAlign: 'center', color: message.includes('succès') ? 'green' : 'red' }}>{message}</p>}
            <form onSubmit={handleSubmit} className="form-container">
                <label htmlFor="idRes">ID du restaurant:</label>
                <input 
                    type="text"
                    id="idRes"
                    name="idRes"
                    value={formData.idRes}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="nom">Nom du restaurant:</label>
                <input 
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="localisation">Localisation:</label>
                <input 
                    type="text"
                    id="localisation"
                    name="localisation"
                    value={formData.localisation}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="telephone">Téléphone:</label>
                <input 
                    type="text"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                />
                <br />

                <fieldset>
                    <legend>Livraison à domicile:</legend>
                    <div>
                        <input
                            type="radio"
                            id="livraison-oui"
                            name="livraison"
                            value="oui"
                            checked={formData.livraison === 'oui'}
                            onChange={handleChange}
                        />
                        <label htmlFor="livraison-oui">Oui</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="livraison-non"
                            name="livraison"
                            value="non"
                            checked={formData.livraison === 'non'}
                            onChange={handleChange}
                        />
                        <label htmlFor="livraison-non">Non</label>
                    </div>
                </fieldset>

                <label htmlFor="img1">URL de l'image 1:</label>
                <input 
                    type="text"
                    id="img1"
                    name="img1"
                    value={formData.img1}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="img2">URL de l'image 2:</label>
                <input 
                    type="text"
                    id="img2"
                    name="img2"
                    value={formData.img2}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="img3">URL de l'image 3:</label>
                <input 
                    type="text"
                    id="img3"
                    name="img3"
                    value={formData.img3}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="img4">URL de l'image 4:</label>
                <input 
                    type="text"
                    id="img4"
                    name="img4"
                    value={formData.img4}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="img5">URL de l'image 5:</label>
                <input 
                    type="text"
                    id="img5"
                    name="img5"
                    value={formData.img5}
                    onChange={handleChange}
                    required
                />
                <br />

                <fieldset>
                    <legend>Catégorie:</legend>
                    <div className="uv-checkbox-wrapper">
                        <input
                            type="checkbox"
                            id="fast-food"
                            className="uv-checkbox"
                            name="categorie"
                            value="fast food"
                            checked={formData.categorie.includes('fast food')}
                            onChange={handleChange}
                        />
                        <label htmlFor="fast-food" className="uv-checkbox-label">
                            <div className="uv-checkbox-icon">
                                <svg viewBox="0 0 24 24" className="uv-checkmark">
                                    <path d="M4.1,12.7 9,17.6 20.3,6.3" fill="none"></path>
                                </svg>
                            </div>
                            <span className="uv-checkbox-text">Fast Food</span>
                        </label>
                    </div>
                    <div className="uv-checkbox-wrapper">
                        <input
                            type="checkbox"
                            id="brunch"
                            className="uv-checkbox"
                            name="categorie"
                            value="brunch"
                            checked={formData.categorie.includes('brunch')}
                            onChange={handleChange}
                        />
                        <label htmlFor="brunch" className="uv-checkbox-label">
                            <div className="uv-checkbox-icon">
                                <svg viewBox="0 0 24 24" className="uv-checkmark">
                                    <path d="M4.1,12.7 9,17.6 20.3,6.3" fill="none"></path>
                                </svg>
                            </div>
                            <span className="uv-checkbox-text">Brunch</span>
                        </label>
                    </div>
                    <div className="uv-checkbox-wrapper">
                        <input
                            type="checkbox"
                            id="buffet"
                            className="uv-checkbox"
                            name="categorie"
                            value="buffet"
                            checked={formData.categorie.includes('buffet')}
                            onChange={handleChange}
                        />
                        <label htmlFor="buffet" className="uv-checkbox-label">
                            <div className="uv-checkbox-icon">
                                <svg viewBox="0 0 24 24" className="uv-checkmark">
                                    <path d="M4.1,12.7 9,17.6 20.3,6.3" fill="none"></path>
                                </svg>
                            </div>
                            <span className="uv-checkbox-text">Buffet</span>
                        </label>
                    </div>
                    <div className="uv-checkbox-wrapper">
                        <input
                            type="checkbox"
                            id="repas léger"
                            className="uv-checkbox"
                            name="categorie"
                            value="repas léger"
                            checked={formData.categorie.includes('repas léger')}
                            onChange={handleChange}
                        />
                        <label htmlFor="repas léger" className="uv-checkbox-label">
                            <div className="uv-checkbox-icon">
                                <svg viewBox="0 0 24 24" className="uv-checkmark">
                                    <path d="M4.1,12.7 9,17.6 20.3,6.3" fill="none"></path>
                                </svg>
                            </div>
                            <span className="uv-checkbox-text">Repas léger</span>
                        </label>
                    </div>
                    <div className="uv-checkbox-wrapper">
                        <input
                            type="checkbox"
                            id="café"
                            className="uv-checkbox"
                            name="categorie"
                            value="café"
                            checked={formData.categorie.includes('café')}
                            onChange={handleChange}
                        />
                        <label htmlFor="café" className="uv-checkbox-label">
                            <div className="uv-checkbox-icon">
                                <svg viewBox="0 0 24 24" className="uv-checkmark">
                                    <path d="M4.1,12.7 9,17.6 20.3,6.3" fill="none"></path>
                                </svg>
                            </div>
                            <span className="uv-checkbox-text">Café</span>
                        </label>
                    </div>
                    <div className="uv-checkbox-wrapper">
                        <input
                            type="checkbox"
                            id="Pitzza"
                            className="uv-checkbox"
                            name="categorie"
                            value="Pitzza"
                            checked={formData.categorie.includes('Pitzza')}
                            onChange={handleChange}
                        />
                        <label htmlFor="Pitzza" className="uv-checkbox-label">
                            <div className="uv-checkbox-icon">
                                <svg viewBox="0 0 24 24" className="uv-checkmark">
                                    <path d="M4.1,12.7 9,17.6 20.3,6.3" fill="none"></path>
                                </svg>
                            </div>
                            <span className="uv-checkbox-text">Pitzza</span>
                        </label>
                    </div>
                    
                    <div className="uv-checkbox-wrapper">
    <input
        type="checkbox"
        id="Burger"
        className="uv-checkbox"
        name="categorie"
        value="Burger"
        checked={formData.categorie.includes('Burger')}
        onChange={handleChange}
    />
    <label htmlFor="Burger" className="uv-checkbox-label">
        <div className="uv-checkbox-icon">
            <svg viewBox="0 0 24 24" className="uv-checkmark">
                <path d="M4.1,12.7 9,17.6 20.3,6.3" fill="none"></path>
            </svg>
        </div>
        <span className="uv-checkbox-text">Burger</span>
    </label>
</div>
<div className="uv-checkbox-wrapper">
    <input
        type="checkbox"
        id="Sushi"
        className="uv-checkbox"
        name="categorie"
        value="Sushi"
        checked={formData.categorie.includes('Sushi')}
        onChange={handleChange}
    />
    <label htmlFor="Sushi" className="uv-checkbox-label">
        <div className="uv-checkbox-icon">
            <svg viewBox="0 0 24 24" className="uv-checkmark">
                <path d="M4.1,12.7 9,17.6 20.3,6.3" fill="none"></path>
            </svg>
        </div>
        <span className="uv-checkbox-text">Sushi</span>
    </label>
</div>
<div className="uv-checkbox-wrapper">
    <input
        type="checkbox"
        id="Pates"
        className="uv-checkbox"
        name="categorie"
        value="Pates"
        checked={formData.categorie.includes('Pates')}
        onChange={handleChange}
    />
    <label htmlFor="Pates" className="uv-checkbox-label">
        <div className="uv-checkbox-icon">
            <svg viewBox="0 0 24 24" className="uv-checkmark">
                <path d="M4.1,12.7 9,17.6 20.3,6.3" fill="none"></path>
            </svg>
        </div>
        <span className="uv-checkbox-text">Pâtes</span>
    </label>
</div>
<div className="uv-checkbox-wrapper">
    <input
        type="checkbox"
        id="Vegetarien"
        className="uv-checkbox"
        name="categorie"
        value="Vegetarien"
        checked={formData.categorie.includes('Vegetarien')}
        onChange={handleChange}
    />
    <label htmlFor="Vegetarien" className="uv-checkbox-label">
        <div className="uv-checkbox-icon">
            <svg viewBox="0 0 24 24" className="uv-checkmark">
                <path d="M4.1,12.7 9,17.6 20.3,6.3" fill="none"></path>
            </svg>
        </div>
        <span className="uv-checkbox-text">Végétarien</span>
    </label>
</div>
<div className="uv-checkbox-wrapper">
    <input
        type="checkbox"
        id="Dessert"
        className="uv-checkbox"
        name="categorie"
        value="Dessert"
        checked={formData.categorie.includes('Dessert')}
        onChange={handleChange}
    />
    <label htmlFor="Dessert" className="uv-checkbox-label">
        <div className="uv-checkbox-icon">
            <svg viewBox="0 0 24 24" className="uv-checkmark">
                <path d="M4.1,12.7 9,17.6 20.3,6.3" fill="none"></path>
            </svg>
        </div>
        <span className="uv-checkbox-text">Dessert</span>
    </label>
</div>
<div className="uv-checkbox-wrapper">
    <input
        type="checkbox"
        id="Gateau"
        className="uv-checkbox"
        name="categorie"
        value="Gateau"
        checked={formData.categorie.includes('Gateau')}
        onChange={handleChange}
    />
    <label htmlFor="Gateau" className="uv-checkbox-label">
        <div className="uv-checkbox-icon">
            <svg viewBox="0 0 24 24" className="uv-checkmark">
                <path d="M4.1,12.7 9,17.6 20.3,6.3" fill="none"></path>
            </svg>
        </div>
        <span className="uv-checkbox-text">Gâteau</span>
    </label>
</div>
<div className="uv-checkbox-wrapper">
    <input
        type="checkbox"
        id="Fruits-de-Mer"
        className="uv-checkbox"
        name="categorie"
        value="Fruits de Mer"
        checked={formData.categorie.includes('Fruits de Mer')}
        onChange={handleChange}
    />
    <label htmlFor="Fruits-de-Mer" className="uv-checkbox-label">
        <div className="uv-checkbox-icon">
            <svg viewBox="0 0 24 24" className="uv-checkmark">
                <path d="M4.1,12.7 9,17.6 20.3,6.3" fill="none"></path>
            </svg>
        </div>
        <span className="uv-checkbox-text">Fruits de Mer</span>
    </label>
</div>

                </fieldset>


                <label htmlFor="facebookUrl">URL Facebook:</label>
                <input 
                    type="text"
                    id="facebookUrl"
                    name="facebookUrl"
                    value={formData.facebookUrl}
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="instagramUrl">URL Instagram:</label>
                <input 
                    type="text"
                    id="instagramUrl"
                    name="instagramUrl"
                    value={formData.instagramUrl}
                    onChange={handleChange}
                />
                <br />

                <button type="submit">Ajouter</button>
            </form>
        </>
    );
}

export default AddRestaurant;
