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
});

describe('Проверь себя ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/#/test');
  });
  it('Показывает зелёный прогрессбар при прохождении 10 вопросов из 10', () => {
    cy.get('.quest__button').click();
    cy.get('select').select('These');
    cy.get('.quest__button').click();
    cy.get('select').select('inputs');
    cy.get('input').type('line');
    cy.get('.quest__button').click();
    cy.get(':nth-child(3) > label > input').click();
    cy.get('.quest__button').click();
    cy.get('select').select('inputs');
    cy.get('input').type('line');
    cy.get('.quest__button').click();
    cy.get('.question > :nth-child(1)').select('my');
    cy.get('.question > :nth-child(2)').select('He');
    cy.get('.quest__button').click();
    cy.get('select').select('a');
    cy.get('.quest__button').click();
    cy.get('select').select('him');
    cy.get('.quest__button').click();
    cy.get(':nth-child(3) > label > input').click();
    cy.get('.quest__button').click();
    cy.get('.question > :nth-child(1)').select('are');
    cy.get('.question > :nth-child(2)').select("I'm");
    cy.get('.quest__button').click();
    cy.get('select').select('at');
    cy.get('.quest__button').click();

    cy.get('.text-result').should('have.text', 'Вы ответили правильно на 10 из 10 вопросов.');
    cy.wait(500);
  });
  it('Показывает жёлтый прогрессбар при прохождении 6 вопросов из 10', () => {
    cy.get('.quest__button').click();
    cy.get('select').select('These');
    cy.get('.quest__button').click();
    cy.get('select').select('inputs');
    cy.get('input').type('вв');
    cy.get('.quest__button').click();
    cy.get(':nth-child(2) > label > input').click();
    cy.get('.quest__button').click();
    cy.get('select').select('inputs');
    cy.get('input').type('line');
    cy.get('.quest__button').click();
    cy.get('.question > :nth-child(1)').select('my');
    cy.get('.question > :nth-child(2)').select('He');
    cy.get('.quest__button').click();
    cy.get('select').select('an');
    cy.get('.quest__button').click();
    cy.get('select').select('him');
    cy.get('.quest__button').click();
    cy.get(':nth-child(3) > label > input').click();
    cy.get('.quest__button').click();
    cy.get('.question > :nth-child(1)').select('are');
    cy.get('.question > :nth-child(2)').select("I'm");
    cy.get('.quest__button').click();
    cy.get('select').select('in');
    cy.get('.quest__button').click();

    cy.get('.text-result').should('have.text', 'Вы ответили правильно на 6 из 10 вопросов.');
    cy.wait(500);
  });
  it('Показывает жёлтый прогрессбар при прохождении 4 вопросов из 10', () => {
    cy.get('.quest__button').click();
    cy.get('select').select('This');
    cy.get('.quest__button').click();
    cy.get('select').select('inputs');
    cy.get('input').type('вв');
    cy.get('.quest__button').click();
    cy.get(':nth-child(2) > label > input').click();
    cy.get('.quest__button').click();
    cy.get('select').select('input');
    cy.get('input').type('line');
    cy.get('.quest__button').click();
    cy.get('.question > :nth-child(1)').select('my');
    cy.get('.question > :nth-child(2)').select('He');
    cy.get('.quest__button').click();
    cy.get('select').select('an');
    cy.get('.quest__button').click();
    cy.get('select').select('him');
    cy.get('.quest__button').click();
    cy.get(':nth-child(3) > label > input').click();
    cy.get('.quest__button').click();
    cy.get('.question > :nth-child(1)').select('are');
    cy.get('.question > :nth-child(2)').select("I'm");
    cy.get('.quest__button').click();
    cy.get('select').select('in');
    cy.get('.quest__button').click();

    cy.get('.text-result').should('have.text', 'Вы ответили правильно на 4 из 10 вопросов.');
    cy.wait(500);
  });
});

describe('Админка', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/#/admin');
  });
  it('Открываются пункты меню админки', () => {
    cy.get(':nth-child(1) > .admin__subcollection-header > h4').click();
    cy.get(':nth-child(1) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input')
      .check()
      .should('be.checked');
    cy.wait(500);
    cy.get(':nth-child(2) > .admin__subcollection-header > h4').click();
    cy.get(':nth-child(2) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input')
      .check()
      .should('be.checked');
    cy.wait(500);
    cy.get(':nth-child(3) > .admin__subcollection-header > h4').click();
    cy.get(':nth-child(3) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input')
      .check()
      .should('be.checked');
    cy.wait(500);
    cy.get(':nth-child(4) > .admin__subcollection-header > h4').click();
    cy.get(':nth-child(4) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input')
      .check()
      .should('be.checked');
  });
  it('Запоминает выбранные вопросы', () => {
    cy.get(':nth-child(1) > .admin__subcollection-header > h4').click();
    cy.get(':nth-child(2) > .admin__subcollection-header > h4').click();
    cy.wait(500);
    cy.get(
      ':nth-child(1) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input'
    ).check();
    cy.get(
      ':nth-child(2) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input'
    ).check();
    cy.wait(500);
    cy.visit('http://localhost:8080/#/');
    cy.wait(500);
    cy.visit('http://localhost:8080/#/admin');

    cy.get(
      ':nth-child(1) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input'
    ).should('be.checked');
    cy.get(
      ':nth-child(2) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input'
    ).should('be.checked');
  });
  it('Генерирует ссылку', () => {
    cy.get(':nth-child(1) > .admin__subcollection-header > h4').click();
    cy.get(':nth-child(2) > .admin__subcollection-header > h4').click();
    cy.wait(500);
    cy.get(
      ':nth-child(1) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input'
    ).check();
    cy.get(
      ':nth-child(2) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input'
    ).check();
    cy.wait(500);
    cy.get('[for="fullName"] > input').type('Петров Ваня');
    cy.wait(500);
    cy.get('[for="data"] > input').type('2021-12-21');
    cy.wait(500);
    cy.get('.student__button-btn').click();

    cy.get('.student__link > a').should('be.visible');
  });
});
