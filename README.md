<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/milosdjurica/nestjs-movies">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h3 align="center">NestJS Movies Backend</h3>

  <p align="center">
    Movies&Series API created with NestJS and is using PostgreSQL database.
    <br />
    <a href="https://github.com/milosdjurica/nestjs-movies"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/milosdjurica/nestjs-movies">View Demo</a>
    ·
    <a href="https://github.com/milosdjurica/nestjs-movies/issues">Report Bug</a>
    ·
    <a href="https://github.com/milosdjurica/nestjs-movies/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <!-- <li><a href="#roadmap">Roadmap</a></li> -->
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

I created this Movies&Series API to showcase my backend development skills. Project is created with NestJS and is using PostgreSQL database. It's designed to cover all essential things needed for production ready backend project. You can find database schema in /prisma/schema.prisma .

Some things you can find in this project:

- **TypeScript** - ensuring a robust and type-safe codebase.
- **Prisma** - ORM mapper between API and relational ot document-oriented database - PostgreSQL in this case. Used to create tables and to define relationships between tables. Also applying database migrations simplifying complex SQL queries.
- **Authentication with JWT and Refresh Token**. Following best practices like hashing password before storing it into the database, and also hashing refresh tokens.
- **Role-based Authorization** - ADMIN and USER roles. Admins can create update and delete Movies, Series, Actors and Genres. Users can only see info of those tables and add/update/delete Ratings
- **Filter queries** - Giving possibility to include all actors/genres/ratings for specific movie/series. Also you can provide list of actor names or genre names or both, and get all movies/series that match those filters. There are also some other options, and there are many more to add, but i didn't want to go too deep because i think this was enough to showcase my understanding of how filter queries work.
- **Pagination** - Users can choose which page to see and how many movies/series per page they want to see. Default is page 1 and 10 movies/series per page
- **Projections** - When returning users from database, hashed password and hashed refresh token are left out.
- **Exception Handling** - Covering exceptions and displaying appropriate errors, error messages and status codes when handling errors.
- **Usage of environment variables** - for Database_Url and Access_Token_Secret and Refresh_Token_Secret
- **Dependency injection** - NestJS is heavily oriented towards this pattern
- **TODO: Tests** - I am planning to add unit tests and integration tests in the close future
- **TODO: Api rate limit** - Add api rate limit
- **TODO: Swagger Documentation** - Add swagger documentation

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- NestJS
- PostgreSQL
- TypeScript
- Prisma ORM
- Passport - for authentication

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

In the next part i will explain how you can start this project locally on your machine.

### Prerequisites

You will need Node.js and PostgreSQL database.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/milosdjurica/nestjs-movies.git
   ```
2. Install NPM packages
   ```sh
   npm install
   #or
   yarn
   ```
3. Enter your PostgreSQL database URL in .env

   ```js
   DATABASE_URL =
     "postgresql://username:password@url:port/schema_name?schema=public";
   #Example 'DATABASE_URL="postgresql://username:password@localhost:5432/movies_nestjs_db?schema=public"
   '
   ```

4. Start application in development mode
   ```sh
   npm run start:dev
   #or
   yarn start:dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

This project is meant to showcase my skills as a backend developer. It covers basic principles every backend developer should know to produce production ready applications.

<!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

<!-- ## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
  - [ ] Nested Feature

See the [open issues](https://github.com/milosdjurica/nestjs-movies/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Miloš Đurica - [My LinkedIn](https://www.linkedin.com/in/milosdjurica/) - milosdjurica.work@gmail.com

Project Link: [https://github.com/milosdjurica/nestjs-movies](https://github.com/milosdjurica/nestjs-movies)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/milosdjurica/nestjs-movies.svg?style=for-the-badge
[contributors-url]: https://github.com/milosdjurica/nestjs-movies/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/milosdjurica/nestjs-movies.svg?style=for-the-badge
[forks-url]: https://github.com/milosdjurica/nestjs-movies/network/members
[stars-shield]: https://img.shields.io/github/stars/milosdjurica/nestjs-movies.svg?style=for-the-badge
[stars-url]: https://github.com/milosdjurica/nestjs-movies/stargazers
[issues-shield]: https://img.shields.io/github/issues/milosdjurica/nestjs-movies.svg?style=for-the-badge
[issues-url]: https://github.com/milosdjurica/nestjs-movies/issues
[license-shield]: https://img.shields.io/github/license/milosdjurica/nestjs-movies.svg?style=for-the-badge
[license-url]: https://github.com/milosdjurica/nestjs-movies/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/milosdjurica
[product-screenshot]: images/screenshot.png
