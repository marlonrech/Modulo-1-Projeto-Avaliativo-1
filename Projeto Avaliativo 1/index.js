
// CRUID - CREAT READ UPDATE DELETE

//pega oque tem no banco de dados e transforma em JSON e armazena na const db_client e se tiver vazio ele retorna um [] vazio
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []

//mandar valor novamente pro banco de dados (db_client), parar mostrar todos os registros.
const setLocaLStorage = (dbClient) => localStorage.setItem('db_client', JSON.stringify(dbClient))


// CRUD - CREAT
const createClient = (client) => {
    const dbClient = getLocalStorage();
    console.log(dbClient)
    //pega o client novo e puxa(adiciona dentro do db_client)
    dbClient.push(client)
    setLocaLStorage(dbClient);
}

// CRUD - READ
// read ele puxa a função criada getLocalStorage para ler o banco de dados.
const readClient = () => getLocalStorage();


//CRUD - UPDATE
//funçao pega le o cliente no banco de dados com o readClient e passa 2 parametros para ver qual vai ser editado [index] e o [client] para ser o client novo editado
const updateClient = (index, client) => {
    //le o banco de dados
    const dbClient = readClient()
    //pega a posição que vai ser editada e adiciona o cliente novo.
    dbClient[index] = client
    setLocaLStorage(dbClient)
}


//CRUD - DELETE
//Funçao pega le o cliente e pega o cliente para ser deletado atraves do index e retorna o db novo sem o cliente excluido.
const deleteClient = (index) => {
    const dbClient = readClient();
    dbClient.splice(index, 1)
    setLocaLStorage(dbClient)
    location.reload()

}


// função para verificar se o campo foi preenchido
const verificarPreenchimento = () => {
    document.getElementById('descricao').reportValidity()
    document.getElementById('categoria').reportValidity()
    document.getElementById('skill').reportValidity()
    document.getElementById('inputTitulo').reportValidity()
}
//verifica se foi preenchido e mostra um alert na tela
function validarInput() {
    let descriçao = document.getElementById('descricao')
    let categoria = document.getElementById('categoria')
    let skill = document.getElementById('skill')
    let titulo = document.getElementById('inputTitulo')
    if (titulo.value == '') {
        alert('Titulo não foi preenchida.')
        return verificarPreenchimento()
    } else if (skill.value == '') {
        alert('Linguagem/skill não foi preenchida.')
        return verificarPreenchimento()
    } else if (categoria.value == '') {
        alert('Categoria não foi preenchida.')
        return verificarPreenchimento()
    } else if (descriçao.value == '') {
        alert('Descrição não foi preenchida.')
        return verificarPreenchimento()
    }
    return validarInput
}


//Interaçao com o client
// chama funçao de salvar client e chama função de validação e salva e cria o client
const salvarClient = () => {
    if (validarInput()) {
        const client = {
            titulo: document.getElementById('inputTitulo').value,
            Linguagem: document.getElementById('skill').value,
            categoria: document.getElementById('categoria').value,
            descriçao: document.getElementById('descricao').value,
            video: document.getElementById('youtube').value
        }


        const index = document.getElementById('inputTitulo').dataset.index
        console.log(index)

        // location.reload()
        // createClient(client)

        if (index == 'novo') {
           location.reload()
            createClient(client)
            alert('Cliente novo cadastrado com sucesso.')
        } else {
            alert('Cliente editado com sucesso.')
           updateClient(index, client)
            location.reload()
        }
        
    }
}

// LIMPAR AS INFORMAÇOES INSERIDAS
const limparClient = () => {
    document.getElementById('descricao').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('skill').value = '';
    document.getElementById('inputTitulo').value = '';
    document.getElementById('youtube').value = '';
}

const limparFiltro = () => {
    document.getElementById('txtBuscar').value = '';
}




