const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('university');
    const students = db.collection('students');

//     // onsert one atuu samenya
    const insertOneResult = await students.insertOne({
      name: 'Ruweyda Ruun',
      age: 33,
      department: 'Software Engineering'
    });
    console.log('Inserted one with _id:', insertOneResult.insertedId);

    ////insert many ayu samenya 
    const insertManyResult = await students.insertMany([
      { name: 'Ridwaan Abdulkhadir', age: 20, department: 'Medicine' },
      { name: 'Khalid Abdulkhadir', age: 19, department: 'Business' },
      { name: 'Rowda Abdulkhadir', age: 18, department: 'Cyber Security' }
    ]);
    console.log('Inserted many count:', insertManyResult.insertedCount);

///update one ayuu samenaya
    const updateOneResult = await students.updateOne(
      { name: 'Muscab' },
      { $set: { department: 'AI' } }
    );
    console.log('Updated one count:', updateOneResult.modifiedCount);

    // update many ayu sameyana
    const updateManyResult = await students.updateMany(
      { department: 'Data Science' },
      { $set: { department: 'AI' } }
    );
    console.log('Updated many count:', updateManyResult.modifiedCount);

    //delete one ayu samena
    const deleteOneResult = await students.deleteOne({ name: 'Muscab' });
    console.log('Deleted one count:', deleteOneResult.deletedCount);

    // delete many ayu samnya 
    const deleteManyResult = await students.deleteMany({ age: { $gt: 30 } });
    console.log('Deleted many count:', deleteManyResult.deletedCount);

  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  } finally {
    await client.close();
  }
}

run();
