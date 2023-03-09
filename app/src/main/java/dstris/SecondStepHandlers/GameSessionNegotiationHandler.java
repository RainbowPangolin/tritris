package dstris.SecondStepHandlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import dstris.GameSession.GameSessionManager;
import dstris.myStructs.PlayerInfo;
import dstris.myStructs.TrisClient;

@Component("gameSessionNegotiationHandler")
@Scope("singleton")
@DependsOn("gameSessionManager")
public class GameSessionNegotiationHandler implements CustomMessageHandlerInterface{
    private ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private GameSessionManager gameSessionManager;

    public GameSessionNegotiationHandler(){
        System.out.println(" --- GameSessionNegotiationHandler instantiated by Spring");
    }

    @Override
    public void handleMessage(WebSocketSession connection, JsonNode rawMessage) {
        try{
            PlayerInfo player = this.objectMapper.treeToValue(rawMessage, PlayerInfo.class);

            TrisClient newClient = new TrisClient(connection, player);
            String requestedRoom = player.roomID;

            gameSessionManager.assignClientToRoom(newClient, requestedRoom);
            System.out.println("GameSessionManager has assigned %s to room %s".formatted(player.name, requestedRoom));
            connection.sendMessage(new TextMessage("Connected player $s, to room %s!".formatted(player.name, player.roomID)));
        } catch (Throwable t) {
            // Handle the error or exception
            System.err.println("GameSessionNegotiationHandler: An error occurred at step 2 of message processing: " + t.getMessage());
        }

    }
}
