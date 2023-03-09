package dstris;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import dstris.FirstStepHandlers.PayloadHandler;
import dstris.FirstStepHandlers.PayloadValidator;

@Component
public class WebSocketHandler extends TextWebSocketHandler {

    private List<WebSocketSession> sessions = new ArrayList<>();
    private PayloadValidator validator = new PayloadValidator();

    @Autowired
    private PayloadHandler handler; // = new PayloadHandler();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Handle incoming messages from the client
        String payload = message.getPayload();

        System.out.println("Received message: " + payload);
        
        if (this.validator.isValid(payload)) {
            // GameSession room = this.roomManager.getSessionAssociatedWith(sessionID);
            handler.handle(session, payload);
        } else {
            System.out.println("ERROR: ILLEGAL PAYLOAD/COULD NOT HANDLE: " + payload);
        }

    }
}