package dstris;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.socket.WebSocketSession;

import dstris.GameSession.GameSessionManager;
import dstris.myStructs.PlayerInfo;
import dstris.myStructs.TrisClient;


@SpringBootTest
public class GameSessionManagerTest {

  private GameSessionManager gameSessionManager;
  private WebSocketSession session;
  private PlayerInfo playerA;
  private TrisClient clientA;

  @BeforeEach
  public void setUp() {
      gameSessionManager = new GameSessionManager();
      session = mock(WebSocketSession.class);
      playerA = new PlayerInfo("playerA", "ID_A", "TEST_A");
      clientA = new TrisClient(session, playerA);
  }


  @Test
  public void testTester() {
    assertTrue(true, "Should be true");
  }
  
  @Test
  public void canAddClientToRoomAndGetSession() {
    gameSessionManager.assignClientToRoom(clientA, playerA.roomID);
    assertNotNull(gameSessionManager.getGameSessionAssociatedWithClient(clientA));
  }

  @Test
  public void canAddClientToRoomAndGetRoomID() {
    gameSessionManager.assignClientToRoom(clientA, playerA.roomID);
    assertEquals(gameSessionManager.getRoomIDAssociatedWithClient(clientA), "TEST_A");
  }

  @Test
  public void multipleUsersAddToRoom(){

  }

  @Test
  public void repeatedSameUserRequestsToJoinRoom(){

  }

}
