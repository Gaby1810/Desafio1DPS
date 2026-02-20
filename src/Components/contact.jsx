import React from "react";

const Contact = ({ contact, onDelete, onToggleFavorite }) => {
  return (
    <div className={`contact-card ${contact.favorite ? "favorite" : ""}`}>
      <h3>
        {contact.nombre} {contact.apellido}
      </h3>
      <p>📞 {contact.telefono}</p>

      <div className="buttons">
        <button onClick={() => onToggleFavorite(contact.id)}>
          {contact.favorite ? "★ Quitar Favorito" : "☆ Agregar Favorito"}
        </button>

        <button onClick={() => onDelete(contact.id)}>
          🗑 Eliminar
        </button>
      </div>
    </div>
  );
};

export default Contact;