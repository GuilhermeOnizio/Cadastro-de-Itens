import React from 'react';

const Item = ({ item }) => {
  return (
    <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold">{item.nome}</h3>
      <p className="text-gray-700">{item.descricao}</p>
      <p className="text-gray-900 font-bold">R$ {item.preco.toFixed(2)}</p>
    </div>
  );
};

export default Item;
