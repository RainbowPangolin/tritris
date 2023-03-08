package dstris;

// import com.fasterxml.jackson.annotation.JsonSubTypes;
// import com.fasterxml.jackson.annotation.JsonTypeInfo;

// @JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "messageType")
// @JsonSubTypes({
//     @JsonSubTypes.Type(value = Ping.class, name = "ping"),
// })

public class TrisMessage {
    public String messageType;
    // @JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXTERNAL_PROPERTY, property = "messageType")
    public Object payload;

    public TrisMessage(String messageType, Object payload){
        this.messageType = messageType;
        this.payload = payload;
    }

    public Object getPayload(){
        return this.payload;
    }

    public String getMessageType(){
        return this.messageType;
    }
}