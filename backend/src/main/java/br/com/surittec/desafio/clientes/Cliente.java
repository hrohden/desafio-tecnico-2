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
    private String logradouro;
    private String bairro;
    private String cidade;
    private String uf;
    private String email;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Telefone> telefones = new ArrayList<>();
}
