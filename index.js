const express = require('express');

const cors = require('cors');

const app = express();

const dotenv = require('dotenv');

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./docs/swagger.json');

dotenv.config();

app.use(express.json());

app.use(cors());


const RegistrationRoutes = require('./routers/registration.routes');
const Auth = require('./routers/auth.routes');
const Admin = require('./routers/admin.routes');
const User = require('./routers/users.routes');
const transaction = require('./routers/transaction.routes');


app.use('/v1/api/register', RegistrationRoutes);
app.use('/v1/api/auth', Auth);
app.use('/v1/api/admin', Admin);
app.use('/v1/api/transaction', transaction);
app.use('/v1/api/user/', User);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 80;


app.get('/', (req, res) => {
    res.send('Welcome to the Registration API');
});


app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});