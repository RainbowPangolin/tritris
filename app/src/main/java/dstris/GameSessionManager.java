package dstris;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

//Singleton class. Contains all active rooms at all times.
@Component
public class GameSessionManager {
    private Map<String, GameSession> gameSessions = new HashMap<>();

    public GameSession createGameSession(String id) {
        GameSession gameSession = new GameSession(id);
        gameSessions.put(id, gameSession);
        return gameSession;
    }

    public void deleteGameSession(String id) {
        gameSessions.remove(id);
    }

    public GameSession getGameSession(String id) {
        return gameSessions.get(id);
    }

}