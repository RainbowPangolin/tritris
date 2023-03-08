package dstris;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

public class TrisMessageDeserializer extends StdDeserializer<TrisMessage> {
    public TrisMessageDeserializer() {
        super(TrisMessage.class);
    }

    @Override
    public TrisMessage deserialize(JsonParser parser, DeserializationContext context) throws IOException, JsonProcessingException {
        ObjectCodec codec = parser.getCodec();
        JsonNode node = codec.readTree(parser);

        String messageType = node.get("messageType").asText();
        JsonNode payloadNode = node.get("payload");

        Object payload = null;
        if ("ping".equals(messageType)) {
            payload = codec.treeToValue(payloadNode, Ping.class);
        } 
        
        // else if ("someOtherType".equals(messageType)) {
        //     payload = codec.treeToValue(payloadNode, SomeOtherType.class);
        // }

        return new TrisMessage(messageType, payload);
    }
}
