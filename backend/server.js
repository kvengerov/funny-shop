const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const products = [
    {
        id: 1,
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: { rate: 3.9, count: 120 }
    },
    {
        id: 2,
        title: 'Mens Casual Premium Slim Fit T-Shirts',
        price: 22.3,
        description: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
        rating: { rate: 4.1, count: 259 }
    },
    {
        id: 3,
        title: 'Mens Cotton Jacket',
        price: 55.99,
        description: 'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
        rating: { rate: 4.7, count: 500 }
    },
    {
        id: 4,
        title: 'Mens Casual Slim Fit',
        price: 15.99,
        description: 'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
        rating: { rate: 2.1, count: 430 }
    },
    {
        id: 5,
        title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        price: 695,
        description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
        category: 'jewelery',
        image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
        rating: { rate: 4.6, count: 400 }
    },
    {
        id: 6,
        title: 'Solid Gold Petite Micropave',
        price: 168,
        description: 'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.',
        category: 'jewelery',
        image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
        rating: { rate: 3.9, count: 70 }
    }
];

const users = [
    {
        id: '1',
        email: 'john.doe@example.com',
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        role: 'user'
    },
    {
        id: '2',
        email: 'admin@funny-shop.com',
        username: 'admin',
        firstName: 'System',
        lastName: 'Administrator',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        role: 'admin'
    },
    {
        id: '3',
        email: 'manager@funny-shop.com',
        username: 'manager',
        firstName: 'Sales',
        lastName: 'Manager',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Manager',
        role: 'manager'
    }
];

app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    // Simple mock logic: any password works for known users
    const user = users.find(u => u.username === username);
    if (user) {
        res.json({ ...user, token: 'mock-jwt-token-' + user.id });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.post('/api/auth/register', (req, res) => {
    const { email, username, firstName, lastName } = req.body;
    const newUser = {
        id: String(users.length + 1),
        email,
        username,
        firstName,
        lastName,
        role: 'user',
        token: 'mock-jwt-token-' + (users.length + 1)
    };
    users.push(newUser);
    res.json(newUser);
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.get('/api/user-profile', (req, res) => {
    // Return regular user by default, or admin if requested via query
    const isAdmin = req.query.admin === 'true';
    const user = isAdmin ? users[1] : users[0];
    res.json(user);
});

app.get('/api/admin/stats', (req, res) => {
    res.json([
        {
            label: 'Total Revenue',
            value: '$45,231',
            trend: '↑ 12% from last month',
            trendUp: true,
            icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.546 1.16 3.698 1.16 5.244 0l.879-.659M12 6a4.002 4.002 0 0 0-3.203 1.392L8 8.417m4-2.417a4.002 4.002 0 0 1 3.203 1.392l.8 1.025M12 18a4.002 4.002 0 0 1-3.203-1.392l-.8-1.025M12 18a4.002 4.002 0 0 0 3.203-1.392l.8-1.025M3.375 19.5h17.25m-17.25-3h17.25m-17.25-3h17.25m-17.25-3h17.25m-17.25-3h17.25M6.75 3v18m10.5-18v18" />',
            iconClass: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
            progress: 70,
            progressClass: 'bg-emerald-500'
        },
        {
            label: 'New Users',
            value: '1,234',
            trend: '↑ 5% from last month',
            trendUp: true,
            icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />',
            iconClass: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400'
        },
        {
            label: 'Active Tasks',
            value: '42',
            trend: 'Upcoming deadlines',
            trendUp: false,
            icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />',
            iconClass: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
        },
        {
            label: 'Inventory Status',
            value: '94%',
            trend: 'Optimal performance',
            trendUp: false,
            icon: '<path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-5.25v9" />',
            iconClass: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
        }
    ]);
});

app.listen(port, () => {
    console.log(`Mock server listening at http://localhost:${port}`);
});
