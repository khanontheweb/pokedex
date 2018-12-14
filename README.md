# Pokdex

## Technologies Used

### Backend
- Javascript

### Frontend
- Bootstrap

## Why it was Created
This project was made so a user could look up several pokemon at once
and view their basic information without having to visit new pages for each search.

## How it Works

### Backend
AJAX calls are made to a Pokemon API to retrieve the information for the 3 initial pokemon on the screen. The JSON from this call is parsed into a Pokemon object so the information 
can be easily displayed.

Typing in a Pokemon ID or name in the search bar makes another call and creates the object to display no the frontend. AJAX calls were utilized so new content could be shown without
having to refresh the screen.

### Frontend
Bootstrap was the frontend framework used in this project. Once the AJAX calls were made 
a nav-tab was made using a pokemon sprite corresponding to a pokemon's id or name.
Each nav-tab is responsible for its corresponding pokemon card that is also made with
information from the AJAX calls.

### Github Pages
I used github pages to quickly host the site since I did not need to save any information.
