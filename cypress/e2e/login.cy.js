/// <reference types="Cypress" />
const perfil = require ('../fixtures/perfil.json')
context('Funcionalidade Login', () => {

  beforeEach(() => {
    cy.visit('http://lojaebac.ebaconline.art.br/minha-conta')
  });

  afterEach(() => {
    cy.screenshot()
  });

  it('Deve faezer login com sucesso', () => {
    cy.get('#username').type('aluno_ebac@teste.com')
    cy.get('#password').type('teste@teste.com')
    cy.get('.woocommerce-form > .button').click()

    cy.get('.page-title').should('contain', 'Minha conta')
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, aluno_ebac',)
  })

  it('Deve fazer login com sucesso - Usando arquivo de dados', () => {
    cy.get('#username').type(perfil.usuario)
    cy.get('#password').type(perfil.senha)
    cy.get('.woocommerce-form > .button').click()

    cy.get('.page-title').should('contain', 'Minha conta')

  });

  it('Deve fazer login com sucesso - Usando fixture', () => {
    cy.fixture('perfil').then(dados => {
      cy.get('#username').type(dados.usuario)
      cy.get('#password').type(dados.senha, {log: false})
      cy.get('.woocommerce-form > .button').click()
  
  })
});

    it('Deve exibir uma mensagem de erro ao inserir usuário invalido', () => {

      cy.get('#username').type('ebac@teste.com')
      cy.get('#password').type('teste@teste.com')
      cy.get('.woocommerce-form > .button').click()

      cy.get('.woocommerce-error').should('contain', 'Endereço de e-mail desconhecido.')
    });

    it('Deve exibir uma mensagem de erro ao inserir senha invalida', () => {
      cy.get('#username').type('aluno_ebac@teste.com')
      cy.get('#password').type('teste@teste')
      cy.get('.woocommerce-form > .button').click()

      cy.get('.woocommerce-error > li').should('contain','Erro: a senha fornecida para o e-mail ebac@teste.com está incorreta. Perdeu a senha?')

    });
  });
