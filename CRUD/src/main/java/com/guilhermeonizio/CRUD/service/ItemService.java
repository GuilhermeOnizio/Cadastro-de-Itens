package com.guilhermeonizio.CRUD.service;

import com.guilhermeonizio.CRUD.model.Item;
import com.guilhermeonizio.CRUD.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public List<Item> listarItens() {
        return itemRepository.findAll();
    }

    public Optional<Item> buscarItem(Long id) {
        return itemRepository.findById(id);
    }

    public Item salvarItem(Item item) {
        return itemRepository.save(item);
    }

    public void excluirItem(Long id) {
        itemRepository.deleteById(id);
    }

}
