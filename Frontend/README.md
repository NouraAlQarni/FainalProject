# Dream Tourism	



<img src="./src/Components/logo1.png" alt="logo" style="zoom:75%;" />

<br/><br/>
## Description

***Dream Tourism*** it's shows some countries and the most important cities in them 
and the most famous places. 
<br/>

***DATABASE*** has been developed as a part of the final project in [mongooseDB]('mongodb+srv://NouraSaad:NNooorraaa123@cluster0.w35p9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').

<br/>

## User Stories

- **Signup:** As a user I can sign up in the platform so that I can start playing into competition
- **Login:** As a user I can login to the platform so that I can log my exit points
- **Logout:** As a user I can logout from the platform so no one else can use it
- **Add Exit Points** As a user I can add an exit point
- **Edit Exit Points** As a user I can edit an exit point
- **Edit User** As a user I can edit my profile, add or substract exit points

<br/>

## Backlog

- Add profile
- Add weather
- add location

<br/><br/>

# Client / Frontend

## React Router Routes (React App)

| Path   | Component   | Permissions      | Behavior     |
|--------|-------------|------------------|--------------|
| `/`    | HomePage    | public `<Route>` |  HomePage    |
|`/signup`| SignupPage | public `<Route>` | Signup form, link to login, navigate to homepage after signup|
|`/login` | LoginPage  | public `<Route>` | Login form, navigate to homepage after login                 |
|`/City/:Id`| CityPage | public `<Route>` | Add, Delete and Edit a City                                  |
|`/Place/:countryId/:cityId` | PlacePage | public `<Route>` | Add and Delete a Places                 |
|`/PlaceDetails/:countryId/:cityId/:placeId` | PlaceDetailsPage | public`<Route>` | Details of a Places  |
|`/About` | AboutPage | public `<Route>` | Show description for the website.                 |
|`/Contact`| ContactPage | public `<Route>` | Show contact way.                 |

<br/><br/>

## Components

- Login
- SignUp
- Home
- Footer
- Place
- PlaceDetails
- ContactUs
- About
- City
- Navbar

<br/><br/>

## Services

- User Service
  - login(user or admin)
  - signup(user or admin)
  - logout()
  - addComment()
  - deleteComment()

  <br/>
- City Service
  - getCity()
  - addCity()
  - deleteCity(id)
  - updateCity(id)
  - searchCity(id)

  <br/>
- Country Service
  - getCountry()
  - addCountry()
  - deleteCountry(id)
  - editCountry(id)

  <br/>
- Place Service
  - getPlace()
  - addPlace()
  - deletePlace(id)
 
  <br/><br/>

# Server / Backend

## Models

User model

```
{
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true, validate: [isEmail]},
  password: {type: String, required: true, minlength: [6]},
  typeOfUser: {type: String, enum: ['user','admin'], default: "user"}
}
```

cities model

```
 {
   name: {type: String},
   image: {type: String},
   places: [PlaceSchema] 
 }

```

Countries model

```
 {
   name: {type: String},
   image: {type: String},
   cities: [citySchema] 
 }

```
Places model

```
 {
   name: {type: String},
   image: {type: String},
   location: {type: String},
   typeOfPlace: {type: String, enum:['Restaurant',"Hotel",'Place']},
   comments: [{type: Schema.Types.ObjectId, ref: 'comment'}] 
 }

```

 Comment model

```
 {
   user:{type: Schema.Types.ObjectId, ref: 'user'},
   place:{type: Schema.Types.ObjectId, ref: 'place'},
   commentBody:{type: String }
 }
 ```
 

 <br/><br/>



## Backend routes

|HTTP Method        | URL            | Request Body       | Description                     |  
|----------| -------------------                     | ----------------------------- | --------------------------------- | 
|  POST     |`/login`                                 | {email,password}              | Check if user is logged           |
| POST     |`/signup`                                | {name, email, password}       | Creat user with encrypted password|
| GET      |`/logout`                                |                               | Logs out the user                 |
| GET      |`/country/getCity/:countryId/:cityId`    |                               | Used to get the cities            |            
| GET      |`/city/getPlace/:countryId/:cityId/:placeId`|                            | Used to get the places            |
| POST     |`/city/createPlace/:countryId/:cityId`   | {name, image, location}       | Used to create place              |
| DELETE   |`/city/deletePlace/:countryId/:cityID/:placeID`|                         | Used to delete place              |
| GET      |`/country/getCountry`                    |                               | Used to get the countries         |
| GET      |`/country/getCountry/:id`                |                               | Used to get Specific Country      |
| POST     |`/country/createCountry`                 | {name,image}                  | Used to create place              |
| PATCH    |`/country/updateCountry/:id`             | {name,image}                  | Used to update current country    |
| DELETE   |`/country/deleteCountry/:id`            |                               | Used to delete country            |
| POST     |`/country/createCity/:id`                | {name,image}                  | Used to create city               |
| DELETE   |`/country/deleteCity/:countryID/:cityID` |                               | Used to delete city               | 
| PUT      |`/country/updateCity/:countryID/:cityID` | {name,image}                  | Used to update current city       |
| GET      |`/place/getComment/:countryId/:cityId/:placeId`|                         | Used to get the comments          |
| POST     |`/place/createComment`                   | {commentBody,user,place}      | Used to create comments           |
| DELETE   |`/place/deleteComment/:idCountry/:idCity/:idplace/:commentID`|           | Used to delete comments           |

<br/><br/>

## Links :

<br/>

[Trello](https://trello.com/b/7bXFB6Mb/fainalproject)

<br/>

[GitHub](https://github.com/NouraAlQarni/FainalProject)

<br/>

[Deployed App Link](http://heroku.com/)

<br/>

[Slides Link](http://slides.com/)


<br/>

[Figma ](https://www.figma.com/file/LbVG4GVg9QdU370Feenadm/Dream-Tourism..)
