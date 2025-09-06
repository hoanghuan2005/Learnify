package com.example.learnify.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.learnify.entity.Events;
import com.example.learnify.repository.EventRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;

    public List<Events> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Events> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public Events createEvent(Events event) {
        return eventRepository.save(event);
    }

    public Events updateEvent(Long id, Events updatedEvent) {
        return eventRepository.findById(id)
                .map(event -> {
                    event.setTitle(updatedEvent.getTitle());
                    event.setDescription(updatedEvent.getDescription());
                    event.setStartTime(updatedEvent.getStartTime());
                    event.setEndTime(updatedEvent.getEndTime());
                    event.setLocation(updatedEvent.getLocation());
                    return eventRepository.save(event);
                })
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
