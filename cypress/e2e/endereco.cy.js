/// <reference types="Cypress" />
import EnderecoPage from '../support/page-objects/endereco.page'

const dadosEndereco = require('../fixtures/endereco.json')

describe('Funcionalidade Endereços- Faturamento e Entrega', () => {
  before(() => {

    cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    cy.fixture('perfil').then (dados => {
    cy. login(dados.usuario, dados.senha)
})

  });

    it('Deve fazer cadastro de faturamento com sucesso', () => {
      EnderecoPage.editarEnderecoFaturamento('Michele','Correa', 'EBAC', 'Brasil', 'Av .joao fereira', '2001', 'Barueri','Sao Paulo','01500000','11989898899','emailebac@ebac.com.br',)
      cy.get('.woocommerce-message').should('contain', 'Endereço Alterado com sucesso.')
     
    });
    
      it('Deve fazer cadastro de faturamento com sucesso -  Usando arquivo de dados', () => {
        EnderecoPage.editarEnderecoFaturamento (
          dadosEndereco[1].nome,
          dadosEndereco[1].sobrenome,
          dadosEndereco[1].empresa,
          dadosEndereco[1].pais,
          dadosEndereco[1].endereco,
          dadosEndereco[1].numero,
          dadosEndereco[1].cidade,
          dadosEndereco[1].estado,
          dadosEndereco[1].Cep,
          dadosEndereco[1].telefone,
          dadosEndereco[1].email
        )
        cy.get('.woocommerce-message').should('contain', 'Endereço Alterado com sucesso.')

      });
  });