describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: Undo add action on my search list', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit({ multiple: true });
    cy.get('[data-testing="btnWanttoRead"]').first().click({ multiple: true });
    cy.get('[data-testing="btnWanttoRead"]').first().should('be.disabled');
    cy.get('button:contains("Undo")').click();
    cy.get('[data-testing="btnWanttoRead"]').first().should('not.be.disabled');
  });

  it('Then: Undo remove action on my reading list', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit({ multiple: true });
    cy.get('[data-testing="btnWanttoRead"]').first().click({ multiple: true });
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="btnremove"]').should('have.length', 1);
    cy.get('[data-testing="btnremove"]').first().click({ multiple: true });

    cy.get('[data-testing="btnremove"]').should('have.length', 0);
    cy.get('button:contains("Undo")').click({force: true, multiple: true});
    cy.get('[data-testing="btnremove"]').should('have.length', 1);

  });

});
