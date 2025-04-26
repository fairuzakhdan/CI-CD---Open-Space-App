import { cleanup } from '@testing-library/react';

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });
  it('should display login page correctly', () => {
    cy.get('input[placeholder="Username"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when username is empty', () => {
    // klik tombol login tanpa mengisi username
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"id" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Username"]').type('testuser');
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when username and password are wrong', () => {
    cy.get('input[placeholder="Username"]').type('testuser');
    cy.get('input[placeholder="Password"]').type('wrong_password');
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('User ID or password is wrong');
    });
  });

  it('should display homepage when username and password are correct',() => {
    cy.get('input[placeholder="Username"]').type('testuser')
    cy.get('input[placeholder="Password"]').type('test123456')
    cy.get('button').contains(/^Login$/).click();

    cy.get('nav').contains(/^Home$/).should('be.visible');
    cy.get('button').contains('Sign out').should('be.visible');
  })
});
