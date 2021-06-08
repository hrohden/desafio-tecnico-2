package br.com.surittec.desafio.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @PostMapping
    public ResponseEntity<Token> authenticate(@RequestBody final LoginForm loginForm) {
        try {
            Authentication authentication = authenticationManager.authenticate(loginForm.getAuthentication());
            String token = tokenService.generateToken(authentication);
            return ResponseEntity.ok(new Token("Bearer", token));
        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