// função para criar div e adicionar as informações do cliente
const criarDiv = (client, index) => {
    const novoClient = document.createElement('div')
    novoClient.className = 'cardsCliente'
    novoClient.innerHTML = `
                 <h1 class='h1'>${client.titulo}</h1>
                 <p><b>Linguagem/Skill: </b>${client.Linguagem}</p>
                 <p><b>Categoria: </b>${client.categoria}</p>
                 <p>${client.descriçao}</p>
                 <button type='button' class='btnExcluirCardSecundario' id='deletar-${index}'>Excluir</button>
                 <button type='button' class='btnEditarCardSecundario' id='editar-${index}' >Editar</button>
                 <button type='button' onclick="window.open('${client.video}', '_blank')"class='btnVideoCardSecundario' id='video-${index}'>Video</button>            
             `
    document.getElementById('cardsCriados').appendChild(novoClient)
}


// puxa a função criada acima e passa pelo forEach para fazer em todas no localStorage
const atualizaClient = () => {
    const dbClient = readClient()
    dbClient.forEach(criarDiv);
    console.log(dbClient)
    
}

atualizaClient()


// CONTADOR DAS CATEGORIA E TOTAL
const contarFront = () => {
    const dbClient = readClient()
    let frontend = dbClient.filter((obj) => {
        return obj.categoria == 'FrontEnd'; 
    })
    document.getElementById('contarFront').textContent = frontend.length;
}

const contarBack = () => {
    const dbClient = readClient()
    let backend = dbClient.filter((obj) => {
        return obj.categoria == 'BackEnd';
    })
    document.getElementById('contarBack').textContent = backend.length;
}

const contarFull = () => {
    const dbClient = readClient()
    let fullstack = dbClient.filter((obj) => {
        return obj.categoria == 'FullStack'; 
    })
    document.getElementById('contarFull').textContent = fullstack.length;
}

const contarSoft = () => {
    const dbClient = readClient()
    let softSkill = dbClient.filter((obj) => {
        return obj.categoria == 'Comportamental/Soft'; 
    })
    document.getElementById('contarSoft').textContent = softSkill.length;
}

const contarTotal = () => {
    const dbClient = readClient()
    let total = dbClient.filter((obj) => {
        return obj.categoria 
    })
    document.getElementById('contarTotal').textContent = total.length;
}

contarFront()
contarBack()
contarFull()
contarSoft()
contarTotal()


//DELETANDO CLIENTE JA CRIADO
const deletarClient = (evento) => {
    if (evento.target.type == 'button') {
        
        const [acao, index] = evento.target.id.split('-')

        if (acao == 'deletar') {
            const client = readClient()[index]
            const aceitarExcluir = confirm(`Deseja realmente excluir ${client.titulo}?`)

            if (aceitarExcluir) {
                deleteClient(index)
            }
            
        }
    }
}





// EDITANDO CLIENTE E SALVANDO NO MESMO INDEX
const editando = (client) => {
    document.getElementById('inputTitulo').value = client.titulo
    document.getElementById('skill').value = client.Linguagem
    document.getElementById('categoria').value = client.categoria
    document.getElementById('descricao').value = client.descriçao
    document.getElementById('youtube').value = client.video
    document.getElementById('inputTitulo').dataset.index = client.index

}

const editarClient = (index) => {
    const client = readClient()[index]
    client.index = index
    editando(client)
}

const editar = (evento) => {
    if(evento.target.type == 'button') {

        const [acao, index] = evento.target.id.split('-')

        if (acao == 'editar') {
            editarClient(index)
        }
    }
    console.log(evento.target.id.split('-'))
}



const filtrarTitulo = () => {
    const dbClient = readClient()
    let div = document.getElementById('txtBuscar')
    if (dbClient.titulo.match(div.value)) {

    }
}


 




//EVENTOS
//BOTAO DE SALVAR O CLIENTE
document.getElementById('botaoSalvar')
    .addEventListener('click', salvarClient) 


// BOTAO PARA LIMPAR INFORMAÇOES
document.getElementById('botaoLimpar')
    .addEventListener('click', limparClient)

// BOTAO PARA DELETAR CLIENTE    
document.querySelector('#cardsCriados')
    .addEventListener('click', deletarClient)

// BOTAO PARA EDITAR CLIENTE
document.querySelector('#cardsCriados')
    .addEventListener('click', editar)

// BOTAO PARA LIMPAR FILTRO    
document.getElementById('btnLimpar')
    .addEventListener('click', limparFiltro)

document.getElementById('btnBusca')
    .addEventListener('click', filtrarTitulo)






