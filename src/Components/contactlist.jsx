import { useEffect, useState } from "react";
import Contact from "./Contact";

function ContactList() {
  const [contacts, setContacts] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: ""
  });

  // 🔹 Leer contactos desde JSON (cuando este)
  useEffect(() => {
    fetch("/contacts.json")
      .then(res => res.json())
      .then(data => {
        data.sort((a, b) => b.favorito - a.favorito);
        setContacts(data);
      })
      .catch(() => console.log("Esperando JSON..."));
  }, []);

  // 🔹 Agregar contacto
  const addContact = () => {
    if (!form.nombre || !form.apellido || !form.telefono) return;

    const newContact = {
      id: Date.now(),
      ...form,
      favorito: false
    };

    setContacts([...contacts, newContact]);
    setForm({ nombre: "", apellido: "", telefono: "" });
  };

  // 🔹 Eliminar contacto
  const deleteContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  // 🔹 Agregar / quitar favorito
  const toggleFavorite = (id) => {
    const updated = contacts.map(c =>
      c.id === id ? { ...c, favorito: !c.favorito } : c
    );

    // favoritos 
    updated.sort((a, b) => b.favorito - a.favorito);

    setContacts(updated);
  };

  return (
    <div>
      <h2>Lista de Contactos</h2>

      {/* FORMULARIO */}
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

      <hr />

      {/* LISTA */}
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