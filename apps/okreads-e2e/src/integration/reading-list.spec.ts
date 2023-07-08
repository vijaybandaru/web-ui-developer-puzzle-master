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

  it('Then: Update finished status to a book', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get("#btn-nBuA0hmspdMC").click();
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get("#finishedbtn-nBuA0hmspdMC").click();
    cy.get("#finishedbtn-nBuA0hmspdMC").should('contain.text', 'Finished');
  });

});
