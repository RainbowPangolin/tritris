package dstris.SecondStepHandlers;

import java.io.IOException;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import dstris.CustomExceptions.GameSessionNotFoundException;
import dstris.GameSession.GameSession;
import dstris.GameSession.GameSessionManager;
import dstris.myStructs.ClientGameState;
import dstris.myStructs.Ping;


//TODO Switch to static methods and call class directly rather than instantiating?
@Component
public class GameStateHandler implements CustomMessageHandlerInterface {
    private ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    private GameSessionManager gameSessionManager;

    @Override
    public void handleMessage(WebSocketSession connection, JsonNode rawMessage) {
        try{
            GameSession curSession = getGameSessionForConnection(connection);
            ClientGameState clientMessage = this.objectMapper.treeToValue(rawMessage, ClientGameState.class);

            updateGameSession(clientMessage, curSession);
            sendPongToConnectedClients(clientMessage, curSession);
        } catch (IOException e) {
            System.err.println("Failed to deserialize ClientGameState message: " + e.getMessage());
        } catch (GameSessionNotFoundException e) {
            System.err.println("Failed to find GameSession for connection: " + e.getMessage());
        } catch (Throwable t) {
            System.err.println("An error occurred at step 2 of message processing: " + t.getMessage());
        }
    }

    private void updateGameSession(ClientGameState clientMessage, GameSession session){

    }

    private GameSession getGameSessionForConnection(WebSocketSession connection) throws GameSessionNotFoundException {
        String connectionID = connection.getId();
        GameSession curSession = gameSessionManager.getGameSessionAssociatedWithConnectionId(connectionID);
        if (curSession == null) {
            throw new GameSessionNotFoundException("No GameSession found for connection ID: " + connectionID);
        }
        return curSession;
    }
    
    private void sendPongToConnectedClients(ClientGameState clientMessage, GameSession curSession) throws IOException {
        Set<WebSocketSession> clientConnectionsToThisRoom = curSession.getConnectedClients();
        for (WebSocketSession curConnection : clientConnectionsToThisRoom) {
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(clientMessage.board);
            TextMessage textMessage = new TextMessage(json);
            curConnection.sendMessage(textMessage);
        }
    }

}