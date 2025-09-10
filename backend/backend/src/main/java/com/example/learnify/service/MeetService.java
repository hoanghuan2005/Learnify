package com.example.learnify.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.learnify.dtos.MeetingRequest;
import com.example.learnify.dtos.MeetingResponse;
import com.example.learnify.entity.Meet;
import com.example.learnify.entity.User;
import com.example.learnify.repository.MeetRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class MeetService {
    private final MeetRepository meetRepository;

    // public List<Meet> getAllMeet() {
    //     return meetRepository.findAll();
    // }

    public Meet getMeetById(Long id) {
        return meetRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Meet not found"));
    }

    public MeetingResponse createMeet(MeetingRequest meetingRequest, User createdBy) {

        String randomRoom = UUID.randomUUID().toString().replace("-", "");
        String meetUrl = "https://meet.jit.si/" + randomRoom;

        Meet meet = Meet.builder()
                .title(meetingRequest.getTitle())
                .meetingUrl(meetUrl)
                .createdAt(LocalDateTime.now())
                .createdBy(createdBy)
                .build();

        meetRepository.save(meet);

        return new MeetingResponse(meet.getTitle(), meet.getMeetingUrl());
    }

    // public Meet updateMeet(Long id, Meet updatedEvent) {
    //     return meetRepository.findById(id)
    //             .map(event -> {
    //                 event.setTitle(updatedEvent.getTitle());
    //                 event.setDescription(updatedEvent.getDescription());
    //                 event.setStartTime(updatedEvent.getStartTime());
    //                 event.setEndTime(updatedEvent.getEndTime());
    //                 event.setLocation(updatedEvent.getLocation());
    //                 return meetRepository.save(event);
    //             })
    //             .orElseThrow(() -> new RuntimeException("Event not found"));
    // }

    public void deleteMeet(Long id) {
        meetRepository.deleteById(id);
    }
}
