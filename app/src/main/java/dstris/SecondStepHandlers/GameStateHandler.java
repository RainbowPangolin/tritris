package dstris.SecondStepHandlers;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
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
import dstris.myStructs.TrisMessage;


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
            sendMessageToOtherConnectedClients(clientMessage, curSession);
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
    
    private void sendMessageToOtherConnectedClients(ClientGameState clientMessage, GameSession curSession) throws IOException {
        String hostID = clientMessage.playerID;
        Set<WebSocketSession> otherClientConnectionsToThisRoom = curSession.getAllConnectionsExceptFrom(hostID);

        for (WebSocketSession curConnection : otherClientConnectionsToThisRoom) {
            //TODO Move most of this into a helper function
            byte[] clientBoardBytes = objectMapper.writeValueAsBytes(clientMessage.board);
            String clientBoard = new String(clientBoardBytes, StandardCharsets.UTF_8);
            JsonNode payloadMsg = objectMapper.createObjectNode().put("board", clientBoard);
            TrisMessage trisMessage = new TrisMessage("gamestate", payloadMsg);
            String stringifiedMessage = objectMapper.writeValueAsString(trisMessage);
            TextMessage textMessage = new TextMessage(stringifiedMessage);
            curConnection.sendMessage(textMessage);
            
        }
    }
}