describe('Главная страница', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/#/');
    });
    it('Открывает главную страницу', () => {
        cy.get('h1').should('have.text', 'Фефилова Ольга Алексеевна');
    });
    it('Пункт "Обо мне" видим после прокрутки', () => {
        cy.get('#about').scrollIntoView().should('be.visible');
        cy.wait(500);
    });
    it('Пункт "Сертификаты" видим после прокрутки', () => {
        cy.get('#carousel').scrollIntoView().should('be.visible');
        cy.wait(500);
    });
    it('Пункт "Материалы для загрузки" видим после прокрутки', () => {
        cy.get('#for-material').scrollIntoView().should('be.visible');
        cy.wait(500);
    });
})

describe('Админка', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/#/admin');
    });
    it('Открываются пункты меню админки', () => {
        cy.get(':nth-child(1) > .admin__subcollection-header > h4').click();
        cy.get(':nth-child(1) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input').check().should('be.checked');
        cy.wait(500);
        cy.get(':nth-child(2) > .admin__subcollection-header > h4').click();
        cy.get(':nth-child(2) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input').check().should('be.checked');
        cy.wait(500);
        cy.get(':nth-child(3) > .admin__subcollection-header > h4').click();
        cy.get(':nth-child(3) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input').check().should('be.checked');
        cy.wait(500);
        cy.get(':nth-child(4) > .admin__subcollection-header > h4').click();
        cy.get(':nth-child(4) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input').check().should('be.checked');
    });
    it('Запоминает выбранные вопросы', () => {
        cy.get(':nth-child(1) > .admin__subcollection-header > h4').click();
        cy.get(':nth-child(2) > .admin__subcollection-header > h4').click();
        cy.wait(500);
        cy.get(':nth-child(1) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input').check();
        cy.get(':nth-child(2) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input').check();
        cy.wait(500);
        cy.visit('http://localhost:8080/#/');
        cy.wait(500);
        cy.visit('http://localhost:8080/#/admin');

        cy.get(':nth-child(1) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input').should('be.checked');
        cy.get(':nth-child(2) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input').should('be.checked');
    });
    it('Генерирует ссылку', () => {
        cy.get(':nth-child(1) > .admin__subcollection-header > h4').click();
        cy.get(':nth-child(2) > .admin__subcollection-header > h4').click();
        cy.wait(500);
        cy.get(':nth-child(1) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input').check();
        cy.get(':nth-child(2) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input').check();
        cy.wait(500);
        cy.get('[for="fullName"] > input').type('Петров Ваня');
        cy.wait(500);
        cy.get('[for="data"] > input').type('2021-12-21');
        cy.wait(500);
        cy.get('.student__button-btn').click();

        cy.get('.student__link > a').should('be.visible');
    });
});