package dstris.WebSocketService;

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

    private PayloadValidator validator = new PayloadValidator();

    @Autowired
    private WebSocketConnectionCloseHandler connectionCloseHandler = new WebSocketConnectionCloseHandler();

    @Autowired
    private PayloadHandler handler; // = new PayloadHandler();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("Established connection to: " + session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("Cut connection with: " + session.getId());
        connectionCloseHandler.handleConnectionClose(session, status);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Handle incoming messages from the client
        String payload = message.getPayload();
        if (this.validator.isValid(payload)) {
            handler.handle(session, payload);
        } else {
            System.out.println("ERROR: ILLEGAL PAYLOAD/COULD NOT HANDLE: " + payload);
        }

    }
}