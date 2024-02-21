const express = require('express');
const morgan = require('morgan');

/* ---------------------------- SECURITY IMPORTS ---------------------------- */
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express');
const xss = require('xss-clean');
const hpp = require('hpp');

// Add error handling here
const AppError = require('./utils/appError');
const errorController = require('./controllers/errorController');

// Import routers here
const itemRouter = require('./routes/itemRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const locationRouter = require('./routes/locationRouter');
const auditRouter = require('./routes/auditRouter');

// Initialize applicaiton
const app = express();

// Helmet for extra security headers
app.use(helmet());

// Set up logging with morgan if we are in development
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
	max: 1000,
	windowMs: 60 * 60 * 1000,
	message: 'Too many requests, please wait until making another request',
});
app.use('/api', limiter);

// cors, currently allowing connections from anywhere
app.use(cors({ origin: '*' }));

// body parser with a 10kb request body limit
app.use(express.json({ limit: '10kb' }));

// sanitize against NoSQL injections and xss
app.use(mongoSanitize());
app.use(xss());

// preventing param pollution
app.use(
	hpp({
		whitelist: [
			'name',
			'partNumber',
			'cost',
			'quantity',
			'warehouse',
			'stockroom',
			'shelf',
			'level',
			'bin',
			'printed1574',
			'printedBinLabel',
			'lastInventoryDate',
		],
	})
);

// Mount routers here
app.use('/api/v1/items', itemRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/locations', locationRouter);
app.use('/api/v1/audit', auditRouter);

/* -------------------------- Catch all route here -------------------------- */
app.all('*', (req, _res, next) => {
	next(new AppError(`Requested route ${req.originalUrl} doesn't exist`, 404));
});

// mounting the errorController at the very bottom
app.use(errorController);

module.exports = app;
