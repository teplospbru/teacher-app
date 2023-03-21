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

describe('Мобильная вёрстка', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit('http://localhost:8080/#/');
  });
  it('Мобильное меню открывается и закрывается', () => {
    cy.get('.header__mobile-navigation > :nth-child(4)').should('not.exist');
    cy.get('.menu-button__icon').click();
    cy.get('.header__mobile-navigation > :nth-child(4)').contains('Проверь себя');
    cy.get('.menu-button__icon').click();
    cy.get('.header__mobile-navigation > :nth-child(4)').should('not.exist');
  })
  it('Показывает "раскрыть" для материалов для скачивания при телефонной вёрстке. Раскрывает и скрывает по нажатию', () => {
    cy.get('.menu-button__icon').click();
    cy.get('.header__mobile-navigation > :nth-child(3) > a').click();
    cy.get('#for-material').scrollIntoView().should('be.visible');
    cy.get(':nth-child(4) > .tiles > :nth-child(4)').should('not.be.visible');
    cy.get(':nth-child(4) > .tiles-hide > .tiles-hide__button').click();
    cy.get(':nth-child(4) > .tiles > :nth-child(4)').should('be.visible');
    cy.get(':nth-child(4) > .tiles-hide > .tiles-hide__button').click();
    cy.get(':nth-child(4) > .tiles > :nth-child(4)').should('not.be.visible');
    cy.wait(500);
  })
})

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
  it('Отправляет письмо преподавателю после прохождения входного теста и нажатия кнопки "отправить результат"', () => {
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

    cy.get('input').type('test@test.com')
    cy.get('.email__button-btn').click();
    cy.contains('p', 'Письмо отправлено преподавателю');
    cy.wait(500);
  });
});

describe('Админка', () => {
  let student_url = '';
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
    cy.wait(500);
    cy.get(
      ':nth-child(1) > .admin__subcollection-question-set > :nth-child(1) > .admin-question__checkbox > input'
    ).check();
    cy.wait(500);
    cy.get('[for="fullName"] > input').type('Петров Ваня');
    cy.wait(500);
    cy.get('[for="data"] > input').type('2021-12-21');
    cy.wait(500);
    cy.get('.student__button-btn').click();

    cy.get('.student__link > a').should('be.visible');
  });
  it('Проходит по сгенерированной ссылке с просроченной датой выполнения и отображает фразу "просрочено"', () => {
    cy.get(':nth-child(2) > .admin__subcollection-header > h4').click();
    cy.wait(500);
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
    cy.get('.student__link > a').invoke('attr', 'href').then((href) => {
      cy.visit(href);
      cy.contains('p', 'просрочено').should('be.visible')
      cy.wait(500);
    });
  });
  it('Проходит по сгенерированной ссылке, проходит тест и отправляет письмо преподавателю', () => {
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
    cy.get('[for="data"] > input').type('2025-12-21');
    cy.wait(500);
    cy.get('.student__button-btn').click();
    cy.wait(500);

    cy.get('.student__link > a').should('be.visible');
    cy.get('.student__link > a').invoke('attr', 'href').then((href) => {
      cy.visit(href);
      cy.get('.quest__button').click();
      cy.get('select').select('at');
      cy.get('.quest__button').click();
      cy.get('select').select('watches');
      cy.get('.quest__button').click();
      cy.get('.quest__button').should('have.text', 'Отправить результат');
      cy.get('.quest__button').click();
      cy.contains('p', 'Письмо преподавателю отправлено');
      cy.wait(500);
    });
  });
  });

