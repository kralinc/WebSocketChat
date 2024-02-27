package com.cactusdan.wsc.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.cactusdan.wsc.dto.MessageDto;

@Controller
public class MessageController {

    @MessageMapping("/global")
    @SendTo("/topic/messages")
    public MessageDto message(MessageDto sentMessage) throws Exception {
      return sentMessage;
    }
}
