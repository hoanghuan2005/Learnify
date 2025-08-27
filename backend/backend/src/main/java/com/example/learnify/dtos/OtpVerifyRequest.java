package com.example.learnify.dtos;

public class OtpVerifyRequest {
    private String email;
    private String otpCode;
    private String purpose;

    public OtpVerifyRequest() {
    }

    public OtpVerifyRequest(String email, String otpCode, String purpose) {
        this.email = email;
        this.otpCode = otpCode;
        this.purpose = purpose;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOtpCode() {
        return otpCode;
    }

    public void setOtpCode(String otpCode) {
        this.otpCode = otpCode;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }
}
