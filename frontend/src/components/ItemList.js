import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Item from './Item';

function ItemList() {
  const [items, setItems] = useState([]); // Estado para armazenar os itens
  const [showModal, setShowModal] = useState(false); // Estado para controlar o modal
  const [newItem, setNewItem] = useState({
    id: null,
    nome: '',
    preco: '',
    descricao: ''
  }); // Estado para os dados do novo item
  const [isEdit, setIsEdit] = useState(false); // Controle para saber se está editando ou criando

  useEffect(() => {
    // Fazendo a requisição para a API para buscar os itens
    axios.get('http://localhost:8080/itens') // URL da API do back-end
      .then(response => {
        setItems(response.data); // Armazena os itens no estado
      })
      .catch(error => {
        console.error('Houve um erro ao buscar os itens:', error);
      });
  }, []); // O array vazio garante que isso só aconteça uma vez quando o componente for montado

  // Função para lidar com a mudança nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  // Função para enviar o novo item ou item editado para o back-end
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      // Atualizando o item (edição)
      axios.put(`http://localhost:8080/itens/${newItem.id}`, newItem)
        .then(response => {
          setItems(items.map(item => (item.id === newItem.id ? response.data : item))); // Atualiza o item na lista
          setShowModal(false); // Fecha o modal após o envio
          setNewItem({ id: null, nome: '', preco: '', descricao: '' }); // Limpa os campos
          setIsEdit(false); // Desmarca a edição
        })
        .catch(error => {
          console.error('Erro ao atualizar o item:', error);
        });
    } else {
      // Adicionando um novo item
      axios.post('http://localhost:8080/itens', newItem)
        .then(response => {
          setItems([...items, response.data]); // Adiciona o novo item na lista
          setShowModal(false); // Fecha o modal após o envio
          setNewItem({ nome: '', preco: '', descricao: '' }); // Limpa os campos
        })
        .catch(error => {
          console.error('Erro ao adicionar item:', error);
        });
    }
  };

  // Função para preencher os campos com os dados do item a ser editado
  const handleEdit = (item) => {
    setNewItem({
      id: item.id,
      nome: item.nome,
      preco: item.preco,
      descricao: item.descricao
    });
    setIsEdit(true); // Marca que estamos editando
    setShowModal(true); // Abre o modal para editar
  };

  // Função para excluir o item
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/itens/${id}`)
      .then(() => {
        setItems(items.filter(item => item.id !== id)); // Remove o item da lista
      })
      .catch(error => {
        console.error('Erro ao excluir o item:', error);
      });
  };

  return (
    <div className="flex items-center justify-center">
      {/* Tela principal com lista de itens */}
      <div className="bg-white p-6 rounded-lg w-4/5 max-w-5xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Lista de Itens</h2>

        {/* Botão para abrir o modal */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-400"
        >
          Adicionar Novo Item
        </button>

        {/* Tabela de itens */}
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Nome</th>
              <th className="py-2 px-2 text-left">Preço</th>
              <th className="py-2 px-4 text-left">Descrição</th>
              <th className="py-4 pr-40 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b">
                <td className="py-2 px-4">{item.id}</td>
                <td className="py-2 px-4">{item.nome}</td>
                <td className="py-2 px-4">{item.preco}</td>
                <td className="py-2 px-4">{item.descricao}</td>
                <td className="py-2 px-4 text-center">
                <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-yellow-400"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-red-400 ml-2"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para adicionar item */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Adicionar Novo Item</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={newItem.nome}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Preço</label>
                <input
                  type="text"
                  name="preco"
                  value={newItem.preco}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                  name="descricao"
                  value={newItem.descricao}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white py-1 px-3 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-400"
                >
                  Adicionar Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemList;
