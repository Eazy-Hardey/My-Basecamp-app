
unless User.exists?(email: 'admin@gmail.com')
    User.create(email: 'admin@gmail.com', password: '1111111', admin: true)
 end
 
 