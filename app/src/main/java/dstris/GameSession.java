package dstris;

import java.util.ArrayList;
import java.util.List;

public class GameSession {
    private List<Player> players;
    private String id;

    public GameSession(String id){
        this.players = new ArrayList<>();
        this.id = id;
    }

    public String getId(){
        return this.id;
    }

    public List<Player> getListOfPlayers(){
        return this.players;
    }

    public void addPlayer(Player player){
        this.players.add(player);
    }
    
    public void removePlayer(Player player){
        this.players.remove(player);
    }


}
