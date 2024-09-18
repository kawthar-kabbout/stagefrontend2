import React from "react";

const Information = ({ categorie,localisation, telephone, livraison }) => {
  return (
    <div className="card " style={{ width: '25rem' , marginBottom:'50px'}}>
      <ul className="list-group list-group-flush" style={{padding:'25px'}}>
        <li className="list-group-item"><strong>Catégorie:</strong> {categorie.join(', ')}</li>
        <li className="list-group-item"><strong>Localisation:</strong> {localisation}</li>
        <li className="list-group-item"><strong>Téléphone:</strong> {telephone}</li>
        <li className="list-group-item"><strong>Livraison:</strong> {livraison}</li>
      </ul>
      
    </div>
  );

};

export default Information;
