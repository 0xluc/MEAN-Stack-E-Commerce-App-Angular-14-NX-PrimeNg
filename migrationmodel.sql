CREATE TABLE categories (
    id BIGINT(2) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(10),
    icon VARCHAR(20)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE products (
    id BIGINT(2) PRIMARY KEY AUTO_INCREMENT,
    image TEXT,
    brand VARCHAR(100),
    price DECIMAL(14,2),
    rating DECIMAL(2,2) NULL,
    numReviews BIGINT(7) NULL,
    isFeatured BOOLEAN,
    name VARCHAR(100),
    description TEXT,
    category BIGINT(2),
    reviews JSON,
    countInStock BIGINT(7),
    richDescription TEXT,
    images JSON
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE products ADD FOREIGN KEY (category) REFERENCES categories (id);

CREATE TABLE users (
    id BIGINT(3) PRIMARY KEY AUTO_INCREMENT,
    isAdmin BOOLEAN,
    name VARCHAR(50),
    email VARCHAR(100),
    passwordHash VARCHAR(100),
    phone VARCHAR(20),
    city VARCHAR(50),
    country VARCHAR(3),
    street VARCHAR(100),
    zip VARCHAR(20),
    apartment VARCHAR(20)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;