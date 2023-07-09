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
    cy.get("#btn-nBuA0hmspdMC").click({ multiple: true });
    cy.get("#btn-nBuA0hmspdMC").should('be.disabled');
    cy.get('button:contains("Undo")').click();
    cy.get("#btn-nBuA0hmspdMC").should('not.be.disabled');
  });


});
