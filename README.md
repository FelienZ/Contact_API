# How to Run This Project

**Clone this repository**
- git clone https://github.com/FelienZ/Contact_API.git

**Install dependencies**
- npm install

**Run Server**
- npm run start

**Notes:** Make sure the all depedencies already installed. If not yet, run:
- npm install nanoid
- npm install nodemon --save-dev
- npm install express

# EndPoints Documentation

- ### `GET/contacts`

Show All Entries of Contact

```json
Status: 200(OK)
[
    {
        "id": "-TFG66",
        "name": "FelienZ",
        "phone": "081234567890",
        "email": "felienz@example.com"
    }
]
```
- ### `POST/contacts`
Adding new Contact
```json
Request Body:
{
  "name": "FelienZ",
  "phone": "081234567890",
  "email": "felienz@gmail.com"
}
```
```json
Response Body:
Status: 200(OK)
{
    "message": "Sucessfully Added!"
}
```
```json
Response Body:
Status: 400(Bad Request)
{
    "message": "Data Unvalid!"
}
```
- ### `PUT/contacts/{id}`
Update Contact
```json
Request Body:
{
  "name": "FelienZ",
  "phone": "081111111",
  "email": "felienz@gmail.com"
}
```
```json
Response Body:
Status: 200(OK)
{
    "message": "Sucessfully Updated!"
}
```
```json
Response Body:
Status: 400(Bad Request)
{
    "message": "Data Unvalid!"
}
```
```json
Response Body:
Status: 404(Not Found)
{
    "message": "Data Not Found!"
}
```
- ### `DELETE/contacts/{id}`
Delete contact by ID
```json
Response Body:
Status: 200(OK)
{
    "message": "Sucessfully Deleted!"
}
```
```json
Response Body:
Status: 404(Not Found)
{
    "message": "Data Not Found!"
}
```

- ### `GET/contacts/{id}`
Get contact by ID
```json
Response Body:
Status: 200(OK)
{
    "id": "-TFG66",
    "name": "FelienZ",
    "phone": "081234567890",
    "email": "felienz@example.com"
}
```
```json
Response Body:
Status: 404(Not Found)
{
    "message": "Data Not Found!"
}
```