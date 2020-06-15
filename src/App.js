import React, { useState, useEffect, Icon } from 'react';
import api from './api';
import Header from './header';
import { 
    Container, 
    Table, 
    TableRow, 
    TableCell, 
    TableHead,
    Dialog, 
    Button, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    TextField, 
    DialogActions} from '@material-ui/core';
import './style.css';

function App() {
    const [ lista, setLista ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ nome, setNome ] = useState('');
    const [ numero, setNumero ] = useState('');
    const [ idade, setIdade ] = useState('');
    const [ salario, setSalario ] = useState('');
    const [ contrato, setContrato ] = useState('');
    const [ id, setId ] = useState('');
    const [ botaoEditar, setBotaoEditar ] = useState(false);
    const [ botaoAdicionar, setBotaoAdicionar ] = useState(false);
    
    
    function openModal() {
        setBotaoAdicionar(true);
        setBotaoEditar(false);
        setNome('');
        setNumero('');
        setIdade('');
        setSalario('');
        setContrato('');
        setId('');
        setOpen(true);
    };

    function closeModal() {
        setOpen(false);
    };

    function listaElenco(){
         api.get('/elenco').then((response) => {
            const itens = response.data;
            setLista(itens);
                setNome('');
                setNumero('');
                setIdade('');
                setSalario('');
                setContrato('');
                setId('');
        });
    };

    useEffect(() => {
        listaElenco();
    }, []);
    
    function addJogador(){
        const name = nome;
        const number = numero;
        const age = idade;
        const salary = salario;
        const contract = contrato;

        api.post('/elenco', {nome:name, numero:number, idade:age , salario:salary, contrato:contract}).then((response) => {
            setNome('');
            setNumero('');
            setIdade('');
            setSalario('');
            setContrato('');
            setOpen(false);
            listaElenco();
        });
    };

    function deleteJogador(id){
        api.delete(`/elenco/${id}`).then((response) => {
            listaElenco();
        });
    };

    function openEditar(id,nome,numero,idade,salario,contrato){
        setBotaoAdicionar(false);
        setBotaoEditar(true);
        setOpen(true);
        setNome(nome);
        setNumero(numero);
        setIdade(idade);
        setSalario(salario);
        setContrato(contrato);
        setId(id);
        
    };

    function editarJogador(){
        api.put(`/elenco/${id}`,{nome:nome,numero:numero,idade:idade,salario:salario,contrato:contrato}).then((response) => {
            setOpen(false);
            setNome('');
            setNumero('');
            setIdade('');
            setContrato('');
            setId('');
            listaElenco();
        });
    };
    return (
        <>
         <Header />
         <Container maxWidth="lg" className="container"> 
            <Table>
                
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Numero</TableCell>
                        <TableCell>Idade</TableCell>
                        <TableCell>Salario</TableCell>
                        <TableCell>Contrato</TableCell>
                        
                    </TableRow>
                </TableHead>
                {lista.map(itens => (
                    <TableRow key={itens.id}>
                        <TableCell>{itens.id}</TableCell>
                        <TableCell>{itens.nome}</TableCell>
                        <TableCell>{itens.numero}</TableCell>
                        <TableCell>{itens.idade}</TableCell>
                        <TableCell>{itens.salario}</TableCell>
                        <TableCell>{itens.contrato}</TableCell>

                        <TableCell>
                            &nbsp;
                            <Button 
                                color="primary"
                                variant="outlined" 
                                onClick={() => openEditar(itens.id,itens.nome,itens.numero,itens.idade,itens.salario,itens.contrato)}
                                size="small"> 
                                Editar 
                            </Button>
                            &nbsp;
                            <Button 
                                onClick={() => deleteJogador(itens.id)}
                                variant="outlined" 
                                size="small" 
                                color="secondary">Apagar</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
            <Button 
                onClick={openModal}
                variant="contained" 
                color="primary" 
                style={{marginTop: '20px'}}>
                Adicionar
            </Button>
         </Container>
         <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">Jogador</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Informe os dados do jogador
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="nome"
                    label="Nome"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="numero"
                    label="Número"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={numero}
                    onChange={e => setNumero(e.target.value)}

                />
                <TextField
                    margin="dense"
                    id="idade"
                    label="Idade"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={idade}
                    onChange={e => setIdade(e.target.value)}

                />
                <TextField
                    margin="dense"
                    id="salario"
                    label="Salário"
                    autoComplete="off"
                    type="number"
                    fullWidth
                    value={salario}
                    onChange={e => setSalario(e.target.value)}

                />
                <TextField
                    margin="dense"
                    id="contrato"
                    label="Contrato"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={contrato}
                    onChange={e => setContrato(e.target.value)}

                />

            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="primary">
                    Cancelar
                </Button>
                <Button color="primary" onClick={botaoEditar ? editarJogador : addJogador }>
                    Salvar
                </Button>
            </DialogActions>
         </Dialog>
        </>
    )
};

export default App;