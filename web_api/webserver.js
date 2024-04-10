const express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const port = 4200;

//Kết nối MongoDB
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const URL = "mongodb+srv://thandh23044:Than23032003@englishwebproject.h2gd5cq.mongodb.net/?retryWrites=true&w=majority&appName=EnglishWebProject";
   
    var MongoDB = new MongoClient(URL);
    MongoDB.connect();

//Hàm API
    app.get("/api/accounts",async function(req, res)
    {
        var cursor = MongoDB.db("EnglishWeb").collection("Account").find({});
        var results = await cursor.toArray();
        console.log(results.length);
        res.send(results);
        console.log(results);
    })

    app.get('/api/account/:id', (req, res) => {
        const accID = req.params.id; // Lấy accID từ URL
    
        const db = MongoDB.db("EnglishWeb");
        const collection = db.collection("Account");

        // Tìm và lấy tài liệu từ collection dựa trên accID cụ thể
        collection.findOne({ accID: accID }, (err, result) => {
          if (err) {
            console.error('Error occurred while finding document:', err);
            res.status(500).json({ error: 'Error occurred while finding document' });
          } else if (!result) {
            // Nếu không tìm thấy tài liệu
            res.status(404).json({ error: 'Item not found' });
          } else {
            res.json(result);
          }
        });
      });

    app.post("/api/add_account",(req, res) =>{
        const accountData = req.body;
        // Lấy tham chiếu đến database
        const db = MongoDB.db("EnglishWeb");
        // Lấy tham chiếu đến collection
        const collection = db.collection("Account");

        // Chèn tài liệu vào collection
        collection.insertOne(accountData, (err, result) => {
        if (err) {
            console.error('Error occurred while inserting document:', err);
            res.status(500).json({ error: 'Error occurred while inserting document' });
        } else {
            console.log('Document inserted successfully:', result.insertedId);
            res.status(201).json({ message: 'Document inserted successfully', insertedId: result.insertedId });
        }
        });
    });

    app.put('/api/update_account/:id', (req, res) => {
        const accID = req.params.id; // Lấy id của người dùng từ URL
        const updatedUserData = req.body; // Dữ liệu người dùng cập nhật từ request body
      
        // Kiểm tra xem id của người dùng có hợp lệ không
        // if (!ObjectId.isValid(accID)) {
        //   res.status(400).json({ error: 'Invalid user ID' });
        //   return;
        // }

        const db = MongoDB.db("EnglishWeb");
        const collection = db.collection("Account");

        // Tìm và cập nhật tài liệu trong collection dựa trên id
        collection.findOneAndUpdate(
        { accID: accID}, // Điều kiện tìm kiếm tài liệu
        { $set: updatedUserData }, // Dữ liệu mới cần cập nhật
        { returnOriginal: false }, // Trả về tài liệu sau khi đã cập nhật
        (err, result) => {
            if (err) {
            console.error('Error occurred while updating document:', err);
            res.status(500).json({ error: 'Error occurred while updating document' });
            } else if (!result.value) {
            // Nếu không tìm thấy tài liệu
            res.status(404).json({ error: 'User not found' });
            } else {
            console.log('Document updated successfully:', result.value);
            res.json(result.value);
            }
        }
    );
  });

// Lắng nghe các yêu cầu tới cổng 3000
    app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    });
