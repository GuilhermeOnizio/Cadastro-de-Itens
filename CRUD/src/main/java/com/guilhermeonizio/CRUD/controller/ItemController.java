package com.guilhermeonizio.CRUD.controller;

import com.guilhermeonizio.CRUD.model.Item;
import com.guilhermeonizio.CRUD.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/itens")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping
    public List<Item> listarItens() {
        return itemService.listarItens();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> buscarItem(@PathVariable Long id) {
        Optional<Item> item = itemService.buscarItem(id);
        return item.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Item> salvarItem(@RequestBody Item item) {
        Item savedItem = itemService.salvarItem(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> atualizarItem(@PathVariable Long id, @RequestBody Item item) {
        Optional<Item> existingItem = itemService.buscarItem(id);
        if (existingItem.isPresent()) {
            Item itemToUpdate = existingItem.get();
            itemToUpdate.setNome(item.getNome());
            itemToUpdate.setPreco(item.getPreco());
            itemToUpdate.setDescricao(item.getDescricao());

            // Atualiza o item
            Item updatedItem = itemService.salvarItem(itemToUpdate);
            return ResponseEntity.ok(updatedItem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirItem(@PathVariable Long id) {
        if (itemService.buscarItem(id).isPresent()) {
            itemService.excluirItem(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
