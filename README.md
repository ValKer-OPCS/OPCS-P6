# 🏛️ Interior Designer Website - Dynamic Web Page

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?logo=sass&logoColor=white)
![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?logo=visual-studio-code&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)

---

## 📌 Description

Project to create a **dynamic web page** to showcase the work of an interior designer.  

Main features:

- Project showcase page.
- **Administrator login** page.
- Modal for **media upload**.
- Communication with an **API**.

Fully **Front-End development** using HTML, CSS, and JavaScript.

---

## 🎯 Objectives

- Retrieve and manage user data via **forms**.
- Manipulate the **DOM** and handle **user events**.
- Communicate with an **API**.

---

## 🛠️ Tools

- JavaScript, HTML, CSS  
- Figma (mockups)  
- Visual Studio Code (development)  
- GitHub (version control)

---

## 🛠️ Project Steps

### Step 1-1: Fetching projects from the back-end
- **Objective**: Display the gallery with projects retrieved from the API.
- **Prerequisites**:
  - Development environment installed.
  - Ensure the back-end returns data correctly (e.g., using Postman or Swagger).
- **Outcome**: Fully functional gallery with dynamically retrieved projects.
- **Recommendations**:
  - Use `fetch` to get the projects.
  - Dynamically add projects to the DOM.
  - Remove static projects from the HTML.

---

### Step 1-2: Filtering projects by category
- **Objective**: Add a filter menu to sort projects by category.
- **Prerequisites**: Fully functional gallery with all projects.
- **Outcome**: Dynamic menu that allows filtering projects by category.
- **Recommendations**:
  - Dynamically retrieve categories from the data.
  - Check if an additional API call is necessary.
  - Keep an “All Projects” option as default.

---

### Step 2-1: Integrating the login page design
- **Objective**: Integrate the login page following the mockup.
- **Prerequisites**: Functional and filterable gallery.
- **Outcome**: Login page integrated (non-functional for now).
- **Recommendations**:
  - Verify conformity with the mockup.

---

### Step 2-2: User authentication
- **Objective**: Make the login form functional.
- **Prerequisites**: Form integrated on the login page.
- **Outcome**:
  - Redirect to homepage if login is successful.
  - Display an error message if credentials are incorrect.
- **Recommendations**:
  - Determine which type of request to use to send form data.
  - Correctly handle redirection and maintain user session.
  - Notify the user if username/password is incorrect.
- **Attention point**: Store the token for future operations (adding/deleting projects).
- **Resources**: Chapter “Saving Data via HTTP API” from the course “Create Dynamic Web Pages with JavaScript”.

---

### Step 3-1: Adding the modal window
- **Objective**: Create the modal for adding media and manage its open/close behavior.
- **Prerequisites**: Ability to log in as an administrator.
- **Outcome**:
  - Functional modal to add media.
  - Open on click of the Edit button; close on clicking the cross or outside the modal.
- **Recommendations**:
  - Study the mockups to organize content and actions.
  - Integrate both views ("Photo Gallery" and "Add Photo") in a single modal.
- **Attention points**:
  - Ensure only one modal exists in the code even after multiple open/close actions.

---

### Step 3-2: Deleting existing projects
- **Objective**: Enable deletion of projects with DOM update.
- **Prerequisites**: Functional modal to add projects.
- **Outcome**: Ability to delete a project from the gallery.
- **Recommendations**:
  - Properly construct the `fetch` request to delete a project (see Swagger).
  - Remove the project from the DOM after confirmation of deletion.
- **Attention points**:
  - No page reload should be necessary to see the changes.

---

### Step 3-3: Sending a new project via the modal form
- **Objective**: Add new projects for the interior designer.
- **Prerequisites**: Functional modal.
- **Outcome**:
  - Error message if the form is incorrectly filled.
  - API response if the form is correctly submitted.
  - New project visible in the gallery after reload.
- **Recommendations**:
  - Ensure all required information is present before sending via `fetch`.

---

### Step 3-4: Dynamic handling of API response
- **Objective**: Dynamically add the project to the gallery without reloading the page.
- **Prerequisites**: Correct API response after sending the form.
- **Outcome**: Project added dynamically to the gallery.
- **Recommendations**:
  - Update the DOM as done for existing projects.
- **Attention points**:
  - Add the image in the portfolio and in the modal's image list.

---

### Step 4: Final verification and error handling
- **Objective**: Test and validate all functionalities.
- **Prerequisites**: Functional gallery and modal with all features implemented.
- **Outcome**: Complete project ready for presentation.
- **Recommendations**:
  - Test form behavior with incorrect data.
  - Verify visual conformity with the mockups.
  - Check dynamic DOM updates when adding or deleting elements.


## 📋 Project Checklist
You can check the full interactive checklist here: [TODO.md](TODO.md)