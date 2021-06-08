package br.com.surittec.desafio.clientes;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Cliente {

    @Id
    private int id;
    private String nome;
    private String endereco;
    private String email;
}
