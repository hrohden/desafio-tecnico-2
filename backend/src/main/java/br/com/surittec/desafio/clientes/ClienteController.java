package br.com.surittec.desafio.clientes;

import br.com.surittec.desafio.auth.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository repository;

    @GetMapping
    public List<Cliente> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Cliente consultarPorId(@PathVariable("id") Integer id) {
        return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public Cliente incluir(@RequestBody Cliente cliente) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        cliente.setUsuario(user.getUsername());
        cliente.setDataHoraInclusao(LocalDateTime.now());
        return repository.save(cliente);
    }

    @DeleteMapping("/{id}")
    public void deletarPorId(@PathVariable("id") Integer id) {
        repository.deleteById(id);
    }
}
