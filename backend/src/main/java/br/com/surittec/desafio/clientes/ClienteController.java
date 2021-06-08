package br.com.surittec.desafio.clientes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository repository;

    @GetMapping
    public List<Cliente> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Cliente consultarPorId(@PathVariable("id") Integer id) {
        return repository.findById(id).get();
    }

    @PostMapping
    public Cliente incluir(@RequestBody Cliente cliente) {
        return repository.save(cliente);
    }

    @DeleteMapping("/{id}")
    public void deletarPorId(@PathVariable("id") Integer id) {
        repository.deleteById(id);
    }
}
