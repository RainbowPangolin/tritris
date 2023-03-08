package dstris;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class PingMessageHandler implements CustomMessageHandlerInterface {
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void handleMessage(WebSocketSession session, JsonNode rawMessage) {
        try{
            Ping pingMessage = this.objectMapper.treeToValue(rawMessage, Ping.class);
            session.sendMessage(new TextMessage("Pong, %s!".formatted(pingMessage.id)));

        } catch (Throwable t) {
            // Handle the error or exception
            System.err.println("An error occurred at step 2 of message processing: " + t.getMessage());
        }

    }
}