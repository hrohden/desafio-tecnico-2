package br.com.surittec.desafio.configuration;

import br.com.surittec.desafio.auth.User;
import br.com.surittec.desafio.auth.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.Arrays;

@Configuration
public class InicializationConfiguration {

    @Bean
    public ApplicationRunner initializer(UserRepository repository) {
        return args -> repository.saveAll(Arrays.asList(
                new User(1L, "admin", "$2a$10$uCi1MnlDTNYtWsGSden2gOyCqZtO6GVUTyLs7fN40aiGtEw.qHOK.", "admin@teste.com.br", new ArrayList<>()),
                new User(2L, "comum", "$2a$10$uCi1MnlDTNYtWsGSden2gOyCqZtO6GVUTyLs7fN40aiGtEw.qHOK.", "comum@teste.com.br", new ArrayList<>())
        ));
    }
}
