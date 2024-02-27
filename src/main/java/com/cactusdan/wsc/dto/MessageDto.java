package com.cactusdan.wsc.dto;

public class MessageDto {
    String type;
    String name;
    String message;

    public MessageDto(String type, String name, String message) {
        this.type = type;
        this.name = name;
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public String getMessage() {
        return message;
    }
}
