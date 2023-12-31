const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllUsers = async (req, res) => {
  sequelize.sync().then(() => {
    User.findAll({
      attributes: [
        "id",
        "name",
        "email",
        "isAdmin",
        "phone",
        "city",
        "country",
        "street",
        "zip",
        "apartment",
      ],
    })
      .then((users) => {
        res.json(users);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
      });
  });
};
router.get(`/`, getAllUsers);
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        "id",
        "name",
        "email",
        "isAdmin",
        "phone",
        "city",
        "country",
        "street",
        "zip",
        "apartment",
      ],
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post(`/`, async (req, res) => {
    console.log(req.body)
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hashSync(req.body.password, 10),
    isAdmin: req.body.isAdmin,
    phone: req.body.phone,
    city: req.body.city,
    country: req.body.country,
    street: req.body.street,
    zip: req.body.zip,
    apartment: req.body.apartment,
  };
  console.log(user);
  await User.create(user)
    .then((userAdded) => {
      console.log(userAdded);
      console.log("added user id:", userAdded["id"]);
      res.status(200).json(userAdded);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    });
});
router.post(`/register`, async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    isAdmin: req.body.isAdmin,
    phone: req.body.phone,
    city: req.body.city,
    country: req.body.country,
    street: req.body.street,
    zip: req.body.zip,
    apartment: req.body.apartment,
  };
  console.log(user);
  await User.create(user)
    .then((userAdded) => {
      console.log(userAdded);
      console.log("added user id:", userAdded["id"]);
      res.status(200).json(userAdded);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    });
});
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      res.status(404).json({ error: "user not found" });
    } else {
      let newPassword;
      if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10);
      } else {
        newPassword = user.password;
      }
      const updatedUser = {
        name: req.body.name,
        email: req.body.email,
        password: newPassword,
        isAdmin: req.body.isAdmin,
        phone: req.body.phone,
        city: req.body.city,
        country: req.body.country,
        street: req.body.street,
        zip: req.body.zip,
        apartment: req.body.apartment,
      };
      await User.update(updatedUser, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/:id", async (req, res) => {
  try{
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      res.status(404).json({ error: "user not found" });
    } else {
      await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: "user deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
})
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            { 
                id: user.id,
                isAdmin: user.isAdmin
            }, 
            process.env.JWT_SECRET, {
                expiresIn: "1d",
        });
        res.status(200).json({ user: user.email, token: token });
      } else {
        res.status(401).json({ error: "Wrong password" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get(`/get/count`, async (req, res) => {
    const count = await User.count()
    if(!count){
        res.status(404).json({error: 'users not found'})
    }
    else {
        res.status(200).json({count: count})
    }
})
router.get(`/`, getAllUsers);
module.exports = router;
