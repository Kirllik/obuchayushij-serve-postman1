const express = require("express")
const dbConfig = require('./db.config.js')
const mysql = require("mysql2")

const app =express()
const urlencodedParser = express.urlencoded({extended: false});


const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});


///////////////////////////////////////////////////////////////////////////////////
const sql = `create table if not exists users(
  id int primary key auto_increment,
  name varchar(255) not null,
  age varchar(255) not null
)`;

connection.query(sql, function(err, results) {
    if(err) console.log(err);
    else console.log("Таблица создана  ");
});
///////////////////////////////////////////////////////////////////////////////////


const  PORT = 5001


app.use(express.json())


// получаем отправленные данные и добавляем их в БД
app.post("/create", function (req, res) {
    console.log(req.body);

    if(!req.body) return res.sendStatus(400);
    const name = req.body.name;
    const age = req.body.age;

// Запись полученого пост запроса в DB
 connection.query("INSERT INTO users (name, age) VALUES (?,?)", [name, age], function(err, data) {
        if(err) return console.log(err);
        res.json();
    });
});

// Запрос списка колонок users из базы данных
connection.query("SELECT * FROM users", (err, res) =>{
    console.log('Ошибка ' + err);
    console.log(res); // Печать response
});

async function startApp() {
    try {    // asynchronous connection
        await
            // open the MySQL connection
            connection.connect(err => {
                if (err) throw  err;
                console.log("Successfully connected to the database.")
            });
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT   ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp()
