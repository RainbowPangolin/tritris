package dstris;
import org.springframework.web.socket.WebSocketSession;
import com.fasterxml.jackson.databind.ObjectMapper;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class PayloadHandler { 
    private Map<String, CustomMessageHandlerInterface> messageHandlers = new HashMap<>();
    private ObjectMapper objectMapper = new ObjectMapper();

    // @Autowired
    // private GameSessionManager gameSessionManager;

    //TODO Make custom object with session and message?
    public PayloadHandler(){
        messageHandlers.put("ping", new PingMessageHandler());
    }

    //TODO session and payload are passed in here to avoid excessive object instantiation. Change?
    public void handle(WebSocketSession session, String payload){
        try {
            TrisMessage trisMessage = this.objectMapper.readValue(payload, TrisMessage.class);
            CustomMessageHandlerInterface handler = messageHandlers.get(trisMessage.messageType);
            if (handler != null) {
                handler.handleMessage(session, trisMessage.rawMessage);
            }

        } catch (Throwable t) {
            // Handle the error or exception
            System.err.println("An error occurred at step 1 of message processing: " + t.getMessage());
            try {
                session.sendMessage(new TextMessage("Server had an error processing the message"));
            } catch (IOException e) {
                System.err.println("An error occurred while sending error message: " + e.getMessage());
            }
        }
    }
    
}
