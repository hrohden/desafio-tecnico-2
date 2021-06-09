package br.com.surittec.desafio.auth;

import java.util.Date;

import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenService {

    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.expiration}")
    private String expiration;

    public String generateToken(Authentication authentication) {
        Date today = new Date();
        Date exp = new Date(today.getTime() + Long.parseLong(expiration));
        User user = (User) authentication.getPrincipal();

        String token = Jwts.builder()
                .setIssuer("Autenticação")
                .setIssuedAt(new Date())
                .setExpiration(exp)
                .setSubject(user.getUsername())
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();

        return token;
    }

    public boolean isTokenValido(String token) {
        try {
            Jwts.parser().setSigningKey(this.secret).parseClaimsJws(token);
            return true;
        } catch (Exception exception) {
            return false;
        }
    }

    public String getUsername(String token) {
        Claims body = Jwts.parser().setSigningKey(this.secret).parseClaimsJws(token).getBody();
        return body.getSubject();
    }

}
