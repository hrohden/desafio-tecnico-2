package br.com.surittec.desafio.auth;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenService {

    @Autowired
    private AuthenticationManager authenticationManager;

    public Authentication authenticate(LoginForm loginForm) {
        Authentication authentication = authenticationManager.authenticate(loginForm.getAuthentication());
        return authentication;
    }

    public String generateToken(Authentication authentication) {
        Date today = new Date();
        Date exp = new Date(today.getTime() + 1000*60*60*24);
        User user = (User) authentication.getPrincipal();

        String token = Jwts.builder()
                .setIssuer("Autenticação")
                .setIssuedAt(new Date())
                .setExpiration(exp)
                .setSubject(user.getUsername())
                .signWith(SignatureAlgorithm.HS256, "salt...")
                .compact();

        return token;
    }

}
