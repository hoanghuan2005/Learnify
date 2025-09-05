package com.example.learnify.entity;

import com.example.learnify.enums.ParticipantRole;
import com.example.learnify.enums.ParticipantStatus;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "event_participants", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"event_id", "user_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Liên kết tới event
    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Events event;

    // Liên kết tới user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    private ParticipantRole role;

    @Enumerated(EnumType.STRING)
    private ParticipantStatus status;
}
