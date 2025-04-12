# Real Estate SPA

## Description:
This application represents real estate agency.It shows list of real estates which are available for selling,buying,renting.

## Requirements:
   - "@eslint/js": "^9.23.0",
   - "@types/node": "^22.13.14",
   - "eslint": "^9.23.0",
   - "globals": "^16.0.0",
   - "sass": "^1.86.0",
   - "stylelint": "^16.17.0",
   - "stylelint-config-standard": "^37.0.0",
   - "stylelint-config-standard-scss": "^14.0.0",
   - "typescript": "^5.8.2",
   - "typescript-eslint": "^8.28.0"

## Installation:
To run the application execute the following steps:
1. clone this repository: `git clone https://autocode.git.epam.com/ivelingachev1/capstone-project-template.git`
2. go to folder capstone-project-template: `cd capstone-project-template`
3. Install dependencies: `npm install`
4. compile sass: `npm run sass`
5. compile typescript: `tsc --watch`
6. check for errors: `npm run lint`
7. right click `index.html` file and press `Open With Live Server` (make sure you have installed Live Server extension in VSCode)

## Routes:
- `/home` : Home Page
- `/gallery` : Gallery Page
- `/contacts` : Contacts Page
- `/services` : it is used to show the submenu

## Key Features:
- It uses History API for navigation
- It shows / hides page content in a dynamic way.We add / remove page content in the html main tag.Header and Footer remain static.
- It uses SASS features like: `variables,mixins,nesting CSS selectors`
- Web Responsive
- real estate filters can be applied on top of each other