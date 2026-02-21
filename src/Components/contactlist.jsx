import { useEffect, useState } from "react";
import Contact from "./Contact";

function ContactList() {
  const [contacts, setContacts] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: ""
  });

  // 🔹 Leer contactos desde JSON al iniciar
  useEffect(() => {
    fetch("/contacts.json")
      .then(res => res.json())
      .then(data => {
        // Ordenar favoritos al inicio
        data.sort((a, b) => b.favorito - a.favorito);
        setContacts(data);
      })
      .catch(() => console.log("Error cargando contacts.json"));
  }, []);

  // 🔹 Agregar contacto
  const addContact = () => {
    if (!form.nombre || !form.apellido || !form.telefono) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const newContact = {
      id: Date.now(),
      nombre: form.nombre,
      apellido: form.apellido,
      telefono: form.telefono,
      favorito: false
    };

    const updatedContacts = [...contacts, newContact];

    // Mantener favoritos al inicio
    updatedContacts.sort((a, b) => b.favorito - a.favorito);

    setContacts(updatedContacts);

    // Limpiar formulario
    setForm({
      nombre: "",
      apellido: "",
      telefono: ""
    });
  };

  // 🔹 Eliminar contacto
  const deleteContact = (id) => {
    const updatedContacts = contacts.filter(c => c.id !== id);
    setContacts(updatedContacts);
  };

  // 🔹 Agregar / quitar favorito
  const toggleFavorite = (id) => {
    const updatedContacts = contacts.map(c =>
      c.id === id
        ? { ...c, favorito: !c.favorito }
        : c
    );

    // Ordenar favoritos al inicio
    updatedContacts.sort((a, b) => b.favorito - a.favorito);

    setContacts(updatedContacts);
  };

  return (
    <div>
      <h2>📒 Lista de Contactos</h2>

      {/* 🔹 FORMULARIO */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={e => setForm({ ...form, nombre: e.target.value })}
        />

        <input
          placeholder="Apellido"
          value={form.apellido}
          onChange={e => setForm({ ...form, apellido: e.target.value })}
        />

        <input
          placeholder="Teléfono"
          value={form.telefono}
          onChange={e => setForm({ ...form, telefono: e.target.value })}
        />

        <button onClick={addContact}>Agregar</button>
      </div>

      <hr />

      {/* 🔹 LISTA DE CONTACTOS */}
      {contacts.map(contact => (
        <Contact
          key={contact.id}
          contact={contact}
          onDelete={deleteContact}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}

export default ContactList;