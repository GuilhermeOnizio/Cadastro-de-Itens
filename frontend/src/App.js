import React, { useState } from 'react';
import axios from 'axios';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

const App = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleCreateItem = (item) => {
    axios.post('http://localhost:8080/itens', item)
      .then((response) => {
        setIsEditing(false);
        alert('Item criado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao criar item:', error);
      });
  };

  const handleEditItem = (item) => {
    axios.put(`http://localhost:8080/itens/${item.id}`, item)
      .then((response) => {
        setIsEditing(false);
        alert('Item atualizado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao atualizar item:', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Sistema de Cadastro de Itens</h1>

      {isEditing ? (
        <ItemForm
          onSubmit={handleEditItem}
          initialValues={currentItem}
        />
      ) : (
        <ItemForm
          onSubmit={handleCreateItem}
        />
      )}

      <ItemList />
    </div>
  );
};

export default App;
