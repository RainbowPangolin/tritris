package dstris.myStructs;

public class ClientGameState {
    public String playerID;
    public int[][] board;

    public ClientGameState(){

    }

    public String getId(){
        return this.playerID;
    }
}
