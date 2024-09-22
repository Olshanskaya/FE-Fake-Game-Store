
# Fake Game Store App - Frontend 

This project was created as an assignment at the [Integrify Academy](https://www.integrify.io/). 

Frontend is created by me in 3 weeks.

## Description

This is a `Frontend part` of `Full-Stack project`. 
The project is a `Fake Game Store App` where users can browse games, add them to the cart, and make a purchase (game keys).

Backend part of the project is [here](https://github.com/Olshanskaya/BE-Fake-Game-Store).

### Deployment

The project is deployed on Vercel. Link: https://fs18-java-frontend-olive.vercel.app/ 

(As soon as I use a free server for the backend, it takes 3-5 minutes to wake it up after first request)


## About the Project

### Users Perspective

This website is a place where users can explore and buy games easily. 
Users can `browse` a list of games and `search` by genre, player support, or part of the game’s name.
Each game has a detailed page with more information.

New users can `create an account` using their email. 
After `signing up`, they must `confirm email` by clicking a link sent to their inbox.
If a user forgets their password, they can always `reset password` by following the instructions sent to their email.

Once registered, users can `edit personal information`. 
Users can `add games to their cart` and `buy game keys`, which will be `sent to their email`. 
They can also `view order history`.
Additionally, users can add games to their `favorites` and remove them at any time. 
They can leave a `review` with a rating (1 to 5) and an `optional text comment`. 
The overall game `rating` of each game is `calculated on user reviews`.

### Admin Perspective

Administrators have special permissions.
They can `add`, `edit`, and `delete games`. 
Administrators can also add new `game keys` that users purchase.
Furthermore, they can `assign new administrators` from registered users.



## Technologies Used

### Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- PostgreSQL
- Lombok
- Maven
- Modelmapper
- JavaMail
- Thymeleaf-spring


### Frontend

- TypeScript
- React
- React Router
- React Hook Form
- Axios
- Tanstack Query
- Tailwind CSS
- Shadcn/ui
- Zod

## UX/UI

![Main Page](image.png)
*Main Page*

![alt text](image-7.png)
*Game Info Page*

![alt text](image-8.png)
*Game Reviews*

<img src="image-1.png" alt="Sign Up Form" width="33%" />  

*SignUp Form*

<img src="image-2.png" alt="Log in Form" width="33%" />  

*LogIn Form*

![alt text](image-3.png)
*User Favourites*

<img src="image-4.png" alt="Log in Form" width="33%" />  

*User Info*

<img src="image-5.png" alt="Log in Form" width="33%" />  

*Edit User Info Form*

![alt text](image-6.png)
*Cart*

![alt text](image-9.png)
*Admin Dashboard: Users*

![alt text](image-10.png)
*Admin Dashboard: Games*

![alt text](image-11.png)
*Admin Dashboard: Edit Game*

![alt text](image-12.png)
*Admin Dashboard: Add Game*

![alt text](image-13.png)
*Email: Game Keys*

![alt text](image-14.png)
*Email: Welcome message*

![alt text](image-15.png)
*Email: Forget password*