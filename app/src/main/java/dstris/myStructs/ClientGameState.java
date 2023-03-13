package dstris.myStructs;

public class ClientGameState {
    public String playerID;
    public String[][] board;

    public ClientGameState(){

    }

    public String getId(){
        return this.playerID;
    }
}
