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
    assertEquals("TEST_A", gameSessionManager.getRoomIDAssociatedWithClient(clientA));
  }

  @Test
  public void canAddMultipleUsersToRoom(){
    PlayerInfo playerB = new PlayerInfo("playerB", "ID_B", "TEST_A");
    TrisClient clientB = new TrisClient(session, playerA);
    PlayerInfo playerC = new PlayerInfo("playerC", "ID_C", "TEST_A");
    TrisClient clientC = new TrisClient(session, playerA);
    gameSessionManager.assignClientToRoom(clientA, playerA.roomID);
    gameSessionManager.assignClientToRoom(clientB, playerB.roomID);
    gameSessionManager.assignClientToRoom(clientC, playerC.roomID);

    assertEquals("TEST_A", gameSessionManager.getRoomIDAssociatedWithClient(clientA));
    assertEquals("TEST_A", gameSessionManager.getRoomIDAssociatedWithClient(clientB));
    assertEquals("TEST_A", gameSessionManager.getRoomIDAssociatedWithClient(clientC));

    int actual = gameSessionManager.getNumberOfPlayersInRoom("TEST_A");
    assertEquals(3, actual, "Should be 1 player in room, actually there are: %d".formatted(actual));
  }

  //TODO Behavior is still incorrect, improve test.
  @Test
  public void sameUserRepeatedlyRequestsToJoinSameRoom(){
    gameSessionManager.assignClientToRoom(clientA, playerA.roomID);
    gameSessionManager.assignClientToRoom(clientA, playerA.roomID);
    gameSessionManager.assignClientToRoom(clientA, playerA.roomID);

    assertEquals("TEST_A", gameSessionManager.getRoomIDAssociatedWithClient(clientA));

    int actual = gameSessionManager.getNumberOfPlayersInRoom("TEST_A");
    assertEquals(1, actual, "Should be 1 player in room, actually there are: %d".formatted(actual));

  }

}
