const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

// Đối với database dùng compass
const local = "mongodb+srv://fizennn:123451211@cluster0.carho.mongodb.net/";

// Đối với database dùng atlas (cloud)
const atlas = "mongodb+srv://root:root@cluster0.mongodb.net/?retryWrites=true&w=majority"

const connect = async () => {
    try {
        await mongoose.connect(local); // Không cần truyền các tùy chọn useNewUrlParser và useUnifiedTopology
        console.log("message: 'connect success'");
    } catch (error) {
        console.log("message: 'connect fail'");
        console.log("error:", error);
    }
   
}



module.exports = { connect };