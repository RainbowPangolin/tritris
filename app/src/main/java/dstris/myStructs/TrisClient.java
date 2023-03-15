package dstris.myStructs;

import org.springframework.web.socket.WebSocketSession;

public class TrisClient {
    private PlayerInfo player;
    private WebSocketSession connection;
    private String requestedRoom;
    private String assignedRoom;

    public TrisClient(WebSocketSession connection, PlayerInfo player){
        this.player = player;
        this.requestedRoom = "TEST_A";
        this.assignedRoom = "TEST_B";
        this.connection = connection;
    }

    public void assignToRoom(String roomID){
        this.assignedRoom = roomID;
    }

    public String getRequestedRoom(){
        return this.requestedRoom;
    } 
    
    public PlayerInfo getPlayer(){
        return this.player;
    }

    public String getPlayerID(){
        return this.player.id;
    }

    public String getAssignedRoom(){
        return this.assignedRoom;
    }

    public WebSocketSession getConnection(){
        return this.connection;
    }

    public String getConnectionId(){
        return this.connection.getId();
    }

}
