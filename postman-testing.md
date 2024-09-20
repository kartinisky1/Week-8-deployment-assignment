LOGIN ENDPOINT TESTING

Request
method: POST
endpoint URL: http://localhost:3000/api/auth/login
datatype:json
body:   {
  "username": "newuser",
  "password": "password123"
}
==========================================================

Response:
status:200 OK
datatype:json
body: {
    "token: "AUTHENTICATION_ACCESS_TOKEN"
}  


REGISTER ENDPOINT TESTING
Request
method: POST
endpoint URL: http://localhost:3000/api/auth/register
datatype:json
body:   {
  "username": "newuser",
  "password": "password123"
}

==========================================================

Response:
status:200 OK
datatype:json
body: {
    "token: "AUTHENTICATION_ACCESS_TOKEN"
}  


EXPENSES ENDPOINT TESTING

Adding new expense with no Access Token:
Request
method: POST
endpoint URL: http://localhost:3000/api/expenses
datatype:json
{
  "userId": "3",
  "description": "Coooking oil",
  "amount": 200
}

=======================================================

 Response: 
 {
    "msg": "No token, authorization denied"
}

-----------------------------------------------------

Adding new expense with  Access Token:

Request
method: POST
endpoint URL: http://localhost:3000/api/expenses
headers: x-auth-token: AUTHORIZATION_TOKEN
datatype:json
{
  "userId": "3",
  "description": "Coooking oil",
  "amount": 200
}

=======================================================

Response:
datatype: JSON

{
    "id": 1,
    "userId": 1,
    "description": "Coooking oil",
    "amount": 200,
    "updated_at": "2024-09-18T19:52:10.897Z",
    "created_at": "2024-09-18T19:52:10.897Z"
}