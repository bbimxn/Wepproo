 CREATE TABLE phones 
  id INTEGER PRIMARY KEY,
  name varchar(120) NOT NULL,
  price REAL NOT NULL,
  storage varchar(50) NOT NULL,
  camera varchar(20) NOT NULL,
  pimage varchar(100) NOT NULL

INSERT INTO phones (id, name, price, storage, camera, pimage) VALUES
1, 'Samsung Galaxy S25 Ultra', 1299, '12/512 GB', '200MP', 'image-31.jpg'
2, 'iPhone 16 Pro Max', 1199, '8/256 GB', '48MP', 'image-32.jpg'
3, 'Google Pixel 10 Pro', 1219, '12/256 GB', '48MP', 'image-33.jpg'
4, 'Huawei Pura 80 Ultra', 1680, '12/512 GB', '50MP', 'image-34.jpg'
5, 'Samsung Galaxy Z Fold 7', 2420, '12/256 GB', '200MP', 'image-35.jpg'
6, 'Samsung Galaxy Z Flip 7', 1099, '12/256 GB', '50MP', 'image-36.jpg'
7, 'OnePlus 13', 999, '12/256 GB', '50MP', 'image-37.jpg'
