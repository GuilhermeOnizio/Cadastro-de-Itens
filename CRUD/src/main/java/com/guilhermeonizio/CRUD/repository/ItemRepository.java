package com.guilhermeonizio.CRUD.repository;

import com.guilhermeonizio.CRUD.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
