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
    FormControlLabel ,
    DialogActions} from '@material-ui/core';
import './style.css';

function App() {
    const [ lista, setLista ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ nome, setNome ] = useState('');
    const [ numero, setNumero ] = useState('');
    const [ idContato, setIdContato ] = useState('');
    const [ favorito, setFavorito ] = useState('S');
    const [ checked, setChecked ] = useState(true);
    const [ botaoEditar, setBotaoEditar ] = useState(false);
    const [ botaoAdicionar, setBotaoAdicionar ] = useState(false);
    
    
    function openModal() {
        setBotaoAdicionar(true);
        setBotaoEditar(false);
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
                setFavorito('S');
                setIdContato('');
        });
    }

    useEffect(() => {
        listaElenco();
    }, []);
    
    function addContato(){
        const name = nome;
        const number = numero;
        const favorite = favorito;

        api.post('/agenda', {nome:name, numero:number, favorito:favorite}).then((response) => {
            setNome('');
            setNumero('');
            setChecked(true);
            setOpen(false);
            listaElenco();
        });
    }

    function deleteContato(id){
        api.delete(`/contato/${id}`).then((response) => {
            listaElenco();
        });
    }

    function openEditar(id,nome,numero,favorito){
        setBotaoAdicionar(false);
        setBotaoEditar(true);
        setOpen(true);
        setNome(nome);
        setNumero(numero);
        setIdContato(id);
        setChecked(favorito == "S" ? true : false);
        setFavorito(favorito);
    }

    function editarContato(){
        api.put(`/contato/${idContato}`,{nome:nome,numero:numero,favorito:favorito}).then((response) => {
            setOpen(false);
            setNome('');
            setNumero('');
            setFavorito('S');
            setIdContato('');
            setChecked(true);
            listaElenco();
        });
    }
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
                        <TableCell>{itens.favorito}</TableCell>

                        <TableCell>
                            &nbsp;
                            <Button 
                                color="primary"
                                variant="outlined" 
                                onClick={() => openEditar(itens.id,itens.nome,itens.numero,itens.favorito)}
                                size="small"> 
                                Editar 
                            </Button>
                            &nbsp;
                            <Button 
                                onClick={() => deleteContato(itens.id)}
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
            <DialogTitle id="form-dialog-title">Contato</DialogTitle>
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
                    id="numero"
                    label="Idade"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={numero}
                    onChange={e => setNumero(e.target.value)}

                />
                <TextField
                    margin="dense"
                    id="numero"
                    label="Salário"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={numero}
                    onChange={e => setNumero(e.target.value)}

                />
                <TextField
                    margin="dense"
                    id="numero"
                    label="Contrato"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={numero}
                    onChange={e => setNumero(e.target.value)}

                />

            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="primary">
                    Cancelar
                </Button>
                <Button color="primary" onClick={botaoEditar ? editarContato : addContato }>
                    Salvar
                </Button>
            </DialogActions>
         </Dialog>
        </>
    )
}

export default App;