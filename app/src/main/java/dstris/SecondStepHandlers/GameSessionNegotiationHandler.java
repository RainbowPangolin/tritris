package dstris.SecondStepHandlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import dstris.GameSession.GameSessionManager;
import dstris.myStructs.PlayerInfo;
import dstris.myStructs.TrisClient;

public class GameSessionNegotiationHandler implements CustomMessageHandlerInterface{
    private ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    private GameSessionManager gameSessionManager;

    @Override
    public void handleMessage(WebSocketSession connection, JsonNode rawMessage) {
        try{
            PlayerInfo player = this.objectMapper.treeToValue(rawMessage, PlayerInfo.class);

            TrisClient
            gameSessionManager.assignClientToRoom(null, null);

            connection.sendMessage(new TextMessage("Connected player $s, to room %s!".formatted(player.name, player.roomID)));
        } catch (Throwable t) {
            // Handle the error or exception
            System.err.println("An error occurred at step 2 of message processing: " + t.getMessage());
        }

    }
}
