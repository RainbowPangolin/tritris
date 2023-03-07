package dstris;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new WebSocketHandler(), "/gs-guide-websocket").setAllowedOrigins("*");
    }

    private static class WebSocketHandler extends TextWebSocketHandler {
        @Override
        public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
            // Handle incoming messages from the client
            System.out.println("Received message: " + message.getPayload());

            // Send a response back to the client
            session.sendMessage(new TextMessage("Hello, client!"));
        }
    }
}
