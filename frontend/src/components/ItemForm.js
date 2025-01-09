import React, { useState } from 'react';
import axios from 'axios';

const ItemForm = ({ onSubmit, initialValues = { nome: '', preco: '', descricao: '' } }) => {
  const [item, setItem] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(item);
    setItem({ nome: '', preco: '', descricao: '' });
  };

  return (
  <div class="">
    
  </div>
  );
};

export default ItemForm;
