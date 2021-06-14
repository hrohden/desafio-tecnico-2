import React, { useState } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom'
import MaskedInput from 'react-text-mask'
import SeletorEstados from './SeletorEstados';
import useForm from 'react-hook-form'

function FormularioCliente(props) {

    const { register, handleSubmit, errors } = useForm()

    const [id, setId] = useState(props.cliente.id ? props.cliente.id : null);
    const [nome, setNome] = useState(props.cliente.nome);
    const [cpf, setCpf] = useState(props.cliente.cpf);
    const [enderecoCep, setEnderecoCep] = useState(props.cliente.enderecoCep);
    const [enderecoLogradouro, setEnderecoLogradouro] = useState(props.cliente.enderecoLogradouro);
    const [enderecoBairro, setEnderecoBairro] = useState(props.cliente.enderecoBairro);
    const [enderecoCidade, setEnderecoCidade] = useState(props.cliente.enderecoCidade);
    const [enderecoUf, setEnderecoUf] = useState(props.cliente.enderecoUf);
    const [enderecoComplemento, setEnderecoComplemento] = useState(props.cliente.enderecoComplemento);
    const [emails, setEmails] = useState(props.cliente.emails);
    const [telefones, setTelefones] = useState(props.cliente.telefones);
    const [redirect, setRedirect] = useState(false);

    const onSubmit = (event) => {
        const cpfTemp = parseInt(cpf.toString().replace(/[^0-9]/g, ''));
        const enderecoCepTemp = parseInt(enderecoCep.toString().replace(/[^0-9]/g, ''));
        const payload = {
            id,
            nome,
            cpf: cpfTemp,
            enderecoCep: enderecoCepTemp,
            enderecoLogradouro,
            enderecoBairro,
            enderecoCidade,
            enderecoUf,
            enderecoComplemento,
            emails,
            telefones
        };
        axios.post('/api/clientes', payload)
            .then(() => setRedirect(true))
            .catch(response => console.error(response));
    }

    const handleChangeCep = (event) => {
        const enderecoCep = event.target.value;
        const cep = parseInt(enderecoCep.replace(/[^0-9]/g, ''));
        if (cep.toString().length === 8 && !isNaN(cep)) {
            axios.get(`/viacep/${cep}/json/`)
                .then(response => {
                    setEnderecoLogradouro(response.data.logradouro)
                    setEnderecoBairro(response.data.bairro)
                    setEnderecoCidade(response.data.localidade)
                    setEnderecoUf(response.data.uf)
                })
                .catch(response => {
                    console.log(response)
                })
        }
        setEnderecoCep(enderecoCep);
    }

    const adicionarEmail = event => {
        const index = (emails[emails.length - 1].index)
            ? emails[emails.length - 1].index + 1
            : emails[emails.length - 1].id + 1;
        setEmails([ ...emails, { index, email: '' } ])
    }

    const adicionarTelefone = event => {
        const index = (telefones[telefones.length - 1].index)
            ? telefones[telefones.length - 1].index + 1
            : telefones[telefones.length - 1].id + 1;
        setTelefones([ ...telefones, { index, tipo: 'Celular', ddd: '', numero: '' } ])
    }

    // const adicionarTelefone = () => {
    //     const key = telefoneKey + 1;
    //     const tipo = 'Celular';
    //     const ddd = '';
    //     const numero = '';
    //     let telefonesTemp = telefones;
    //     telefonesTemp.push({ key, tipo, ddd, numero })
    //     setTelefones(telefonesTemp)
    //     setTelefoneKey(key)
    // }

    return redirect ? (
        <Redirect to="/" />
    ) : (
            <form className="needs-validation" noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group row">
                    <label htmlFor="nome" className="col-2 col-form-label">Nome</label>
                    <div className="col-10">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><FontAwesomeIcon fixedWidth icon={"user"} /></span>
                            </div>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                className="form-control"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                ref={register({ required: true, minLength: 3, maxLength: 100, pattern: /^[a-zA-Z0-9À-ž ]+$/i })}
                            />
                        </div>
                            {errors.nome && errors.nome.type === "required" && <div className="text-danger"><small>Campo origatório</small></div>}
                            {errors.nome && errors.nome.type === "minLength" && <div className="text-danger"><small>Deve conter ao menos 3 caracteres</small></div>}
                            {errors.nome && errors.nome.type === "maxLength" && <div className="text-danger"><small>Não pode exceder 100 caracteres</small></div>}
                            {errors.nome && errors.nome.type === "pattern" && <div className="text-danger"><small>Permite apenas letras, espaços e números</small></div>}
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="cpf" className="col-2 col-form-label">CPF</label>
                    <div className="col-3">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><FontAwesomeIcon fixedWidth icon={"id-card"} /></span>
                            </div>
                            <MaskedInput
                                mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                                className="form-control"
                                guide={false}
                                value={cpf}
                                id="cpf"
                                name="cpf"
                                onChange={e => setCpf(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="endereco" className="col-2 col-form-label">Endereço</label>
                    <div className="col-10">
                        <div className="form-text text-muted"><small>CEP</small></div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><FontAwesomeIcon fixedWidth icon={"map-marker-alt"} /></span>
                            </div>
                            <MaskedInput
                                mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                                className="form-control"
                                guide={false}
                                value={enderecoCep}
                                id="enderecoCep"
                                name="enderecoCep"
                                onChange={handleChangeCep}
                            />
                        </div>
                        <div className="form-row">
                            <div className="col-12">
                                <div className="form-text text-muted"><small>Logradouro</small></div>
                                    <input type="text" ref={register({ required: true })} id="enderecoLogradouro" name="enderecoLogradouro" className="form-control" value={enderecoLogradouro} onChange={e => setEnderecoLogradouro(e.target.value)} />
                                    {errors.enderecoLogradouro && errors.enderecoLogradouro.type === "required" && <div className="text-danger"><small>Campo origatório</small></div>}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-6">
                                <div className="form-text text-muted"><small>Bairro</small></div>
                                    <input type="text" ref={register({ required: true })} id="enderecoBairro" name="enderecoBairro" className="form-control" value={enderecoBairro} onChange={e => setEnderecoBairro(e.target.value)} />
                                    {errors.enderecoBairro && errors.enderecoBairro.type === "required" && <div className="text-danger"><small>Campo origatório</small></div>}
                            </div>
                            <div className="col-3">
                                <div className="form-text text-muted"><small>Cidade</small></div>
                                    <input type="text" ref={register({ required: true })} id="enderecoCidade" name="enderecoCidade" className="form-control" value={enderecoCidade} onChange={e => setEnderecoCidade(e.target.value)} />
                                    {errors.enderecoCidade && errors.enderecoCidade.type === "required" && <div className="text-danger"><small>Campo origatório</small></div>}
                            </div>
                            <div className="col-3">
                                <div className="form-text text-muted"><small>UF</small></div>
                                    <SeletorEstados id="enderecoUf" name="enderecoUf" className="form-control" value={enderecoUf} onChange={e => setEnderecoUf(e.target.value)} />
                                </div>
                        </div>
                        <div className="form-row">
                            <div className="col-6">
                                <div className="form-text text-muted"><small>Complemento (opcional)</small></div>
                                    <input type="text" id="enderecoComplemento" name="enderecoComplemento" className="form-control" value={enderecoComplemento} onChange={e => setEnderecoComplemento(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="emails" className="col-2 col-form-label">E-mails</label>
                    <div className="col-10">
                        {emails.map((email, index) => {
                            return (
                                <div className="form-row mb-2" key={index}>
                                    <div className="col-6">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><FontAwesomeIcon fixedWidth icon={"envelope"} /></span>
                                            </div>
                                            <input type="text" data-idx={index} className="form-control" value={email.email} onChange={(e) => {
                                                const updatedEmails = [ ...emails ];
                                                updatedEmails[index].email = e.target.value;
                                                setEmails(updatedEmails);
                                            }} />
                                        </div>
                                    </div>
                                    {emails.length > 1 &&
                                        <div className="col-1">
                                            <div className="input-group-append">
                                                <button type="button" className="btn btn-danger" onClick={event => {
                                                    if (emails.length > 1) {
                                                        const filter = e => {
                                                            return e.id
                                                                ? e.id !== email.id
                                                                : e.index !== email.index;
                                                        }
                                                        setEmails(emails.filter(filter))
                                                    }
                                            }}><FontAwesomeIcon fixedWidth icon={"trash-alt"} /></button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            )
                        }
                        )}
                        <p><button type="button" className="btn btn-secondary" onClick={adicionarEmail}><FontAwesomeIcon fixedWidth icon={"plus"} className="mr-1" />Adicionar e-mail</button></p>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="telefones" className="col-2 col-form-label">Telefones</label>
                    <div className="col-10">
                        {telefones.map((telefone, index) => {
                            return <div className="form-row mb-2" key={index}>
                                <div className="col-2">
                                    <div className="form-text text-muted"><small>Tipo</small></div>
                                    <select className="custom-select" value={telefone.tipo} onChange={(e) => {
                                        const updatedTelefones = [...telefones];
                                        updatedTelefones[index].tipo = e.target.value;
                                        setTelefones(updatedTelefones);
                                    }}>
                                        <option value="Celular">Celular</option>
                                        <option value="Residencial">Residencial</option>
                                        <option value="Comercial">Comercial</option>
                                    </select>
                                </div>
                                <div className="col-1">
                                    <div className="form-text text-muted"><small>DDD</small></div>
                                    <input type="text" className="form-control" value={telefone.ddd == null ? "" : telefone.ddd} onChange={(e) => {
                                        const updatedTelefones = [...telefones];
                                        updatedTelefones[index].ddd = e.target.value;
                                        setTelefones(updatedTelefones);
                                    }} />
                                </div>
                                <div className="col-3">
                                    <div className="form-text text-muted"><small>Número</small></div>
                                    <MaskedInput
                                        mask={(rawValue) => {
                                            let mask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
                                            if (
                                                telefone.tipo.toLowerCase() === 'celular' &&
                                                rawValue.substring(0, 1) === '9' &&
                                                rawValue.replace('-', '').length >= 9
                                            ) {
                                                mask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
                                            }
                                            return mask
                                        }}
                                        data-idx={index}
                                        type="text"
                                        guide={false}
                                        className="form-control"
                                        value={telefone.numero}
                                        onChange={(e) => {
                                            const updatedTelefones = [...telefones];
                                            updatedTelefones[index].numero = e.target.value.replace('-', '');
                                            setTelefones(updatedTelefones);
                                        }}
                                    />
                                </div>
                                {telefones.length > 1 &&
                                    <div className="col-1">
                                        <div className="form-text text-muted"><small>&nbsp;</small></div>
                                        <button className="btn btn-danger" type="button" onClick={event => {
                                            if (telefones.length > 1) {
                                                const filter = t => {
                                                    return t.id
                                                        ? t.id !== telefone.id
                                                        : t.index !== telefone.index;
                                                }
                                                setTelefones(telefones.filter(filter))
                                            }
                                        }}><FontAwesomeIcon fixedWidth icon={"trash-alt"} /></button>
                                    </div>
                                }
                            </div>
                        }
                        )}
                        <p><button type="button" className="btn btn-secondary" onClick={adicionarTelefone}><FontAwesomeIcon fixedWidth icon={"plus"} className="mr-1" />Adicionar telefone</button></p>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-10 offset-2">
                        <button className="btn btn-lg btn-primary" type="submit"><FontAwesomeIcon fixedWidth icon={"check"} className="mr-1" />Salvar cliente</button>
                    </div>
                </div>
            </form>
        )
}

export default FormularioCliente
