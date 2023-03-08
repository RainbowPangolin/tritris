package dstris;
import org.springframework.web.socket.WebSocketSession;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import java.io.IOException;

public class PayloadHandler { 

    // @Autowired
    // private GameSessionManager gameSessionManager;

    //TODO Make custom object with session and message?
    public PayloadHandler(){

    }

    //TODO session and payload are passed in here to avoid excessive object instantiation. Change?
    public void handle(WebSocketSession session, String payload){
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            // TrisMessage trisMessage = objectMapper.readValue(payload, TrisMessage.class);
            SimpleModule module = new SimpleModule();
            module.addDeserializer(TrisMessage.class, new TrisMessageDeserializer());
            objectMapper.registerModule(module);
            
            TrisMessage trisMessage = objectMapper.readValue(payload, TrisMessage.class);

            // Send a response back to the clients
            if("ping".equals(trisMessage.messageType)){
                System.out.println("asdf");
                Ping myPing = (Ping) trisMessage.payload;
                System.out.println(myPing.name);

                session.sendMessage(new TextMessage("Pong, %s!".formatted(myPing.id)));
            }
        } catch (Throwable t) {
            // Handle the error or exception
            System.err.println("An error occurred: " + t.getMessage());
            try {
                session.sendMessage(new TextMessage("Server had an error processing the message"));
            } catch (IOException e) {
                System.err.println("An error occurred while sending error message: " + e.getMessage());
            }
        }
    }
    
}
