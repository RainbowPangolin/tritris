package dstris.GameSession;

// import java.util.ArrayList;
import java.util.HashMap;
// import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import dstris.myStructs.TrisClient;

//A bean. Contains all active rooms at all times.
@Component("gameSessionManager")
@Scope("singleton")
public class GameSessionManager {
    private Map<TrisClient, String> clientIdToGameSessionIdMap = new HashMap<>();
    private Map<String, String> connectionIdToGameSessionIdMap = new HashMap<>();
    private Map<String, GameSession> IdToGameSessionMap = new HashMap<>();

    public GameSessionManager(){
        System.out.println(" --- GameSessionManager instantiated by Spring");
    }
    
    public void assignClientToRoom(TrisClient client, String roomID){
        if (!(IdToGameSessionMap.containsKey(roomID))){
            createGameSession(roomID);        
        }
        addClientToGameSession(client, roomID);
    }

    private void addClientToGameSession(TrisClient client, String roomID){
        clientIdToGameSessionIdMap.put(client, roomID);
        connectionIdToGameSessionIdMap.put(client.getConnectionId(), roomID);
        GameSession curGameSession = getGameSessionById(roomID);
        curGameSession.addPlayer(client);
    }

    private GameSession getGameSessionById(String roomID){
        return IdToGameSessionMap.get(roomID);
    }

    private void createGameSession(String id) {
        GameSession gameSession = new GameSession(id);
        IdToGameSessionMap.put(id, gameSession);
    }

    public void deleteGameSession(String id) {
        IdToGameSessionMap.remove(id);
    }

    public GameSession getGameSession(String id) {
        return IdToGameSessionMap.get(id);
    }

    public GameSession getSessionAssociatedWithClient(TrisClient client){
        String sessionId = clientIdToGameSessionIdMap.get(client);
            
        return getGameSessionById(sessionId);
    }

    public GameSession getSessionAssociatedWithConnectionId(String connectionId){
        String sessionId = connectionIdToGameSessionIdMap.get(connectionId);
            
        return getGameSessionById(sessionId);
    }

    public void addConnectionPendingRoom(){

    }
}