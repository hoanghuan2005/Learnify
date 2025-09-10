package com.example.learnify.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.learnify.dtos.MeetingRequest;
import com.example.learnify.dtos.MeetingResponse;
import com.example.learnify.entity.Meet;
import com.example.learnify.entity.User;
import com.example.learnify.service.MeetService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/meets")
@RequiredArgsConstructor

public class MeetController {
    private final MeetService meetService;
    
    @PostMapping
    public ResponseEntity<MeetingResponse> createMeet(@RequestBody MeetingRequest meetingRequest, @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(meetService.createMeet(meetingRequest, currentUser));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meet> getMeetById(@PathVariable Long id) {
        return ResponseEntity.ok(meetService.getMeetById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeet(@PathVariable Long id) {
        meetService.deleteMeet(id);
        return ResponseEntity.noContent().build();
    }
}
