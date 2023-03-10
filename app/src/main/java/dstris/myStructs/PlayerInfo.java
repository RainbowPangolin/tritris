package dstris.myStructs;

public class PlayerInfo {
    // public boolean inMatch;
    public String name;
    public String id;
    public String roomID;

    public PlayerInfo(){
        //default constructor for Jackson usage
    }

    public PlayerInfo(String name, String id, String roomID){
        this.name = name;
        this.id = id;
        this.roomID = roomID;
    }
}
