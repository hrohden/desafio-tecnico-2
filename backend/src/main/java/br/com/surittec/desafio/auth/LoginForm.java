package br.com.surittec.desafio.auth;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import lombok.Data;
import org.springframework.security.core.Authentication;

@Data
public class LoginForm {

    private String username;
    private String password;

    public Authentication converter() {
        return new UsernamePasswordAuthenticationToken(username, password);
    }
}
