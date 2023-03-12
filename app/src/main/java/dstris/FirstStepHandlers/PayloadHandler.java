package dstris.FirstStepHandlers;
import org.springframework.web.socket.WebSocketSession;
import com.fasterxml.jackson.databind.ObjectMapper;

import dstris.SecondStepHandlers.CustomMessageHandlerInterface;
import dstris.SecondStepHandlers.GameSessionNegotiationHandler;
import dstris.SecondStepHandlers.GameStateHandler;
import dstris.SecondStepHandlers.PingMessageHandler;
import dstris.myStructs.TrisMessage;
import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@Component
@Scope("singleton")
@DependsOn("gameSessionNegotiationHandler")
public class PayloadHandler { 
    private Map<String, CustomMessageHandlerInterface> messageHandlers = new HashMap<>();
    private ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private GameSessionNegotiationHandler gameSessionNegotiationHandler;

    @Autowired
    private PingMessageHandler pingMessageHandler;

    @Autowired
    private GameStateHandler gameStateHandler;


    //TODO Make custom object with session and message?
    public PayloadHandler(){
        System.out.println(" --- PayloadHandler instantiated by Spring");
    }

    @PostConstruct
    private void initializeMessageHandlers(){
        messageHandlers.put("ping", pingMessageHandler);
        messageHandlers.put("roomnegotiation", gameSessionNegotiationHandler);
        messageHandlers.put("clientgamestate", gameStateHandler);
    }

    //TODO session and payload are passed in here to avoid excessive object instantiation. Change?
    public void handle(WebSocketSession session, String payload){
        try {
            TrisMessage trisMessage = this.objectMapper.readValue(payload, TrisMessage.class);
            CustomMessageHandlerInterface selectedHandler = messageHandlers.get(trisMessage.messageType);
            System.out.println("Received a %s message.".formatted(trisMessage.messageType));
            if (selectedHandler != null) {
                selectedHandler.handleMessage(session, trisMessage.rawMessage);
            } else {
                throw new Throwable("Handler for %s was null".formatted(trisMessage.messageType));
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
