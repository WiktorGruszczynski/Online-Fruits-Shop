package com.example.server.tools.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SuccessResponse<T> {
    private Boolean success;

    private T content;

    private String message;

    public SuccessResponse(Boolean success){
        this.success = true;
    }

    public SuccessResponse(Boolean success, T content){
        this.success = success;
        this.content = content;
    }

}
