import React, { useEffect, useState } from "react";
import { gidContactFields, GidContactType } from "../../../../../store/features/gidSlice/types/gid-types";
import { decodeContactsFromString } from "./gid-cont-functions";

import "./gid-contacts.scss"

interface ContactEditorProps {
  initialData: string; // JSON-строка контактов
  onSave: (updatedData: string) => void; // Колбек сохранения
  onClose: () => void
}

export const ContactEditor: React.FC<ContactEditorProps> = ({ initialData, onSave, onClose }) => {
  const [contact, setContact] = useState<GidContactType>(decodeContactsFromString(initialData));

  useEffect(() => {
    setContact(decodeContactsFromString(initialData))
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedData = JSON.stringify(contact)
    onSave(updatedData)
    onClose()
  };

  return (
    // <div className="gid-contacts-container">
    // </div>
    <div className="gid-contacts-container">

      <div>
        {/* <label>Телефон:</label> */}
        <input 
          placeholder={"Телефон"} 
          type="text" 
          name={gidContactFields.phone} 
          value={contact.phone} 
          onChange={handleChange} 
          className="custom-text-field"
        />
      </div>

      <div>
        {/* <label>Почта:</label> */}
        <input 
          placeholder={"Почта"} 
          type="text" 
          name={gidContactFields.email} 
          value={contact.email} 
          onChange={handleChange} 
          className="custom-text-field"
        />
      </div>

      <div>
        {/* <label>Telegram:</label> */}
        <input 
          placeholder={"Telegram"} 
          type="text" 
          name={gidContactFields.telegram} 
          value={contact.telegram} 
          onChange={handleChange} 
          className="custom-text-field"
        />
      </div>

      <div>
        {/* <label>Whats'app:</label> */}
        <input 
          placeholder={"Whats'app"} 
          type="text" 
          name={gidContactFields.whatsapp} 
          value={contact.whatsapp} 
          onChange={handleChange} 
          className="custom-text-field"
        />
      </div>

      <div>
        {/* <label>Viber:</label> */}
        <input 
          placeholder={"Viber"} 
          type="text" 
          name={gidContactFields.viber} 
          value={contact.viber} 
          onChange={handleChange} 
          className="custom-text-field"
        />
      </div>

      <div>
        {/* <label>ВКонтакте:</label> */}
        <input 
          placeholder={"ВКонтакте"} 
          type="text" 
          name={gidContactFields.vk} 
          value={contact.vk} 
          onChange={handleChange} 
          className="custom-text-field"
        />
      </div>

      <div>
        {/* <label>Facebook:</label> */}
        <input 
          placeholder={"Facebook"} 
          type="text" 
          name={gidContactFields.facebook} 
          value={contact.facebook} 
          onChange={handleChange} 
          className="custom-text-field"
        />
      </div>

      <div>
        {/* <label>Youtube:</label> */}
        <input 
          placeholder={"Youtube"} 
          type="text" 
          name={gidContactFields.youtube} 
          value={contact.youtube} 
          onChange={handleChange} 
          className="custom-text-field"
        />
      </div>

      {/* <br /> */}
      <div>
        <button onClick={handleSave} className="gid-contacts-btn-ok">Сохранить</button>
        <button onClick={onClose} className="gid-contacts-btn-close">Отменить</button>
      </div>

    </div>
  );
};
