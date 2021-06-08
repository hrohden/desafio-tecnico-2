package br.com.surittec.desafio.clientes;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private String cpf;
    private String endereco;
    private String email;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Telefone> telefones = new ArrayList<>();
}
