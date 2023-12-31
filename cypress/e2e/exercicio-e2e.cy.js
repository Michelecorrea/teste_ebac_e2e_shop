const cypress = require('cypress')

const { faker } = require('@faker-js/faker');

const produtoInfo = {
  nome: 'abominable',
  cor: 'Green',
  tamanho: 'XS',
  quantidade: 4,
  precoUnitario: 69,
  produtoSelecionado: 'Abominable Hoodie - XS, Green',

};

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    
    beforeEach(() => {
        cy.visit('minha-conta/')
    });


    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        // Pré-cadastro
        cy.get('#reg_email').type(faker.internet.email())
        cy.get('#reg_password').type('!teste@teste.com')
        cy.get(':nth-child(4) > .button').click()

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(faker.name.firstName())
        cy.get('#account_last_name').type(faker.name.lastName())
        cy.get('.woocommerce-Button').click()

        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')   
              
        // Produto
        cy.visit('produtos/')
        cy.addProdutos('Abominable Hoodie', 'S', 4)
        
        // Checkout
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

        //  faturamento
        cy.get('#billing_address_1').type('rua suco limonada')
        cy.get('#billing_city').type('Planalto')
        cy.get('#billing_postcode').type('00987654')
        cy.get('#billing_phone').type('49999999999')
        cy.get('.woocommerce-terms-and-conditions-checkbox-text').click()

        cy.get('#place_order').click()
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });



})