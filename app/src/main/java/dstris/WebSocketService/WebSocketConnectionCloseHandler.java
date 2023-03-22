package dstris.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;

import dstris.GameSession.GameSessionManager;

@Component
public class WebSocketConnectionCloseHandler {

    @Autowired
    private GameSessionManager gameSessionManager;

    public void handleConnectionClose(WebSocketSession session, CloseStatus status) throws Exception {
        String connectionID = session.getId();
        gameSessionManager.removePlayerWithConnectionID(connectionID);
    }
}
