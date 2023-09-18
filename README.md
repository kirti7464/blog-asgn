
## Blogging Site 

### Models
- User Model
```
{ fname: { mandatory}, lname: {mandatory}, title: {mandatory, enum[Mr, Mrs, Miss]}, email: {mandatory, valid email, unique}, password: {mandatory} }
```
- Blogs Model
```
{ title: {mandatory}, body: {mandatory}, userId: {mandatory, refs to user model}, tags: {array of string}, category: {string, mandatory}, comment: {array of string }, createdAt, updatedAt, deletedAt: {when the document is deleted}, isDeleted: {boolean, default: false}, publishedAt: {when the blog is published}, isPublished: {boolean, default: false}}
```

### User APIs /user
- Create an user -  `Endpoint: BASE_URL/user/`
- Login user from request body - `Endpoint: BASE_URL/user/login`

### POST /blogs
 `Endpoint: BASE_URL/blogs/`
- Create a blog document from request body. Get userId in request body only.
- Make sure the userId is a valid userId by checking the userexist in the users collection.
- Return HTTP status 201 on a succesful blog creation. Also return the blog document. The response should be a JSON object like [this](#Blogs) 

- Return HTTP status 400 for an invalid request with a response body like [this](#error-response-structure)

### GET /blogs
`Endpoint: BASE_URL/blogs/`
- Returns all blogs in the collection that aren't deleted and are published
- Return the HTTP status 200 if any documents are found. The response structure should be like [this](#Get-Blogs-Response-Structure) 
- If no documents are found then return an HTTP status 404 with a response like [this](#error-response-structure) 
- Filter blogs list by applying filters. Query param can have any combination of below filters.
  - By userId
  - By category
  - List of blogs that have a specific tag
  - List of blogs that have a specific comment
example of a query url: blogs?filtername=filtervalue&f2=fv2

### PUT /blogs/:blogId
`Endpoint: BASE_URL/blogs/:blogId`
- Updates a blog by changing the its title, body, adding tags, adding a comment. (Assuming tag and comment received in body is need to be added)
- Updates a blog by changing its publish status i.e. adds publishedAt date and set published to true
- Check if the blogId exists (must have isDeleted false). If it doesn't, return an HTTP status 404 with a response body like [this](#error-response-structure)
- Return an HTTP status 200 if updated successfully with a body like [this](#Updated-Blog-Response-Structure) 

### DELETE /blogs/:blogId
`Endpoint: BASE_URL/blogs/:blogId`
- Check if the blogId exists( and is not deleted). If it does, mark it deleted and return an HTTP status 200 without any response body.
- If the blog document doesn't exist then return an HTTP status of 404 with a body like [this](#error-response-structure) 

### POST /login
- Allow an user to login with their email and password. On a successful login attempt return a JWT token contatining the userId in response body like [this](#Successful-login-Response-structure)
- If the credentials are incorrect return a suitable error message with a valid HTTP status code

### Authentication and Authorisation
- Used jsonwebtoken for authentication and authorisation
- json token should be in header of reponse with key name  `x-api-key`

## Response

### Successful Response structure
```yaml
{
  status: true,
  data: {

  }
}
```
### Error Response structure
```yaml
{
  status: false,
  message: ""
}
```





## Collections

### user
```yaml
{
    "status": true,
    "data": {
        "_id": "63edd170875e5650d89ab9b8",
        "fname": "John",
        "lname": "Wick",
        "title": "Mr",
        "email": "john4614@gmail.com",
        "password": "pass1234",
        "createdAt": "2023-02-16T06:47:12.993Z",
        "updatedAt": "2023-02-16T06:47:12.993Z",
        "__v": 0
    }
}
```

### Blogs
```yaml
{
  status: true,
  data: {
        "title": "How to win friends",
        "body": "Blog body",
        "tags": ["Book", "Friends", "Self help"],
        "category": "Book",
        "comment": ["Non fiction", "Self Help"],
        "published": false,
        "publishedAt": "", // if published is true publishedAt will have a date 2021-09-17T04:25:07.803Z
        "deleted": false,
        "deletedAt": "", // if deleted is true deletedAt will have a date 2021-09-17T04:25:07.803Z,
        "createdAt": "2021-09-17T04:25:07.803Z",
        "updatedAt": "2021-09-17T04:25:07.803Z",
        }
}
```
### Get Blogs Response Structure
```yaml
{
    "status": true,
    "message": "Blogs list",
    "data": [
        {
            "tags": ["programming","coding"],
            "comment": ["web development","mobile development"],
            "isPublished": true,
            "publishedAt": null,
            "isDeleted": false,
            "deletedAt": null,
            "_id": "626f6af87528876cb6361cfe",
            "title": "Extreme Developer 101",
            "body": "Code more, learn more.",
            "userId": "626f6aec7528876cb6361cfa",
            "category": "technology",
            "createdAt": "2022-05-02T05:24:08.546Z",
            "updatedAt": "2022-05-02T05:27:46.791Z",
            "__v": 0
        },
        {
            "tags": ["movies"],
            "comment": ["aliens"],
            "isPublished": true,
            "publishedAt": "2022-05-02T05:49:04.679Z",
            "isDeleted": false,
            "deletedAt": null,
            "_id": "626f70d07528876cb6361d2d",
            "title": "Best sci-fi movies of the year",
            "body": "blah blah",
            "userId": "626f6d127528876cb6361d09",
            "category": "entertainment",
            "createdAt": "2022-05-02T05:49:04.681Z",
            "updatedAt": "2022-05-02T05:49:04.681Z",
            "__v": 0
        },
}]

```
### Updated Blog Response Structure
```yaml
{
    "status": true,
    "message": "Blog updated successfully",
    "data": {
        "tags": [
            "movies",
            "story"
        ],
        "comment": [
            "aliens",
            "cinema"
        ],
        "isPublished": false,
        "publishedAt": null,
        "isDeleted": false,
        "deletedAt": null,
        "_id": "63edd36c875e5650d89ab9c1",
        "title": "new title",
        "body": "new body",
        "userId": "63edd170875e5650d89ab9b8",
        "category": "novel",
        "createdAt": "2023-02-16T06:55:40.352Z",
        "updatedAt": "2023-02-16T06:55:43.976Z",
        "__v": 0
    }
}
```
### Delete Blog Response Structure
```yaml
{
  status: true,
  message: ""
}
```


### Successful Login Response structure
```yaml
{
  status: true,
  data: {
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JJZCI6IjYyZmUzYmUzMzY2ZmFkNDZjY2Q1MzI3ZiIsImlhdCI6MTY2MDgzMDA4MywiZXhwIjoxNjYwODY2MDgzfQ.mSo-TLyRlGhMNcy4ftEvvIlCHlyEqpaFZc-iBth4lfg"

  }
}
```

