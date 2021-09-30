This is single  API using express in which you can

signUp by: 
        method POST , url  = http://localhost:3003/registration ,
        body {
            "name": String,
            "email": String,
            "password": String
        }
returns {
    "name": String,
    "email": String,
    "_id": String,
}



signIn by: 
        method POST , url  = http://localhost:3003/login ,
        body {
            "name": String,
            "password": String
        }
returns token



get all Users by: 
        method GET, url = http://localhost:3003/api/users
        headers {
            Authorization : `Bearer ${ token }`
        }
returns array of users 



get one User by: 
        method GET, url = http://localhost:3003/api/users/: id
        headers {
            Authorization : `Bearer ${ token }`
        }
returns  user



delete User by: 
        method DELETE, url = http://localhost:3003/api/users/: id
        headers {
            Authorization : `Bearer ${ token }`
        }
returns deleted user

