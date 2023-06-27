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

CREATE TABLE orders (
    id BIGINT(3) PRIMARY KEY AUTO_INCREMENT,
    status VARCHAR(1),  
    shippingAddress1 VARCHAR(100),
    shippingAddress2 VARCHAR(100),
    city VARCHAR(50),
    zip VARCHAR(20),
    country VARCHAR(50),
    phone VARCHAR(20),
    totalPrice DECIMAL(14,2),
    user BIGINT(3),
    dataOrdered TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE orders ADD FOREIGN KEY (user) REFERENCES users (id);

CREATE TABLE order_items (
    order_id BIGINT(3) NOT NULL,
    product_id BIGINT(2) NOT NULL,
    quantity BIGINT(3) NOT NULL,
    PRIMARY KEY (order_id, product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE order_items ADD FOREIGN KEY (order_id) REFERENCES orders (id);
ALTER TABLE order_items ADD FOREIGN KEY (product_id) REFERENCES products (id);
