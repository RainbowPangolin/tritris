package dstris.GameSession;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.socket.WebSocketSession;

import dstris.myStructs.TrisClient;

public class GameSession {
    private List<TrisClient> players;
    private String gameSessionId;

    public GameSession(String gameSessionId){
        this.players = new ArrayList<>();
        this.gameSessionId = gameSessionId;
    }

    public String getId(){
        return this.gameSessionId;
    }

    public void setId(String gameSessionId){
       this.gameSessionId = gameSessionId;
    }

    public List<TrisClient> getListOfPlayers(){
        return this.players;
    }

    public void addPlayer(TrisClient player){
        this.players.add(player);
    }
    
    public void removePlayer(TrisClient player){
        this.players.remove(player);
    }

    public List<WebSocketSession> getConnectedClients(){
        List<WebSocketSession> connections = new ArrayList<>();
        for (TrisClient player : players){
            connections.add(player.getConnection());
        }
        return connections;
    }


}
