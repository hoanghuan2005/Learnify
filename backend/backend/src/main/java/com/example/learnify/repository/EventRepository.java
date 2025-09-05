package com.example.learnify.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.learnify.entity.Events;

public interface EventRepository extends JpaRepository<Events, Long>{

}
