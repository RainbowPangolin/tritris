package dstris;

import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.databind.JsonNode;

public interface CustomMessageHandlerInterface {
    void handleMessage(WebSocketSession session, JsonNode rawMessage);
}