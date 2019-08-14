package tjuninfo.training.task.vo;

import java.io.Serializable;

public class MessageVO implements Serializable {

    private String message;

    public MessageVO(String message) {
        this.message = message;
    }

    public MessageVO() {

    }

    public String getMessage() {

        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
