# Welcome to My Basecamp 1
***
## Task
The task is to build a web-based project management tool that mimics the features of Basecamp. The core challenge is to implement user authentication, project management, and role-based permissions in a way that enhances user experience. Users need to
be able to create accounts, log in, manage projects, and have role-based access control, such as assigning and removing admin rights.

## Description
The MyBaseCamp1 project addresses the challenge by using Ruby on Rails to create a full-featured project management system. It includes:
- User Registration: Users can sign up and create an account.
- Session Management: Users can log in and log out.
- Role Permissions: Admins can assign or remove admin privileges from other users.
- Project Management: Users can create, edit, view, and delete projects

The solution leverages the Devise gem for authentication and implements role-based permissions directly in the user model. Admins have enhanced permissions to manage projects and other users.

## Installation
To install and run MyBaseCamp1, follow these steps:
  1. Clone the repository:

```bash
git clone https://github.com/yourusername/mybasecamp1.git
cd mybasecamp1
```

2. Install the required dependencies:

```bash
bundle install
```

3. Install the JavaScript dependencies:

```bash
yarn install
```

4. Set up the database:

```bash
rails db:create
rails db:migrate
```

5. Seed the database (optional):

```bash
rails db:seed
```

## Usage
To run the project locally:

1. Start the Rails server:

```bash
rails server
```

2. Open a browser and go to:

```
http://localhost:3000
```

3. You can now register, log in, and start creating and managing projects.

To delete all projects for a specific user (from Rails console):

```ruby
user = User.find_by(email: 'example@example.com')
user.projects.destroy_all
```
### The Core Team
1. Ezekiel elijah - elijah-a_e
2. odewande ezekiel_o
<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering Schools Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>
