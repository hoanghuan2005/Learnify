package com.example.learnify.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class MeetingResponse {
    private String meetingUrl;
    private String title;
}
