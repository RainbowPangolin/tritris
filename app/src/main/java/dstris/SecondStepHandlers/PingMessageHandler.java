package dstris.SecondStepHandlers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import dstris.GameSession.GameSession;
import dstris.GameSession.GameSessionManager;
import dstris.myStructs.Ping;


//TODO Switch to static methods and call class directly rather than instantiating?
@Component
public class PingMessageHandler implements CustomMessageHandlerInterface {
    private ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    private GameSessionManager gameSessionManager;

    @Override
    public void handleMessage(WebSocketSession connection, JsonNode rawMessage) {
        try{
            broadcastMessageFromConnection(rawMessage, connection);
        } catch (Throwable t) {
            // Handle the error or exception
            System.err.println("PingMessageHandler: An error occurred at step 2 of message processing: " + t.getMessage());
        }

    
    }

    private void broadcastMessageFromConnection(JsonNode rawMessage, WebSocketSession connection) throws IllegalArgumentException, IOException{
        String connectionID = connection.getId();
        GameSession curSession = gameSessionManager.getSessionAssociatedWithConnectionId(connectionID);
        List<WebSocketSession> clientConnectionsToThisRoom = curSession.getConnectedClients();

        Ping pingMessage = this.objectMapper.treeToValue(rawMessage, Ping.class);
        for (WebSocketSession curConnection : clientConnectionsToThisRoom){
            curConnection.sendMessage(new TextMessage("Pong, %s!".formatted(pingMessage.id)));
        }
    }
}