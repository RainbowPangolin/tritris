package dstris.GameSession;

import java.util.HashSet;
import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

import dstris.myStructs.TrisClient;

//TODO player and TrisClient are interchangable, probably should be better defined
public class GameSession {
    private Set<TrisClient> players;
    private String gameSessionId;

    public GameSession(String gameSessionId){
        this.players = new HashSet<>();
        this.gameSessionId = gameSessionId;
    }

    public String getId(){
        return this.gameSessionId;
    }

    public void setId(String gameSessionId){
       this.gameSessionId = gameSessionId;
    }

    public Set<TrisClient> getListOfPlayers(){
        return this.players;
    }

    public int getNumberOfPlayers(){
        return this.players.size();
    }

    public void addPlayer(TrisClient player){
        this.players.add(player);
    }
    
    public void removePlayer(TrisClient player){
        this.players.remove(player);
    }

    public Set<WebSocketSession> getConnectedClients(){
        Set<WebSocketSession> connections = new HashSet<>();
        for (TrisClient player : players){
            connections.add(player.getConnection());
        }
        return connections;
    }

    public TrisClient getClientWithPlayerID(String id){
        TrisClient trisClientToReturn = null;
        for (TrisClient trisClient : this.players) {
            if (trisClient.getPlayerID().equals(id)) {
                trisClientToReturn = trisClient;
                break;
            }
        }
        if (trisClientToReturn != null) {
            return trisClientToReturn;
        } else {
            return null;
        }
    }

    public void removeTrisClientById(String id) {
        TrisClient trisClientToRemove = null;
        for (TrisClient trisClient : this.players) {
            if (trisClient.getPlayerID().equals(id)) {
                trisClientToRemove = trisClient;
                break;
            }
        }
        if (trisClientToRemove != null) {
            this.players.remove(trisClientToRemove);
        }
    }

    public Set<TrisClient> getAllConnectedClientedExcept(String id){
        Set<TrisClient> otherConnectedClients = new HashSet<>();
        for (TrisClient trisClient : this.players) {
            if (trisClient.getPlayerID().equals(id)) {
                continue;
            }
            otherConnectedClients.add(trisClient);
        }
        return otherConnectedClients;
    } 

    
    public Set<WebSocketSession> getAllConnectionsExceptFrom(String id){
        Set<WebSocketSession> otherConnectedClients = new HashSet<>();
        for (TrisClient trisClient : this.players) {
            if (trisClient.getPlayerID().equals(id)) {
                continue;
            }
            otherConnectedClients.add(trisClient.getConnection());
        }
        return otherConnectedClients;
    } 


}
