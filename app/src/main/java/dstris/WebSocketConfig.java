package dstris;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.CloseStatus;
import java.util.ArrayList;
import java.util.List;

// import java.io.IOException;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new WebSocketHandler(), "/game").setAllowedOrigins("*");
    }

    private static class WebSocketHandler extends TextWebSocketHandler {

        private List<WebSocketSession> sessions = new ArrayList<>();
        private List<GameSession> rooms = new ArrayList<>();
        private GameSessionManager roomManager = new GameSessionManager();
        private PayloadValidator validator = new PayloadValidator();
        private PayloadHandler handler = new PayloadHandler();

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
            System.out.println("Received message: " + message.getPayload());
            
            String payload = message.getPayload();
            if (this.validator.isValid(payload)) {
                this.handler.handle(session, payload);
            } else {
                // handle invalid payload
            }




        }
    }
}
