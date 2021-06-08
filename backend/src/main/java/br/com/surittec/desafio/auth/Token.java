package br.com.surittec.desafio.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Token {

    private String type;
    private String key;
}
