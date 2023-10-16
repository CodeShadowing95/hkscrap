const UserUseCase = require("../usecases/user_usecase");

module.exports = (app, db) => {
  app.post("/login", async (req, res) => {
    try {
      const { email_username, password } = req.body;

      const { data } = await UserUseCase.login({
        email_username,
        password,
        db,
      });

      return res.status(200).json(data);
    } catch (err) {
      res.status(err.statusCode).json({
        name: err.name,
        description: err.description,
      });
    }
  });

  app.post("/register", async (req, res) => {
    try {
      const { email, password } = req.body;

      const { data } = await UserUseCase.register({ email, password, db });

      return res.status(201).json(data);
    } catch (err) {
      res.status(err.statusCode).json({
        name: err.name,
        description: err.description,
      });
    }
  });

  app.get("/get-users", async (req, res) => {
    try {
      const { data } = await UserUseCase.get({ db });

      return res.status(200).json(data);
    } catch (err) {
      res.status(err.statusCode).json({
        name: err.name,
        description: err.description,
      });
    }
  });

  app.get("/count-users", async (req, res) => {
    try {
      const { data } = await UserUseCase.count({ db });

      return res.status(200).json(data);
    } catch (err) {
      res.status(err.statusCode).json({
        name: err.name,
        description: err.description,
      });
    }
  });

  app.post("/get-user", async (req, res) => {
    try {
      const { email } = req.body;

      const { data } = await UserUseCase.getOne({ email, db });

      return res.status(200).json(data);
    } catch (err) {
      res.status(err.statusCode).json({
        name: err.name,
        description: err.description,
      });
    }
  });

  app.post("/new-user", async (req, res) => {
    try {
      const { lastname, firstname, email, password, telephone, country } =
        req.body;

      const { data } = await UserUseCase.store({
        lastname,
        firstname,
        email,
        password,
        telephone,
        country,
        db,
      });

      return res.status(201).json(data);
    } catch (err) {
      res.status(err.statusCode).json({
        name: err.name,
        description: err.description,
      });
    }
  });

  app.put("/edit-profile/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const { lastname, firstname, email, phone, country } = req.body;

      const { data } = await UserUseCase.edit({
        id,
        lastname,
        firstname,
        email,
        phone,
        country,
        db,
      });

      return res.status(201).json(data);
    } catch (err) {
      res.status(err.statusCode).json({
        name: err.name,
        description: err.description,
      });
    }
  });

  app.delete("/delete/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const { data } = await UserUseCase.deleteOne({ id, db });

      return res.status(204).json(data);
    } catch (err) {
      res.status(err.statusCode).json({
        name: err.name,
        description: err.description,
      });
    }
  });
};
