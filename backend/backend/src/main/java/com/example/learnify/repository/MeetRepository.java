package com.example.learnify.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.learnify.entity.Meet;

public interface MeetRepository extends JpaRepository<Meet, Long> {

}
