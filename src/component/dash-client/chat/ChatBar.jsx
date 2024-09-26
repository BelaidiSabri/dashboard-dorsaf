import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatBar = ({ selectContact }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:5000/user/contacts/${userId}`);
        setContacts(response.data);
        console.log("contacts" , response.data)
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className='chat__sidebar'>
      <h2>Chat</h2>
      <div>
        <h4 className='chat__header'>Contacts</h4>
        <div className='chat__users'>
          {contacts.map(contact => (
            <p key={contact._id} onClick={() => selectContact(contact)}>
              {contact.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
