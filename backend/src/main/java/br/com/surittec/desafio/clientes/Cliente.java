package br.com.surittec.desafio.clientes;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Size(min = 3, max = 100)
    private String nome;

    @CPF
    private String cpf;

    @NotNull
    @JsonProperty("enderecoCep")
    private String cep;

    @NotNull
    @JsonProperty("enderecoLogradouro")
    private String logradouro;

    @JsonProperty("enderecoComplemento")
    private String complemento;

    @NotNull
    @JsonProperty("enderecoBairro")
    private String bairro;

    @NotNull
    @JsonProperty("enderecoCidade")
    private String cidade;

    @NotNull
    @JsonProperty("enderecoUf")
    private String uf;

    @NotNull
    private String usuario;

    @NotNull
    private LocalDateTime dataHoraInclusao;

    @OneToMany(cascade = CascadeType.ALL)
    @Size(min = 1)
    private List<Email> emails = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    @Size(min = 1)
    private List<Telefone> telefones = new ArrayList<>();
}
