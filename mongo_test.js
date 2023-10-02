// console.log("Got here");
// const MongoClient = require('mongodb').MongoClient;
// console.log("Got here too");
// const url = 'mongodb://localhost:27017';

// async function main() {
//     const client = new MongoClient(url, { monitorCommands: true });
//     console.log("Got here three");

//     try {
//         await client.connect(url);

//         // database Name
//         const dbName = 'myproject';
//         const db = client.db(dbName);

//         console.log("Got here four");
//         // new user
//         var name = 'user' + Math.floor(Math.random() * 10000);
//         var email = name + '@mit.edu';

//         console.log("Got here five");
//         // insert into customer table
//         var collection = db.collection('customers');
//         var doc = { name, email };

//         console.log("Got here six");
//         collection.insertOne(doc, { w: 1 }, function (err, result) {
//             console.log('Document insert');
//         });

//         console.log("Got here seven");
//         var customers = db
//             .collection('customers')
//             .find()
//             .toArray(function (err, docs) {
//                 console.log('Collection:', docs);
//             });

//         console.log("Got here eight");
//     } catch (err) {
//         console.error('Error:', err);
//     } finally {
//         // Close the MongoDB client when all operations are done
//         client.close();
//     }
// }

// main();
// // MongoClient.connect(url, function (err, client) {
// //     console.log("Somehow got here");
// //     if (err) {
// //         console.error('Error connecting to MongoDB:', err);
// //         return;
// //     }
// //     console.log("Connected successfully to server");

// //     client.close();
// // });
// console.log("Got here nine");

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

async function main() {
    const client = new MongoClient(url, { monitorCommands: true });

    try {
        // Connect to MongoDB using the client
        await client.connect();

        // database Name
        const dbName = 'myproject';
        const db = client.db(dbName);

        // new user
        var name = 'user' + Math.floor(Math.random() * 10000);
        var email = name + '@mit.edu';

        // insert into customer table
        var collection = db.collection('customers');
        var doc = { name, email };

        collection.insertOne(doc, { w: 1 }, function (err, result) {
            console.log('Document insert');
        });

        var customers = await collection.find().toArray();
        console.log('Collection:', customers);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        // Close the MongoDB client when all operations are done
        client.close();
    }
}

main();
