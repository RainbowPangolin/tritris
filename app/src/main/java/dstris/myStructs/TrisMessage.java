package dstris.myStructs;

import com.fasterxml.jackson.databind.JsonNode;

public class TrisMessage {
    public String messageType;
    public JsonNode rawMessage;

    public TrisMessage(){

    }

    public TrisMessage(String messageType,  JsonNode rawMessage){
        this.messageType = messageType;
        this.rawMessage = rawMessage;
    }

    public Object getmessage(){
        return this.rawMessage;
    }

    public void setMessage(JsonNode rawMessage) {
        this.rawMessage = rawMessage;
    }

    public String getMessageType(){
        return this.messageType;
    }

    public void setMessageType(String messageType) {
        this.messageType = messageType;
    }
}