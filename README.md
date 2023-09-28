# totalitycorp-frontend-challenge
Development Stack: MERN
Features Implemented:
Backend:
  Initialized Node app.
  Created Express server.
  Created Product Schema using Mongoose.
  Implemented created product and get product Controller.
  Implemented Category and Price filtering Controller.
  Created Routes to get products, Create new product, Fetch Filtered Product.
  Created Orders Schema and controllers to generate Braintree payment gateway tokens and to initialize pyments. also created routes for same.

Frontend:
  Intialized React App.
  created Product page to display all the products.
  created Header to navigate between all products, filtered products, and cart page.
  created Pages to display products filtered by category and prices.
  created a reusable card component to dispaly the products and used it in products page, filter by category page and filter by price page.
  Used Tailwind CSS library for styling and react-icons library for icons.
  implemented add to cart functionality. Used local storage to persist the products added into the cart.
  Used Braintree payement gateway for checkout.

Deployment:
  Backend : Render
  Frontend: Vercel

Features to be Implemented:
  User Authentication
  Role based Authentication (Admin/User) wherer Admin can access private routes such as adding, removing any product
  adding functionality to create more categories
  Search filter
  Improving the landing page
  Product Rating
  
  
  
  
