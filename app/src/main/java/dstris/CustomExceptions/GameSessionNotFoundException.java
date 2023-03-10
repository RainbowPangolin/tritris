package dstris.CustomExceptions;

public class GameSessionNotFoundException extends RuntimeException {
    public GameSessionNotFoundException(String message) {
        super(message);
    }

    public GameSessionNotFoundException(){
        super("GameSession not found");
    }
}
