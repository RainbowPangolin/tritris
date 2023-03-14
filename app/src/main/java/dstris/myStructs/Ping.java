package dstris.myStructs;

public class Ping {
    public String name;
    public String id;

    public Ping(){

    }

    public Ping(String id){
        this.id = id;
        this.name = id;
    }

    public String getId(){
        return this.id;
    }
}
