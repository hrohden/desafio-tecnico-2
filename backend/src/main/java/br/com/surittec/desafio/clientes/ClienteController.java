package br.com.surittec.desafio.clientes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository repository;

    @GetMapping
    public List<Cliente> findAll() {
        return repository.findAll();
    }
}
