
var app = require("../app");
var request = require("supertest");

test("signIn", async () => {
  await request(app).post("/sign-in")
    .send({ 'Email': "mathieu@gmail.com", "Password": "mathieu" })
    .expect(200)
    .expect({
      result: true,
      user: {
        FavoritesSports: ['Football', 'Basket-Ball', 'Volley-Ball'],
        _id: '60afbab315e31730a5f566ef',
        Firstname: 'Mathieu',
        Email: 'mathieu@gmail.com',
        Password: '$2b$10$7NgYglxei1Qk1Ws9y1uxUef7ngVBGjiuvNM6ShssmiD9tH8TmR.Gq',
        token: 'EUeRf6dryktNZvONTAE3lP0ZI5V8UOdB',
        Age: '26 - 35 ans',
        Description: 'Hello ! Je m’appelle Mathieu, j’habite sur Lyon. Je suis un passionné de football et des sports collectifs en général. Je dispo pour taper le\n' +
          'ballon ensemble prochainement\n',
        SportsHabits: 'Le week-end',
        SportsHours: '15h à 17h',
        UserPicture: 'http://res.cloudinary.com/dtp8ma75b/image/upload/v1622129307/fixxmny4qul71mhdwzqc.jpg',
        UserLatitude: 0,
        UserLongitude: 0,
        __v: 0
      },
      error: [],
      token: 'EUeRf6dryktNZvONTAE3lP0ZI5V8UOdB'
    })
});

test("signInEmptyField", async () => {
  await request(app).post("/sign-in")
    .send({ 'Email': "mathieu@gmail.com", "Password": "" })
    .expect(200)
    .expect({
      result: false,
      user: null,
      error: ["Aïe ! L'un des champs est vide"],
      token: null
    })
});

test("signInErrorPassword", async () => {
  await request(app).post("/sign-in")
    .send({ 'Email': "mathieu@gmail.com", "Password": "lorem" })
    .expect(200)
    .expect({
      result: false,
      user: {
        FavoritesSports: ['Football', 'Basket-Ball', 'Volley-Ball'],
        _id: '60afbab315e31730a5f566ef',
        Firstname: 'Mathieu',
        Email: 'mathieu@gmail.com',
        Password: '$2b$10$7NgYglxei1Qk1Ws9y1uxUef7ngVBGjiuvNM6ShssmiD9tH8TmR.Gq',
        token: 'EUeRf6dryktNZvONTAE3lP0ZI5V8UOdB',
        Age: '26 - 35 ans',
        Description: 'Hello ! Je m’appelle Mathieu, j’habite sur Lyon. Je suis un passionné de football et des sports collectifs en général. Je dispo pour taper le\n' +
          'ballon ensemble prochainement\n',
        SportsHabits: 'Le week-end',
        SportsHours: '15h à 17h',
        UserPicture: 'http://res.cloudinary.com/dtp8ma75b/image/upload/v1622129307/fixxmny4qul71mhdwzqc.jpg',
        UserLatitude: 0,
        UserLongitude: 0,
        __v: 0
      },
      error: ['Aïe ! Mot de passe incorrect'],
      token: null
    })
});

test("signInErrorEmail", async () => {
  await request(app).post("/sign-in")
    .send({ 'Email': "math@gmail.com", "Password": "mathieu" })
    .expect(200)
    .expect({
      result: false,
      user: null,
      error: ['Aïe ! Email incorrect'],
      token: null
    })
});


test("addPlace", async () => {
  await request(app).post("/newplace")
    .send({ 'name': "nouvelle installation", "address": "adresse du lieu", "sport": "Football", "description": "description du lieu", "picture": "http://res.cloudinary.com/dtp8ma75b/image/upload/v1622129307/fixxmny4qul71mhdwzqc.jpg", "latitude": "0", "longitude": "0" })
    .expect(200)
    .expect({
      result: true,
    })
});

test("sendFrisbee", async () => {
  await request(app).post("/send-frisbee")
    .send({ 'CreatedDate': new Date(), "userCreator": "60b111bec98e472f8c1a9cac", "userInvited": "60b11c35c98e472f8c1a9cb6", "Sport": "Football", "Message": "Salut, ça te dirait un petit foot ?", "isAccepted": "null", "AddressMeeting": "Lyon 3ème", "DateMeeting":"2021-06-16T00:00:00.000+00:00","HoursMeeting":"15h à 17h" })
    .expect(200)
    .expect({
      result: true
    })
});

