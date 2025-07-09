# Learn Express

A simple project to learn Express.

## Usage

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

# Get User Data from Express

## Body (POST)

```javascript
router.post("/user", (req, res) => {
  const user = req.body;
  res.json(user);
});
```

## Query (/api/user?name=lorenz)

```javascript
router.get("/user", (req, res) => {
  const user = req.query;
  res.json(user);
});
```

## Params (/api/user/lorenz)

```javascript
router.get("/user/:name", (req, res) => {
  const user = req.params;
  res.json(user);
});
```
