require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
              select "productId",
                      "name",
                      "price",
                      "image",
                      "shortDescription"
              from "products"
              `;
  db.query(sql)
    .then(result => {
      res.status(200);
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/products/:productsId', (req, res, next) => {
  const productId = parseInt(req.params.productsId);
  const sql = `
      select *
      from "products"
      where "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        throw new ClientError(`product with id ${productId} could not be found`, 404);
      } else {
        res.status(200);
        res.json(result.rows[0]);
      }
    })
    .catch(err => next(err));

});

app.get('/api/cart', (req, res, next) => {
  if (req.session.cartId) {
    const sql = `
                select "c"."cartItemId",
                    "c"."price",
                    "p"."productId",
                    "p"."image",
                    "p"."name",
                    "p"."shortDescription"
                from "cartItems" as "c"
                join "products" as "p" using ("productId")
              where "c"."cartId" = $1`;
    const params = [req.session.cartId];
    db.query(sql, params)
      .then(result => {
        res.status(200).json(result.rows);
      })
      .catch(err => next(err));
  } else {
    res.status(200).json([]);
  }
});

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.productId);
  if (!productId || isNaN(productId) || productId <= 0) {
    throw new ClientError(`${req.body.productId} is not a valid productId`, 400);
  }

  const sql = `
              select "price"
              from "products"
              where "productId" = $1
              `;
  const params = [productId];

  db.query(sql, params)
    .then(priceResult => {
      if (priceResult.rows.length === 0) {
        throw new ClientError(`product with id ${productId} could not be found`, 400);
      }
      if (req.session.cartId) {
        return ({ cartId: req.session.cartId, price: priceResult.rows[0].price });
      } else {
        const item = `
                    insert into "carts" ("cartId", "createdAt")
                    values(default, default)
                    returning "cartId"
                    `;
        return db.query(item).then(cartResult => {
          return ({ cartId: cartResult.rows[0].cartId, price: priceResult.rows[0].price });
        });
      }

    })
    .then(cartObj => {
      req.session.cartId = cartObj.cartId;
      const item = `
                    insert into "cartItems" ("cartId", "productId", "price")
                    values ($1, $2, $3)
                    returning "cartItemId"
                    `;
      const params = [cartObj.cartId, productId, cartObj.price];
      return db.query(item, params);
    })
    .then(result => {
      const sql = `
              select "c"."cartItemId",
                "c"."price",
                "p"."productId",
                "p"."image",
                "p"."name",
                "p"."shortDescription"
              from "cartItems" as "c"
              join "products" as "p" using ("productId")
              where "c"."cartItemId" = $1`;
      const params = [result.rows[0].cartItemId];
      return db.query(sql, params).then(cartResult => res.status(201).json(cartResult.rows[0]));
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  if (!req.session.cartId) {
    throw new ClientError('it looks like you havent made a cart yet', 400);
  }
  if (!req.body.name || !req.body.creditCard || !req.body.shippingAddress) {
    throw new ClientError('name, creditCard, and shippingAddress are required fields', 400);
  }
  const insertOrder = `
                insert into "orders" ("cartId", "name", "creditCard", "shippingAddress")
                values($1, $2, $3, $4)
                returning "orderId", "createdAt", "name", "creditCard", "shippingAddress"
                    `;
  const params = [req.session.cartId, req.body.name, req.body.creditCard, req.body.shippingAddress];
  db.query(insertOrder, params)
    .then(insertResult => {
      delete req.session.cartId;
      res.status(201).json(insertResult.rows[0]);
    })
    .catch(err => next(err));
});

app.delete('/api/cart', (req, res, next) => {
  let cartItemId = req.body.cartItemId;
  if (isNaN(cartItemId) || !cartItemId) {
    throw new ClientError('Cart Id must be a positive integer', 400);
  }

  cartItemId = parseInt(cartItemId);
  const deleteSql = `
                    delete from "cartItems"
                    where "cartItemId" = $1
                    `;
  const params = [cartItemId];
  db.query(deleteSql, params)
    .then(result => {
      if (!result.rowCount) {
        throw new ClientError(`cannot find item with cartItemId: ${cartItemId}`, 404);
      } else {
        res.status(204).json();
      }
    }).catch(err => next(err))
  ;
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));

});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
