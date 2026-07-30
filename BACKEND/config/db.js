const mongoose = require("mongoose");
const dns = require("dns");

// Force Node to use Google's DNS — fixes ECONNREFUSED querySrv issue on some Windows/network setups
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    try {
        console.log("Connecting to:", process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("Mongo Error:");
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;