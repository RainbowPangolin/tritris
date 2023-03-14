package dstris;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import dstris.GameSession.GameSession;
import dstris.GameSession.GameSessionManager;
import dstris.SecondStepHandlers.PingMessageHandler;
import dstris.myStructs.TrisMessage;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class PingMessageHandlerTest {

    @Autowired
    private PingMessageHandler pingMessageHandler;

    @MockBean
    private GameSessionManager gameSessionManagerMock;

    @Mock
    private WebSocketSession sessionMock;

    @Mock
    private GameSession gameSessionMock;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    @Test
    void handleMessage_withValidSession_sendsPongMessage() throws Exception {
        String connectionId = "1";
        String pingJson = "{\"id\":  \"123\", \"name\":  \"asdf\"}";
        when(sessionMock.getId()).thenReturn(connectionId);
        when(gameSessionManagerMock.getGameSessionAssociatedWithConnectionId(connectionId)).thenReturn(gameSessionMock);
        when(gameSessionMock.getConnectedClients()).thenReturn(Set.of(sessionMock));
        
        pingMessageHandler.handleMessage(sessionMock, objectMapper.readTree(pingJson));
        

        JsonNode payloadMsg = objectMapper.createObjectNode()
        .put("pong", "Pong, %s!".formatted("123"));
        TrisMessage trisMessage = new TrisMessage("ping", payloadMsg);
        String stringifiedMessage = objectMapper.writeValueAsString(trisMessage);
        TextMessage textMessage = new TextMessage(stringifiedMessage);

        verify(sessionMock).sendMessage(textMessage);        
    }

    @Test
    void handleMessage_withInvalidSession_throwsException() throws Exception {

    }
}