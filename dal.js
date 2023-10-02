// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017';
// let db = null;

// async function connectToMongo() {
//     const client = new MongoClient(url, { monitorCommands: true });
//     try {
//         // Connect to MongoDB using the client
//         await client.connect();

//         // Connect to the 'myproject' database
//         db = client.db('myproject');
//     } catch (err) {
//         console.error('Error connecting to MongoDB:', err);
//     }
// }

// // Call the connectToMongo function to establish the connection
// connectToMongo();

// function create(name, email, password) {
//     connectToMongo();
//     return new Promise((resolve, reject) => {
//         console.log(`db == null: ${db == null}`)
//         const collection = db.collection('users');
//         const doc = { name, email, password, balance: 0 };
//         collection.insertOne(doc, { w: 1 }, function (err, result) {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(doc);
//             }
//         })
//     })
// }

// // all users
// function all() {
//     connectToMongo();
//     return new Promise((resolve, reject) => {
//         console.log("connected to all")
//         const collection = db
//             .collection('users')
//             .find()
//             .toArray(function (err, docs) {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(docs);
//                 }
//             })
//     })
// }

// module.exports = { create, all };


const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

// Connect to MongoDB and initialize the 'db' variable
async function connectToMongo() {
    const client = new MongoClient(url, { monitorCommands: true });

    try {
        // Connect to MongoDB using the client
        await client.connect();

        // Connect to the 'myproject' database
        db = client.db('myproject');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

// Call the connectToMongo function to establish the connection
connectToMongo();

// Function to create a user document in the 'users' collection
async function create(name, email, password) {
    try {
        // Wait for the MongoDB connection to be established
        await connectToMongo();

        if (!db) {
            throw new Error('MongoDB connection is not established.');
        }

        const collection = db.collection('users');
        const doc = { name, email, password, balance: 0 };
        const result = await collection.insertOne(doc);
        return doc;
    } catch (err) {
        console.error(err);
        throw err; // Propagate the error
    }
}

// function to login a user
async function login(email, password) {
    try {
        // Wait for the MongoDB connection to be established
        await connectToMongo();

        if (!db) {
            throw new Error('MongoDB connection is not established.');
        }

        const collection = db.collection('users');
        const docs = await collection.find().toArray();
        const user = docs.find((user) => user.email == email);
        if (!user) {
            return false;
        }

        if (user.password == password) {
            return true;
        }

        return false;
    } catch (err) {
        console.error(err);
        throw err; // Propagate the error
    }
}

// fuction to deposit funds to an account

// function to withdraw funds from an account

// function to get the balance for an account
async function balance(email) {
    try {
        // Wait for the MongoDB connection to be established
        await connectToMongo();

        if (!db) {
            throw new Error('MongoDB connection is not established.');
        }

        const collection = db.collection('users');
        const docs = await collection.find().toArray();
        const user = docs.find((user) => user.email == email);
        if (!user) {
            console.log("user not found");
            return null;
        }

        console.log(`user.balance: ${user.balance}`);
        return "" + user.balance;
    } catch (err) {
        console.error(err);
        throw err; // Propagate the error
    }
}

// Function to retrieve all user documents from the 'users' collection
async function all() {
    try {
        // Wait for the MongoDB connection to be established
        await connectToMongo();

        if (!db) {
            throw new Error('MongoDB connection is not established.');
        }

        const collection = db.collection('users');
        const docs = await collection.find().toArray();

        console.log("Connected to all");
        return docs;
    } catch (err) {
        console.error(err);
        throw err; // Propagate the error
    }
}

module.exports = { create, login, balance, all };