package dstris.GameSession;

// import java.util.ArrayList;
import java.util.HashMap;
// import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import dstris.myStructs.TrisClient;

//A bean. Contains all active rooms at all times.
//TODO Room and GameSession are kinda used interchangeably, but should be better defined.
@Component("gameSessionManager")
@Scope("singleton")
public class GameSessionManager {
    private Map<TrisClient, String> clientIDToRoomIDMap = new HashMap<>();
    private Map<String, String> connectionIDToRoomIDMap = new HashMap<>();
    private Map<String, GameSession> roomIDToGameSessionMap = new HashMap<>();

    public GameSessionManager(){
        System.out.println(" --- GameSessionManager instantiated by Spring");
    }
    
    public void assignClientToRoom(TrisClient client, String roomID){
        if (!(roomIDToGameSessionMap.containsKey(roomID))){
            createGameSession(roomID);        
        }
        addClientToGameSession(client, roomID);
    }

    
    public GameSession getGameSession(String id) {
        return roomIDToGameSessionMap.get(id);
    }

    public GameSession getGameSessionAssociatedWithClient(TrisClient client){
        String roomID = clientIDToRoomIDMap.get(client);
            
        return getGameSessionById(roomID);
    }

    public GameSession getGameSessionAssociatedWithConnectionId(String connectionId){
        String roomID = connectionIDToRoomIDMap.get(connectionId);
            
        return getGameSessionById(roomID);
    }

    public String getRoomIDAssociatedWithClient(TrisClient client){
        String roomID = clientIDToRoomIDMap.get(client);
            
        return roomID;
    }

    public int getNumberOfPlayersInRoom(String roomID){
        GameSession room = roomIDToGameSessionMap.get(roomID);
        return room.getNumberOfPlayers();
    }

    private void addClientToGameSession(TrisClient client, String roomID){
        clientIDToRoomIDMap.put(client, roomID);
        connectionIDToRoomIDMap.put(client.getConnectionId(), roomID);
        GameSession curGameSession = getGameSessionById(roomID);
        curGameSession.addPlayer(client);
    }

    private GameSession getGameSessionById(String roomID){
        return roomIDToGameSessionMap.get(roomID);
    }

    private void createGameSession(String id) {
        GameSession gameSession = new GameSession(id);
        roomIDToGameSessionMap.put(id, gameSession);
    }

    //TODO - make public facing method to remove players from session
    private void deleteGameSession(String id) {
        roomIDToGameSessionMap.remove(id);
    }


}