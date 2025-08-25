package com.example.learnify.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.time.LocalDateTime;


@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(nullable = false)
    private String role = "student";

    private int xp = 0;

    private int level = 1;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // Relations
    @OneToMany(mappedBy = "user")
    private List<Material> materials;

    @OneToMany(mappedBy = "createdBy")
    private List<Quiz> quizzes;

    @OneToMany(mappedBy = "user")
    private List<Answer> answers;

    @OneToMany(mappedBy = "user")
    private List<UserBadge> userBadges;

    @OneToMany(mappedBy = "user")
    private List<LeaderBoard> leaderboardEntries;

    @OneToMany(mappedBy = "user")
    private List<StudyRoom> studyRoomsCreated;

    @OneToMany(mappedBy = "user")
    private List<RoomMember> roomMemberships;

    @OneToMany(mappedBy = "user")
    private List<Message> messages;

    @OneToMany(mappedBy = "user")
    private List<LearningProgress> learningProgresses;

    @OneToMany(mappedBy = "user")
    private List<Recommendation> recommendations;
}
